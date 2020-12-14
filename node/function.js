/*let a=10
function inc(a)
{
    a++;
    console.log("inside",a);
}
console.log(a);
inc(a);
console.log("outside",a);*/

/*let a=100
function inc()
{
    let a=10
   return function()
    {
        console.log(++a)
        
    }
}
console.log(a);
let f=inc()

inc()()
inc()()
inc()()
inc()()*/
/*function foo()
{
    console.log(a)
    let a=10;
}
foo()*/
/*function foo()
{
   // console.log(a)

{
     a=10;
    console.log(a)
    
}
console.log(a)
}
foo()
global.a*/

/*function add(a)
{
    return function(b)// function curring 
    {
        return a+b
    }
}
let r=add(10)(20)
console.log(r)
/*
let add=a=>b=>a+b
let r=add(10)(2)
console.log(r)
console.log(add)
//functional paradime */

/* la=[10,20,30,40];
console.log(p,q);*/

/*let a=[10,20]
let b=[200,300,...a]
console.log(b)*/


let person={name:"bhatat",age:20};
let employee={salary:2000,...person}
person.grow()
console.log(person)
console.log(employee)