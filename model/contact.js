const mongoose =  require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log("connecting")

mongoose.connect(url)
    .then(result => {
        console.log("connected to MongoDB")
    })
  .catch(error => {
        console.log('error connecting to MongoDB:', error.message)  
    })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

contactSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)
