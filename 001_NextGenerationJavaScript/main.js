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
//Destructuring
//Array Destructuring
const numbers = [1,2,3];
[num1,,num3] = [numbers];
console.log(num1,num2); //=> 1, 3

//Object Destructuring
/*
{name} = {name:'İbrahim',age:45}
console.log(name); //İbrahim
console.log(age); //undefined
*/

//______________________________________________________________________________________
//Reference and Primitive Type Refresher

const person = {
    name = "İbrahim"
};

const person2 = person;
person.name = "Ahmet";
console.log(person2.name); //Ahmet

//Javascriptte önemli olaylardan biride obje ve dizilerin kopyalanmasıdır. Yukarıdaki şekilde bir atama
//yaparsak person2 nesnesi person nesnesinin adresini tutar. Yani person her değiştiğinde person2 de değişir.
//Eğer sadece içerisindeki veriyi kopyalamak istiyorsak aşağıdaki şekildeki gib bir yöntem izlemeliyiz. Yeni
//bir obje parentezi açıp spread ile verileri kopyalamalıyız.

const person3 = {
    ...person
}

person.name = "Ziya";
console.log(person3.name); //=> İbrahim

//____________________________________________________________________________________
//Refreshing Array Functions

const numbers = [1,2,3]

//map() metodu bize yeni bir array döner
const doubleNumArray = numbers.map((num)=>{
    return num*2;
});

console.log(numbers);//[1,2,3]
console.log(doubleNumArray);//[2,4,6]

//_______________________________________________________________________________________-

//References 
//=>https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array


