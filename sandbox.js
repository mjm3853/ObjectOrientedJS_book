var spacer = "-----------------";

//------------------------------------
console.log(spacer);
//------------------------------------

function reflect(value) {
    return value;
}

console.log(reflect('reflect'));
console.log(typeof reflect);

//------------------------------------
console.log(spacer);
//------------------------------------

var numbers = [1, 5, 8, 4, 7, 10, 2, 6];

// comparison functions allows you to sort numbers in an array
numbers.sort(function (first, second) {
    return first - second;
});

console.log(numbers);

//default sort does not work because it treats items as strings
numbers.sort();

console.log(numbers);

//------------------------------------
console.log(spacer);
//------------------------------------

var person1 = {
    name: "Matt"
};

person1.age = "Redacted";
person1.sex = "Yes Please";

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

//------------------------------------
console.log(spacer);
//------------------------------------

//for when you do not need the properties in an array
var property;

for (property in person1) {
    console.log("Property name: " + property);
    console.log("Property value: " + person1[property]);
}

console.log(spacer);

//for when you want the properties in an array
var properties = Object.keys(person1);

var i, len;

for (var i = 0, len = properties.length; i < len; i++){
    console.log("Property array name: " + properties[i]);
    console.log("Property array value: " + person1[properties[i]]);
}

//------------------------------------
console.log(spacer);
//------------------------------------

var person2 = {
    //underscore indicates a property to be handled as private even though it is not really
    _name: "Renee",
    
    //accessor property get
    get name() {
        console.log("Reading name");
        return this._name;
    },
    
    //accessor property set
    set name(value) {
        console.log("Setting name to %s", value);
        this._name = value;
    }
};

//get name
console.log(person2.name);

//set name
person2.name = "Greg";
console.log(person2.name);
