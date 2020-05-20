// TODO: Write code to define and export the Employee class
class Employee{
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName (){
        return this.getName;
    }

    getId (){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getRole(){
        return "Employee"; //this needs to be overwritten in child class? because hard coded
    }
}