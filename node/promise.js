/*function car(color)
{
    this.color=color;

}
let c=new car("red");
console.log(c.color)




class Car{
    constructor(weight,color,capacity=4)
    
    {
    this.weight=weight;
    this.color=color;
    this.capacity=capacity;
    }
}
let c1=new Car(200,"red",10);  
console.log(c1.weight,c1.color,c1.capacity) ;                                 

let p=new Promise((resolve,reject)=>
{
    reject("boom");
})
console.log("next line ");
p.then(r=>console.log(r))
.catch(error=>console.log(error))


function makePromise(callback){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let r=callback()
            resolve(r)

        },100)
    })
}
makePromise(()=>5).then(val=>console.log(val*2))

fetch("https://api.github.com/users").then(users=>users.json())
.then(users=>users.filter(user=>user.login.includes("mob")))
.then(users=>console.log(users))*/

function fetchData()
{
    console.log(fetch(fetch("https://api.github.com/users").then(users=>users.json()).then(users=>users.filter(user=>user.login.includes("mob"))).then(users=>console.log(users))))
}






