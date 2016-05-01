'use strict'

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

//------------------------------------
console.log(spacer);
//------------------------------------

//Ch 3. Constructors - function used with new to create an object. 
//Makes it easy to create similar objects with the same properties and methods

function Person(soundSomeoneMakesWhenTheyCallYou) {
    //Capital function name indicates constructor
    this.soundSomeoneMakesWhenTheyCallYou = soundSomeoneMakesWhenTheyCallYou;
    this.sayCallSound = function() {
        console.log("Hey", this.soundSomeoneMakesWhenTheyCallYou);
    }
    this.insult = function() {
        console.log(this.soundSomeoneMakesWhenTheyCallYou + " you are a buttface.")
    }
}

console.log("is the object person1 and instance of the Person constructor?: " + (person1 instanceof Person));

var leonardo = new Person("Leonardo");

console.log("is the object leonardo and instance of the Person constructor?: " + (leonardo instanceof Person));
console.log("was leonardo created by the Person constructor?: " + (leonardo.constructor === Person));

leonardo.sayCallSound();
leonardo.insult();

//------------------------------------
console.log(spacer);
//------------------------------------

//Ch4. Prototypes!

function hasPrototypeProperty(object, name){
    return name in object && !object.hasOwnProperty(name);
}

var testShow = {};

var prototype = Object.getPrototypeOf(testShow);

console.log("Check for prototype: " + (prototype === Object.prototype));

//Constructor - which will have prototype methods and attributes
function TVShow(name) {
    this.name = name;
}

/* Remove for refactor
TVShow.prototype.sayName = function() {
    console.log("TV Show name is: " + this.name);
};

// Remove for refactor
TVShow.prototype.characters = [];
*/

//Refactor of sayName, characters, and toString

TVShow.prototype = {
    constructor: TVShow,
    
    sayName: function() {
        console.log("TV Show name is: " + this.name);
    },
    
    characters: [],
    
    toString: function(){
        return "[TV Show - " + this.name + "]";
    }
};

var modernFamily = new TVShow("Modern Family");

modernFamily.sayName();

modernFamily.characters.push("Phil Dunphy");

console.log(modernFamily.characters);

console.log(modernFamily.toString());

console.log("Has Prototype property, should be false: " + hasPrototypeProperty(modernFamily, "Modern Family"));

console.log("Has Prototype property, should be true: " + hasPrototypeProperty(modernFamily, "sayName"));

//-----------------------

TVShow.prototype.sayHi = function(){
    console.log("Hi");
}

modernFamily.sayHi();

//------------------------------------
console.log(spacer);
//------------------------------------

// Ch5. Inheritance

//Naked Object has no prototype chain.
//Removes naming collision possibilities.
//Good for lookup hash.

var nakedObject = Object.create(null);

//---------------------------------------

// overwrite the prototype chain

function Rectangle(length, width){
    this.length = length;
    this.width = width;
}

var testRect = new Rectangle(3, 4);

console.log("Test Rectangle: " + JSON.stringify(testRect));

Rectangle.prototype.getArea = function() {
    return this.length * this.width;
}

console.log("Area of Test Rectangle: " + testRect.getArea());

Rectangle.prototype.toString = function() {
    return "[Rectangle " + this.length + "x" + this.width + "]";
}

console.log(testRect.toString());

//--------------------

function Square(side) {
    this.length = side;
    this.width = side;
}

Square.prototype = new Rectangle();
Square.prototype.constructor = Square;

var testSquare = new Square(5);

console.log("Test Square: " + JSON.stringify(testSquare));

console.log("Area of Test Square: " + testSquare.getArea());

console.log("Is Square an instance of Rectangle?: " + (testSquare instanceof Rectangle));

//Inheritance = Prototype Chaining

//------------------------------------
console.log(spacer);
//------------------------------------

// Ch6. Object Patterns

//Why make a property private? - To manage state without worrying about the value changing without object's knowledge.

//The Module Pattern
//- To create Singleton Objects with Private Data

var modulePatternObject = (function(){
   //private data variables
   
   return {
       //public methods and properties
   } 
});

var phone = (function() {
   var cost = 500;
   
   return {
       name: "Nexus-6P",
       
       getCost: function() {
           return cost;
       },
       
       costMore: function(){
           cost++;
       }
   };
}());


console.log("Phone name: " + phone.name);

console.log("Phone cost: $" + phone.getCost());

phone.cost = 600;
console.log("Phone cost with no change: $" + phone.getCost());

phone.costMore();
console.log("Phone cost plus one: $" + phone.getCost());

//Revealing Module Pattern - keep variables and functions together

var tv = (function(){
    var cost = 350;
    
    function getCost() {
        return cost;
    }
    
    function costMore() {
        cost++;
    }
    
    return {
        name: "LG-tv",
        getCost: getCost,
        costMore: costMore
    };
}());

console.log("TV name: " + tv.name);

console.log("TV cost: $" + tv.getCost());

console.log("TV cost plus one: $" + tv.costMore());

//Mixins

function mixin(receiver, supplier){
    for (var property in supplier){
        if (supplier.hasOwnProperty(property)){
            receiver[property] = supplier[property]
        }
    }
    return receiver;
}

function EventTarget(){
}

EventTarget.prototype = {
    constructor: EventTarget,
    
    addListener: function(type, listener){
        if (!this.hasOwnProperty("_listeners")){
            this._listeners = [];
        }
        
        if (typeof this._listeners[type] == "undefined"){
            this._listeners[type] = [];
        }
        
        this._listeners[type].push(listener);
    },
    
    fire: function(event){
        if (!event.target){
            event.target = this;
        }
        
        if (!event.type){
            throw new Error("Event object missing 'type' property.");
        }
        
        if (this._listeners && this._listeners[event.type] instanceof Array){
            var listeners = this._listeners[event.type];
            for (var i=0, len=listeners.length; i<len; i++){
                listeners[i].call(this,event);
            }
        }
    },
    
    removeListener: function(type, listener){
        if (this._listeners && this._listeners[type] instanceof Array){
            var listeners = this._listeners[type];
            for (var i=0, len=listeners.length; i<len; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }
};

var target = new EventTarget();
target.addListener("message", function(event){
   console.log("Message is " + event.data); 
})

target.fire({
    type: "message",
    data: "Hello World!"
});

