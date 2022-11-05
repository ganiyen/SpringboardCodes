class Vehicle {
    constructor(make,model,year){
        this.make = make;
        this.model = model;
        this.year = year;
    }
    honk() {
        return("Beep.");
    }

    toString(){
        return(`The vehicle is a ${this.make} ${this.model} from ${this.year}`);
    }
}

let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
myFirstVehicle.honk();
myFirstVehicle.toString();

class Car extends Vehicle {
    constructor(make,model,year){
        super(make,model,year);
        this.numWheels = 4;
    }
}

let myFirstCar = new Car("Toyota", "Corolla", 2005);
myFirstCar.toString();
myFirstCar.honk();
myFirstCar.numWheels;

class Motorcycle extends Vehicle {
    constructor(make,model,year){
        super(make,model,year);
        this.numWheels = 2;
    }
    revEngine(){
        return "VROOM!!!";
    }
}
let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000)
myFirstMotorcycle.toString();
myFirstMotorcycle.honk();
myFirstMotorcycle.revEngine();
myFirstMotorcycle.numWheels;

class Garage {
    constructor(capacity, vehicles){
        this.capacity = capacity;
        this.vehicles = [];
    }
    add(vehicle) { 
            if (vehicle.constructor.name === "Car" || vehicle.constructor.name === "Motorcycle" || vehicle.constructor.name === "Vehicle"){
                if (this.vehicles.length < this.capacity) {
                    this.vehicles.push(vehicle);
                    return "Vehicle added!";
                }
                else {
                    return "Sorry, we're full.";
                }
            } 
            else {
                return "Only vehicles are allowed in here!";
            }
    }
}

let garage = new Garage(8);
garage.vehicles; // []
garage.add(new Car("Hyundai", "Elantra", 2015)); // "Vehicle added!"
garage.vehicles; // [Car]
garage.add("Taco"); // "Only vehicles are allowed in here!"
garage.add(new Motorcycle("Honda", "Nighthawk", 2000));// "Vehicle added!"
garage.vehicles; // [Car, Motorcycle]
garage.add(new Motorcycle("Honda", "Nighthawk", 2001));// "Sorry, we're full."