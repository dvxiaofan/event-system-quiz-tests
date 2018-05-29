// Create your own Event Tracker system:
//
// 1. create an `EventTracker` object
//    • it should accept a name when constructed
// 2. extend the `EventTracker` prototype with:
//    • an `on` method
//    • a `notify` method
//    • a `trigger` method
//


var EventTracker = function (name) {
	this.name = name;
	this._events = {};
	this._notify = {};
};

EventTracker.prototype.on = function (event, callback) {
	if (this._events[event] === undefined) {
		this._events[event] = [];
	}
	this._events[event].push( callback );
};

EventTracker.prototype.notify = function (otherObject, event) {
	if (this._notify[event] === undefined) {
		this._notify[event] = [];
	}
	this._notify[event].push(otherObject);
};

EventTracker.prototype.trigger = function (event, data) {
	var listOfCallbacks = this._events[event] || 0;
	var objectToNotify = this._notify[event] || 0;
	var i;

	for (i = 0; i < listOfCallbacks.length; i++) {
		listOfCallbacks[i].call(this, data);
	}

	for (i = 0; i < objectToNotify.length; i++) {
		objectToNotify[i].trigger(event, data);
	}
};

// EXAMPLE:
function purchase(item) { console.log( 'purchasing ' + item); }
function celebrate() { console.log( this.name + ' says birthday parties are awesome!' ); }

var nephewParties = new EventTracker( 'nephews ');
var richard = new EventTracker( 'Richard' );

nephewParties.on( 'mainEvent', purchase );
richard.on( 'mainEvent', celebrate );
nephewParties.notify( richard, 'mainEvent' );

nephewParties.trigger( 'mainEvent', 'ice cream' );



