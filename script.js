// Object Literal
var person = {
    /* property: value*/
    name: "Néstor",
    lastname: "Aldana",
    birthday: Date.now()
}; // JSON (JavaScript Object Notation)

// Access to propertys
console.log(person.name);
// Change object's property value
person.birthday = new Date(1994, 0, 11); // 11 - Jan - 1994
console.log(person.birthday);

console.log(person.dui) // undefined
person.dui = "000000000" // Assign 
console.log(person.dui) // 000000000

// Example
function createPerson(name, lastname, birthday, dui) {
    return {
        name,
        lastname,
        birthday,
        dui
    }
}

let list = [] // To save persons

// To Add 10 fake persons
for (let i = 0; i < 10; i++) {
    list.push(createPerson(`Name ${i}`, `Lastname ${i}`, new Date().setFullYear(1990 + i + Math.floor(Math.random() * 5)), `000000${i}`));
}

console.table(list);

// Array Higher function
// Show only the name persons
console.table(list.map(({
    name
}) => name));

// Get average age
console.log("Average age %i", list.reduce((sum, {
    birthday
}) => {
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970) + sum;
}, 0) / list.length);


// More readable

function getAge(birthday) {
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var edad = Math.abs(ageDate.getUTCFullYear() - 1970);
    //El codigo original calculaba la fecha independientemente del mes y del dia de nacimiento
    /*
     * Si el mes de la fecha del cumpleaños aun no ha pasado (es mayor que el mes de la fecha actual)
     * es porque el cumpleaños no ha pasado por lo tanto se le resta un año a la edad
    */
    if (ageDate.getMonth > new Date().getMonth) {
        edad--;
    }
    /*
     * Si el mes es el mismo, la edad la determina el dia de cumpleaños
     * si el dia del cumpleaños es mayor al dia actual, el cumpleaños no ha pasado
     * por lo tanto se le resta un año a la edad
     */
    if (ageDate.getMonth == new Date().getMonth) {
        if (ageDate.getDay > new Date().getDay) {
            edad--;
        }
    }
    //Finalmente se retorna la edad real de la persona donde se considero el año, es y dia de su cumpleaños
    return edad;
}

console.log("Average age %i", list.reduce((sum, {
    birthday
}) => getAge(birthday) + sum, 0) / list.length);