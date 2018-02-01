
/**
 * The basic Contact object modal.
 */
class Contact {
    firstname;
    lastname;
    age;
    index;

    /**
     * Create a new Contact object.
     * @param {firstname, lastname, age, index} 
     */
    constructor({firstname, lastname, age, index}) {
        this.firstname = firstname || "";
        this.lastname = lastname || "";
        this.age = age || "";
        this.index = index >= 0 ? index : undefined;
    }
}

export default Contact;