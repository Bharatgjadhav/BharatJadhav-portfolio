/*


function count(s)



let s="10000000"
let arr=s.split("")
let commas=0
let currentIndex=s.length%2
let arrIndex=currentIndex
for (let i=0;(s.length-currentIndex)>=3;i++)
{
    arr.splice(arrIndex+1,0,",");
    commas++;
    arrIndex=(commas+2)+currentIndex;
    currentIndex +=2;
}
console.log(arr.join(""))
*/

let s="10000000000"
let arr=s.split("")
let commas=0
for(let i=s.length-3;i>1;i-=2)
{
    arr.splice(i-commas,0,",")
    commas++;

}
console.log(arr.join(""))