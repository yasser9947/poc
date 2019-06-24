
    function arranging (set , type , cont){
    var country = []
    set.forEach(ele =>{
        country.push(ele[type])
    
    });
    var count = {};
    country.forEach(function (x) {
        count[x] = (count[x] || 0) + 1
    });
 
    var sortable = [];
for (var num in count) {
    sortable.push([num, count[num]]);
}

sortable.sort(function(a, b) {
    return b[1] - a[1];
});
// console.log(count)
// console.log(sortable)
cont = sortable
return sortable
}


console.log("hy")

 