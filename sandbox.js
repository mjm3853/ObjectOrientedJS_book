function reflect(value) {
    return value;
}

console.log(reflect('poopy'));
console.log(typeof reflect);

//--------------------------------

var numbers = [1, 5, 8, 4, 7, 10, 2, 6];

// comparison functions allows you to sort numbers in an array
numbers.sort(function (first, second) {
    return first - second;
});

console.log(numbers);

//default sort does not work because it treats items as strings
numbers.sort();

console.log(numbers);

//---------------------------------------

var person1 = {
    name: "Matt"
};

person1.age = "Redacted";

//unreliable since this evaluates truthy vs falsy 
if (person1.age){
    console.log(person1.age)
}
    
//more reliable
console.log("age" in person1);
