/**
 * A module simulating the properties of a real life car with its model,
 * year of construction and description.
 * */

var Car = (function () {
	/**
	 * Function simulating an auto incrementing static variable.
	 */
	var incr = (function () {
    	var i = 0;
    	return function () {
        	return i++;
    	}
 	})();

	function Car(model, year, description) {
		this.id = incr();
		this.model = model;
		this.year = year;
		this.description = description;
    }
    return Car;
} ());