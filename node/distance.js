let a=[10,11,7,12,14]
let result=a.slice(1).reduce((acc,currentValue)=>{
    return {prev:currentValue,
            sum:Math.abs(currentValue-acc.prev)+acc.sum
           }
        },
        {prev:a[0],sum:0})

console.log(result.sum)