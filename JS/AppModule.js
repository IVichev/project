var AppModule = (function () {

    function AppModule() {
    }

    this.CarRepository = new CarRepository();
    CarRepository.setupInitialCars();
    /**
     * Helper method to check if given array contains an object with given value.
     */
    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] == obj) {
                return true;
            }
        }
        return false;
    }
    /**
     * This is a method that creates all the elements in the page not contained in the initial HTML.
     * Such elements are the table containing cars, and all the datalists containing the options for the
     * model, year and description filters. Each time we use a filter we will call this function and it will
     * build the elements of the table again containing only the selected elements.
     */
    function buildPage() {
        var option;
        var tbody = document.createElement('tbody');
        var thead = document.createElement('thead');
        tbody.setAttribute('id', 'tbody');
        tbody.setAttribute('class', 'list');
        var existingCars = CarRepository.getAllCars();
        var currentTable = document.createElement('table');
        currentTable.setAttribute('id', 'myTable');
        var table = document.getElementById('table');
        currentTable.setAttribute('class', 'table');
        table.innerHTML = '';
        var button;
        var tr = document.createElement('tr');
        var th = document.createElement('th');
        th.appendChild(document.createTextNode('Модел'));
        tr.appendChild(th);
        th = document.createElement('th');
        th.appendChild(document.createTextNode("Година"));
        tr.appendChild(th);
        th = document.createElement('th');
        th.appendChild(document.createTextNode('Описание'));
        tr.appendChild(th);
        thead.appendChild(tr);
        currentTable.appendChild(thead);

        var existingCarsLength = existingCars.length;
        for (var i = 0, tr, td; i < existingCarsLength; i++) {
            tr = document.createElement('tr');
            tr.setAttribute('id', i);
            td = document.createElement('td');
            td.setAttribute('class', 'model');
            td.appendChild(document.createTextNode(existingCars[i].model));
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('class', 'year');
            td.appendChild(document.createTextNode(existingCars[i].year));
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('class', 'description');
            td.appendChild(document.createTextNode(existingCars[i].description));
            tr.appendChild(td);
            button = document.createElement('button');
            button.appendChild(document.createTextNode('Edit'));
            button.setAttribute('value', existingCars[i].id);
            button.setAttribute('onclick', 'AppModule.editCar(value)');
            td = document.createElement('td');
            td.appendChild(button);
            tr.appendChild(td);
            button = document.createElement('button');
            button.appendChild(document.createTextNode('X'));
            button.setAttribute('value', existingCars[i].id);
            button.setAttribute('onclick', 'AppModule.removeCar(value)');
            button.setAttribute("class", "btn-danger");
            td = document.createElement('td');
            td.appendChild(button);
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
        currentTable.appendChild(tbody);
        table.appendChild(currentTable);
        var descriptions = [];
        var models = [];
        var years = [];
        for (var i = 0; i < existingCarsLength; ++i) {
            if (!(contains(models, existingCars[i].model))) {
                models.push(existingCars[i].model);
                var modelsClass = document.getElementById('models');
                option = document.createElement('option');
                option.setAttribute('value', existingCars[i].model);
                modelsClass.appendChild(option);
            }
            if (!(contains(years, existingCars[i].year))) {
                years.push(existingCars[i].year);
                var yearsClass = document.getElementById('years');
                option = document.createElement('option');
                option.setAttribute('value', existingCars[i].year);
                yearsClass.appendChild(option);
            }
        }
        var options = {
            valueNames: ['model', 'year', 'description']
        };

        var userList = new List('myTable', options);
    }
    buildPage();

    /**
     * Method that clears all the datalists and destroyes the table and then
     * rebuilds the page by calling the buildPage method with no filters.
     */
    function resetAllContent() {
        $('#models').text('');
        $('#years').text('');
        $('#descriptions').text('');
        $('#table').text('');
        buildPage();
    }

    /**
     * Function called onclick of the restore-table-btn that calls the resetAllContent method.
     */
    var clearChanges = document.getElementById('restore-table-btn')
    clearChanges.onclick = function () {
        resetAllContent();
    }

    /** 
     * Method called after the filter-by-model-btn is clicked.
     * It resets the content and rebuilds with the filter for models.
     * */
    var filterByModelButton = document.getElementById('filter-by-model-btn');
    filterByModelButton.onclick = function () {
        resetAllContent();
        var options = {
            valueNames: ['model', 'year', 'description']
        };
        var userList = new List('myTable', options);
        userList.search($('input[name=models]').val(), ['model']);
    }

    /** 
     * Method called after the filter-by-year-btn is clicked.
     * It resets the content and rebuilds with the filter for years.
     * */
    var filterByYearButton = document.getElementById('filter-by-year-btn');
    filterByYearButton.onclick = function () {
        resetAllContent();
        var options = {
            valueNames: ['model', 'year', 'description']
        };
        var userList = new List('myTable', options);
        userList.search($('input[name=years]').val(), ['year']);
    }

    /** 
     * Method called after the add-car-btn is clicked.
     * It gets the data from the add_form and validates it.
     * if the information is valid it calls addCar with the values,
     * resets the form and resetsAllContent.
     * It resets the content and rebuilds with the filter for models.
     * */
    var addCarButton = document.getElementById('add-car-btn');
    addCarButton.onclick = function () {
        var model = document.getElementById("add_form").elements[0].value;
        var year = document.getElementById("add_form").elements[1].value;
        var description = document.getElementById("add_form").elements[2].value;
        if (model == '' || year == '' || description == '' || year < 1800 || year > 2020 || isNaN(year)) {
            alert("Can't have null values, or the year is invalid");
            return;
        }
        CarRepository.addCar(model, year, description);
        document.getElementById("add_form").reset();
        resetAllContent();
    }

    /**
     * The logic behind the delete button.
     * This method removes the car with given id after confirmation.
     * */
    function removeCar(carId) {
        var carToBeRemoved = CarRepository.getCar(carId);
        console.log(carToBeRemoved);
        if (confirm("Are you sure you want to remove [" + carToBeRemoved.model + "]") == true) {
            CarRepository.deleteCar(carId);
        }
        resetAllContent();
    }

    /**
     * The logic behind the edit button
     * This method fills the edit_form with the chosen car's information,
     * and gives the carId to the update_button.
     * */
    function editCar(carId) {
        $("#edit_model").val(CarRepository.getCar(carId).model);
        $("#edit_year").val(CarRepository.getCar(carId).year);
        $("#edit_description").val(CarRepository.getCar(carId).description);
        $("#update_button").data('idVal', carId);
    }

    /**
     * Change the values of the car atributes with the ones from the form if valid.
     * On click of the update_button updates the chosen car with the new values, by calling
     * updateCar method. After that resets the edit_form and resets all content.
     * */
    var updateCarButton = document.getElementById('update_button');
    updateCarButton.onclick = function () {
        var model = document.getElementById("edit_form").elements[0].value;
        var year = document.getElementById("edit_form").elements[1].value;
        var description = document.getElementById("edit_form").elements[2].value;
        var id = $("#update_button").data('idVal');
        if (id === null) {
            alert('No car was chosen for the values!');
            return;
        }
        if (model === '' || year === '' || description === '' || year < 1800 || year > 2020 || isNaN(year)) {
            alert("Can't have null values, or the year is invalid");
            return;
        }
        CarRepository.updateCar(id, model, year, description);
        document.getElementById("edit_form").reset();
        $("#update_button").data('idVal', null);
        resetAllContent();
    }


    if (document.addEventListener) {
        document.addEventListener("click", handleClick, false);
    }
    else if (document.attachEvent) {
        document.attachEvent("onclick", handleClick);
    }

    /** 
     * Event handler for edit_button.
     * Does not prevent default if redirecting between pages
    */
    function handleClick(event) {
        if (event.target.href) {
            return;
        }
        event.preventDefault();
        event = event || window.event;
        event.target = event.target || event.srcElement;

        var element = event.target;

        while (element) {
            if (element.nodeName === "BUTTON") {
                if (/edit_button/.test(element.className)) {
                    editCar(element);
                    break;
                }
            }
            element = element.parentNode;
        }
    }

    return {
        AppModule: AppModule,
        removeCar: removeCar,
        editCar: editCar,
    };
}());