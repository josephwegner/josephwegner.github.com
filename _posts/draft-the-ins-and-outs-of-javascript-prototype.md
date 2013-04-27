--- 
published: false
title: "Ins and Outs of Javascript Prototype"
type: post
layout: post
meta: 
  _edit_last: "1"
  dsq_thread_id: "insoutsjavascriptprototype"
status: draft
tags: []

---

Earlier this year I was in search of a new job, and was specifically looking for a frontend development position with a focus on javascript.  I'm pretty passionate about the javascript language, so every interview that popped up for a JS-heavy position I jumped on.  That ended up being like twenty interviews within a few weeks (Well done, Chicago).  Around interview #10 I started to take a note of some trends in the technical portion of the interviews.  More often than not I was being interview by a non-technical person who had either Google'd or been given a list of important javasript questions.  The three things that always came up were closures, hoisting, and prototype.

Truthfully, I'm a little bit disappointed in that list.  Closures and hoisting are both important topics to understand, but those are the kinds of things that if you don't know, you'll quickly figure out as soon as one causes a bug.  Essential javascript knowledge, but not really a sign of a javascript "guru".

Prototype, though, is a very interesting concept.  I'm very glad I was asked about it, and actually wish that my interviewers had had a better understanding of just how prototype works.  I hope the same things for you, because prototype is an essential piece of javascript - hopefully this blog post will help.

## Prototype - Inheritance for Javascript

On a very basic level, prototype gives javascript the ability to create class-like inheritance using objects.  We know that (mostly) [everything is an object](http://mirkokiefer.com/blog/2010/02/everything-is-an-object-in-javascript/) in javascript.  However, there's something unqiue about a function-object.  The first unique thing is that every function-object is instantiated with a `prototype` parameter, which is also an object.  The second unique thing is that you can use the `new` keyword on a function-object to create a "child" of that object.  

{% highlight javascript %}
var Dog = function() {
	alert("bark!");
}; // The function-object

var cody = new Dog(); //The child object.  This will alert "bark!"
{% endhighlight %}

Prototype gives us some special abilities when creating child objects out of function-objects.  When you add keys to the prototype parameter they automatically get added on to the child object.  That means that you can define class-level functions like `bark();` that will get applied to every new child object.

{% highlight javascript %}
var Dog = function(name) {
	this.name = name;	
};

Dog.prototype.bark = function() {
	alert("bark!");
}

Dog.prototype.speakName = function() {
	alert("bark! " + name + "! bark!");
}

var Cody = new Dog("Cody");
cody.bark(); //alerts "bark!"
cody.speakName(); //alerts "bark! Cody! bark!"
{% endhighlight %}

Just as a note, the keys on prototype can be of any type.  It's commonly used for functions, but you can set it as a string, number, function, or even another object.

## Prototype By Reference

You're probably wondering why in the world you would want to use prototype, rather than just adding the keys in the constructor.  Prototype creates some spaghetti code - it would be much easier just to do this:

{% highlight javascript %}
var Dog = function(name) {
	this.name = name;
	this.bark = function() {
		alert("bark!");
	};
}	

var cody = new Dog("Cody");
cody.bark(); //alerts "bark!"
};
{% endhighlight %}

You're right.  That would work just as well as the example above, but it's pretty short sighted.  The way the above works is that everytime you create a new Dog, it runs the constructor function and instantiates new functions on the desired keys.  Not only is this inefficient processing-wise and memory-wise, it severely limits your inheritance and abstraction abilities.

Consider a different example - let's say you are writing a game about working at a zoo - naturally you're going to have some `Animal` objects.  One of the most interesting things about going to the zoo is the noises each animal makes, so we defintely want to have a `speak` function on `Animal`.  Now, what noise does an animal make?  Certainly it should change depending on if it's a monkey or a polar bear.

In order to do the abstraction on the `Animal` class, we have to store the `speak` function on `Animal`'s prototype, and then override it on each child class.  Note that a generic `Animal` won't make any noise, so that's what the `Animal.speak` function will do.

{% highlight javascript %}
//First define our generic Animal class.  By having this root level class,
//our subclasses don't have to recreate every function if there is no reason to,
//but our application can always expect an Animal to have a "speak" function.
var Animal = function(name) {
	this.name = name;
};

Animal.prototype.speak = function() {
	alert(""); //Most animals don't actually make any noise.
};

//I like monkeys.  Conveniently, they also make an interesting noise
var Monkey = function(name, color) {
	this.name = name;
	this.color = color;
};

//This creates a copy of Animal's prototype and puts it on Monkey's.
//If you simply did an assignment of one prototype to the other, 
//it would be copied by reference.  Then any changes to Monkey.speak
//would affect Animal.speak
Monkey.prototype = Object.create(Animal.prototype);

Monkey.prototype.speak = function() {
	alert("Hoo Hoo, Hah Hah!"); //How cute
}

//I also like sloths.  They don't make a noise, but we still want them to have their own class.
var Sloth = function(name) {
	this.name = name;
}


Sloth.prototype = Object.create(Animal.prototype);

//Now we can play with the Monkeys and Sloths!
var curiousGeorge = new Monkey("George", "brown");
var steveTheSloth = new Sloth("Steve");

curiousGeorge.speak(); //alerts Hoo Hoo, Hah Hah!
steveTheSloth.speak(); //alerts nothing
{% endhighlight %}

If we had instead set all of the functions in the `Animal` constructor, we would have had to rewrite the `speak` function for the `Sloth`, even though sloths don't make any noise.  This may seem like a negligible amount of work, but I hope you aspire to do more interesting work than programming `Sloth`s all day.

## Advanced - Object Interfaces

The patterns above defintely get us within the bounds of saying that javascript is object oriented.  However, it's not yet quite as powerful as other more tradition OOP languages.  One of the things I really like about OOP programming is being able to manage abstractions via [Object Interfaces](http://www.cs.utah.edu/~germain/PPS/Topics/interfaces.html).  Object Interfaces let you define an abstract class that requires child classes to have certain functions.  In the above example, we might require that every Animal be able to move.  However, every animal moves/walks in a different way, so there isn't a generic way to do that on the parent class.

I've been using a pattern recently to mock standard Object Interfacing.  Of course, the code isn't quite as clean as a language that supports interfacing out of the box, but it gets the job done.

{% highlight javascript %}
var Animal = function() {};

Animal.prototype.super = function(name) {
	this.name = name;

	//Verify that necessary functions exists
	var necessaryFunctions = ["move"]

	for(var i=0,max=necessaryFunctions.length; i<max; i++) {
		if(typeof(this[necessaryFunctions[i]]) !== "function") {
			throw new Error("Animals must have a function called " + necessaryFunctions[i]);
		}
	}

	//Checks to see if the child class has an init function.  If it does, it calls it
	//with all the same arguments that hit this super.
	if(typeof(this.init) === "function") {
		this.init.apply(self, arguments);
	}
};

Animal.prototype.speak = function() {
	alert(""); //Most animals don't actually make any noise.
};

//On construction, the child class calls the parent class's super function.
//The super function will check the object interface requirements
//and then call the child class's init function
var Monkey = function() {
	this.super.apply(this, arguments);
};

Monkey.prototype = Object.create(Animal.prototype);

//name was already set in the super constructor!
Monkey.prototype.init = function(name, color) {
	this.color = color;
};

Monkey.prototype.speak = function() {
	alert("Hoo Hoo, Hah Hah!"); //How cute
}

Monkey.prototype.move = function() {
	//Do some moving!
}

//Now lets create a sloth without a move function and see what happens
var Sloth = function() {
	this.super.apply(this, arguments);
};

Sloth.prototype = Object.create(Animal.prototype);

//We are leaving out the Sloth's init function, because the name is already set in the constructor

//Now the Monkey should pass, but the Sloth should not because it does not have a move function.
var curiousGeorge = new Monkey("George", "brown");
curiousGeorge.speak(); //alerts Hoo Hoo, Hah Hah!

var steveTheSloth = new Sloth("Steve"); //Throws error
{% endhighlight %}

