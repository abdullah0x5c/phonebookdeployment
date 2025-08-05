const mongoose =  require('mongoose')

if(process.argv.length < 3){
    console.log("usage:")
    console.log("retrieve db: node mongo.js <your_password>")
    console.log("add contact: node mongo.js <your_password> <name> <phonenumber>")
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstackopen:${password}@cluster0.zwsxnbq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const retreiveContacts = () => {
    Contact.find({}).then(result =>{
        console.log("phonebook:")
        result.forEach(element => {
            console.log(element.name, element.number)
    });
    mongoose.connection.close()
})
}

const addContact = (name, number) => {
    let contact = new Contact({
        name: name,
        number: number,
    })

    contact.save().then(result => {
        console.log("added", result.name,  result.number)
        mongoose.connection.close()
    })
}

if(process.argv.length == 3){
    retreiveContacts()
}
else if(process.argv.length == 5){
    addContact(process.argv[3], process.argv[4])
}
