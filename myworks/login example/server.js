const express = require("express")
const session=require("express-session")
const app=express()
const bodyParser=require("body-parser")
const { request } = require("express")
app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
    cookie:{maxAge:6000},
    secret:"bharat",
    resave:false,
    saveUninitialized:true,
}))

const sqlite3=require("sqlite3").verbose()

const db=new sqlite3.Database("./user.db",(err)=>{
    if(err)
    console.log("error in opening database")
    else
    {
        console.log("database connected")
        db.run(`CREATE TABLE IF NOT EXISTS USERS(TYPE VARCHAR(20),
                                                 NAME VARCHAR(30),
                                                EMAIL VARCHAR(50),
                                                PASSWORD VARCHAR(50))`,
                        (err)=>{
                             if(err)
                            console.log("could not create table users",err)
                            else{
                                console.log("table users created successfully " )
                            }
                        } )
        /* db.run(`CREATE TABLE IF NOT EXISTS ADMIN(NAME VARCHAR(30),
                                                EMAIL VARCHAR(30),
                                                PASSWORD VARCHAR(50))`,
                           (err)=>{
                               if(err){
                                   console.log(err)
                                   console.log("could not create admin table",err)
                               }
                               else{
                                   console.log("admin table created")
                               }
                           } ) */
    }
})


app.set("views","./views")
app.set("view engine","ejs");
let port=5000

app.get("/",(req,res)=>{
    if(req.session.email){
        res.render("usercontent")
    }
    res.redirect("/login")
    })
app.get("/login",(req,res)=>{
    let a = "inside"
    res.render("login")
})

app.get("/register",(req,res)=>{
    res.render("register",{status:0})
})
app.get("/index",(req,res)=>{
    res.render("index")
})

app.get("/admincontent",(req,res)=>{
    res.render("admincontent")
})
app.get("/usercontent",(req,res)=>{
    res.render("usercontent")
})

/* app.use(function(req,res,next){
    if(!req.session.name){
        req.session.email={}
        req.session.password={}
    }
}) */

 app.post("/login",function(req,res){
     let email=req.body.email;
     let password=req.body.password;
     //let type=req.body.type;

     if(req.body.email && req.body.password)
     {

         console.log("checking username"  +email+ "password" +password )
        let sql="select * from USERS where email=? AND password=?";
         db.all(sql,[email, password],(err,rows)=>{
             if(err)
             {
                 console.log("error",err)
             }else if(rows.length==0){
                 console.log("login failed ")       
             }else if(rows[0].TYPE=="admin")
             {
                 /* console.log(rows[0].TYPE) */
                 console.log("admin logged in")
                 res.render("admincontent")
             }
             else { 
                 console.log(rows);
                 req.session.email = email;
                 console.log("user logged in")
                 res.render("usercontent");
             }
             /* else
             {
                rows.forEach((row)=>{
                    console.log(row.name)
                })
             } */
         });
     }
    });
    /* db.run(`SELECT name,password from users where email like "%${email}%" and password like "%${password}%"`,(err)=>{
        if(err){
            console.log(err)
            res.render("login")
        }else{
        res.render("admincontent")
        }
    })
}) */
/*   app.post("/login",(req,res)=>{
     console.log("userside login")
    let string=req.query.email
    let string1=req.query.password 
    db.each(`select name,password from users where email="bharat@gmail.com" and password="bharat"`,(err)=>{
        if(err){
            console.log(err)
            res.render("login")
        }else{
        res.render("usercontent")
    }
    })
}) */
app.post("/register",(req,res)=>{
    console.log("inside register")
    let name =req.body.name
    let email=req.body.email
    let Password=req.body.Password
    db.run("INSERT INTO USERS(NAME,EMAIL,PASSWORD) VALUES(?,?,?)",
    [name,email,Password],(err)=>{
        if(err){
            console.log(err)
            res.status(500).render("register",{status : err})
        }
        else{
            res.status(200).render("register",{status: "success"})
            }
    })
})
app.listen(5000,()=>{
    console.log(`server started at 5000`)
})