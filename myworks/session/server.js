let session = require('express-session');
const bodyParser=require("body-parser")
const express = require("express")
const app=express()

app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    
  }))

let sqlite3=require("sqlite3").verbose();
let db=new sqlite3.Database("memory.db");
app.get("/", (req, res)=>{
    console.log(req.session.views)
    if(req.session.views){
        req.session.views++;
    }
    else{
        req.session.views = 1
    }
    res.send(`Number of views = ${req.session.views}`)
})

app.listen("8000",()=>{
    console.log(`server started at 8000`)
})
// db.serialize(function(){
//     db.run("create table lorem(info text)");
//     let stmt=db.prepare("insert into lorem values(?)");
//     for(let i =0;i<10;i++){
//         stmt.run("ipsum"+i);
//     }
//     stmt.finalize();
//     db.each("select rowid as id, info from lorem ", function(err,row){
//         console.log(row.id + ": "+row.info);
//     });
// }); 
// db.close();