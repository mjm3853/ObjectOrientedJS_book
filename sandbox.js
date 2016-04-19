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
    console.log("if the person1 object has the age property, log the age: ", person1.age)
}
    
//more reliable, no performance impact, but checks both own properties and prototype properties
var reliableCheck = "age" in person1;

console.log("boolean response of reliably checking property in object: ", reliableCheck);

//for just has own property
var reliableOwnCheck = person1.hasOwnProperty("age");
console.log("boolean response of reliably checking own property in object: ", reliableCheck)

//-------------------------------------------

var property;

for (property in person1) {
    console.log("Property Name: " + property);
    console.log("Property Value: " + person1[property]);
}