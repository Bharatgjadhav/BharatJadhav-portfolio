if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express=require("express")
const app = express()  
const bcrypt =require("bcrypt")
const flash =require("express-flash")
const session=require("express-session")    
const passport = require("passport")
const methodOverride=require("method-override")
/* const sqlite3=require("sqlite3").verbose()

const db =new sqlite3.Database("./users.db",(err)=>{
    if(err)
    console.log("error in opening db")
    else
    {
        console.log("db connected")
        db.run(`CREATE TABLE IF NOT EXISTS USER(name VARCHAR(30) NOT NULL,
                                     email VARCHAR(30) NOT NULL,
                                    password VARCHAR(30) NOT NULL)`,
                            (err)=>{
                                if(err)
                                    console.log("could not create table users",err)
                                else{
                                    console.log("user table created")

                                }
                            })
    }
}) */

/* app.post("/register", (req, res)=>{
    console.log("INSIDE")
    let name  = req.body.name
    console.log(name)
    let email = req.body.email
    let password = req.body.password
 
        db.run("INSERT INTO USER(name,email,password) VALUES(?,?,?)",
        [name, email, password],(err)=>{
                        if(err){
                            console.log(err)
                            res.status(500).render("register",{status : err})
                        }
                        else{
                            res.status(200).render("register",{status: "success"})
                        }
                    })
})
 */
const  initializePassport=require("./passport-config")
initializePassport(
    passport,
    email => users.find(user =>user.email === email),
    id=>users.find(user =>user.id === id)    
)

const users=[]

app.set("view-engine","ejs")
app.use(express.urlencoded({extended:false}))

app.use(flash())
app.use(session({
    secret :process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

app.get("/",checkAuthenticated,(req,res)=>{
    res.render("index.ejs",{name:"bharat"})
})

app.get("/login",checkNotAuthenticated,(req,res)=>{
    res.render("login.ejs" )
})

app.post("/login",checkNotAuthenticated,passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash: true
}))

app.get("/register",checkNotAuthenticated,(req,res)=>{
    res.render("register.ejs")
})
 
app.post("/register",checkNotAuthenticated,async(req,res)=>{
try{
    const hashedPassword=await bcrypt.hash(req.body.password,10 )
    users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email:req.body.email,
        password:hashedPassword
    })
    res.redirect("/login")
}catch{
    res.redirect("/register")
}
console.log(users)
})

app.delete("/logout",(req,res)=>{
    req.logout()
    res.redirect("/login")
})

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
   
}

app.listen(3000)