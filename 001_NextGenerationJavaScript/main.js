//Arrow Functions
const myFunc = () => console.log("Hi");
const myFunc2 = number => numberx2;

const myFunc3 = (name,age) => {
    console.log("Hi")
}

//_________________________________________________________________________________________________________
//Classes
class Human{
    constructor(){
        this.gender = "Male";
    }

    printGender(){
        console.log(this.gender);
    }
}

class Person extends Human{
    constructor(){
        super();//bunu yazmadan üst classın özelliklerine ulaşamayız
        this.name="İbrahim";
        this.gender="Famale";
    }

    printName(){
        console.log(this.name);
    }
}

const person = new Person();
person.printName();
person.printGender();
//_____________________________________________________________________________________-

class Human {
    gender = "Male"

    printGender = () => {
        console.log(this.gender);
    }
}

class Person extends Human{
    //Ecma Script 7 le birlikte classların içine constructor tanımı yapma zorunluluğu kaldırılmıştır.
    //this anahtar kelimesini kullanmak zorunda değiliz.
    name = "İbrahim";
    gender = "Male";

    printMyName = () => {
        console.log(this.name);
    }
}

//__________________________________________________________________________________________--
//Spread & Rest Operators (...)

const numbers = [1,2,3];
const newNumbers = [...numbers,4,5,6]; //=> [1,2,3,4,5,6]

const newNumbers2 = [numbers,4,5]; //=> [[1,2,3],4,5]

const Person = {
    name = "İbrahim"
};

const newPerson = {
    ...Person, //yukarıdaki objenin propertylerini buraya ekledi
    age = 45
};

console.log(newPerson);

const filter = (...args) =>{
    return args.filter(el => el === 1); //=== type kontrolü yapar.
}

console.log(filter(1,2,3)); //=> 1
//___________________________________________________________________________________---
