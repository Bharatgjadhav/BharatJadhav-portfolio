let a=[2,3,4,5];
a.reduce(function(acc,currentValue)
{
    console.log(acc,currentValue)
    return acc+currentValue;
})