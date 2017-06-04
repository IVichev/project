var CarRepository = (function () {
	this.carArray = [];
	/**
	 * Constructor with four initial cars to display
	 * */
	function CarRepository() {
	}

	/**
	 * Method used to add initial cars to the car repository.
	 * It first initialises four different cars and then adds
	 * them to the carArray that simulates the repository itself.
	 * */
	CarRepository.prototype.setupInitialCars = function () {
		var carOne = new Car("Honda", 2012, "yellow");
		var carTwo = new Car("VW", 2012, "red");
		var carThree = new Car("Mercedes", 2016, "black");
		var carFour = new Car("BMW", 2014, "yellow");
		this.carArray = [carOne, carTwo, carThree, carFour];
	}
	/**
	 * Next four methods implement the CRUD functionality for the module.
	 * C = addCar
	 * R = getCar
	 * U = updateCar
	 * D = deleteCar
	 * */

	/**
	 * Method used to add new car to the repository by its model, year and description.
	 * */
	CarRepository.prototype.addCar = function (model, year, description) {
		var carToAdd = new Car(model, +year, description);
		this.carArray.push(carToAdd);
	}

	/**
	 * Method used to get a single car from the repository by its index.
	 * */
	CarRepository.prototype.getCar = function (id) {
		for (var i = 0; i < this.carArray.length; i++) {
			if (this.carArray[i].id == id) {
				return this.carArray[i];
			}
		}
	}

	/**
	 * Method used to update a car by finding it by its index and then replacing its 
	 * model,year and description with the new values.
	 * */
	CarRepository.prototype.updateCar = function (id, model, year, description) {
		for (var i = 0; i < this.carArray.length; i++) {
			if (this.carArray[i].id == id) {
				this.carArray[i].model = model;
				this.carArray[i].year = +year;
				this.carArray[i].description = description;
			}
		}
	}

	/**
	 * Method used to delete a car by its index.
	 * */
	CarRepository.prototype.deleteCar = function (id) {
		for (var i = 0; i < this.carArray.length; i++) {
			if (this.carArray[i].id == id) {
				this.carArray.splice(i, 1);
			}
		}
	}

	/**
	 * 	Method that returns an array of all cars in the repository.
	 * */
	CarRepository.prototype.getAllCars = function () {
		return this.carArray;
	}
	return CarRepository;
} ());