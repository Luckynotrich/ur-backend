let array1 = [{id:1,value:"sugar",pros:[1,1,2,3,4,4]},{id:2,value:'flour',pros:[1,1,2,3,4,4,555,5,5,6]},{id:3, value:'water',pros:[1,1,2,3,4,4,5]},{id:4,value:'salt',pros:[1,1,2,3,4,4]},{id:5,value:'oil',pros:[1,1,2,3,4,4]}];
let array2 = [{id:1,value:"sugar"},{id:2,value:'flour'},{id:3, value:'sparkeling water'},{id:4,value:'salt'},{id:5,value:'oil'}];


// compare array1 to array2 and change array1 to match array2

array1.forEach((item,i) => {
    item.value = array2[i].value? array2[i].value : item.value
    console.log('item = ', item.value, 'array1.pros.length = ', item.pros.length)
})
console.log("array1.length = ", array1.length, "array2.length = ", array2.length)