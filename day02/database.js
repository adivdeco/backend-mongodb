
const mongoose = require('mongoose');
const { Schema } = mongoose;

async function main(){
    await mongoose.connect("mongodb+srv://sadiv120:82111512hk@adivdeco.fh1i03w.mongodb.net/Bookstore");
   
    // const bookShema = new Schema({
    //     name: String,
    //     author: String,
    //     email: String,
    //     price: Number,
    // });

    // create a model === Collection ko create krnaa (table ko create krnaa)...== Book
    //  const Book = mongoose.model('Book', bookShema);



    //  const book = new Book({name:"hell and clean",price:999,no_abilabl:21})  // heare  no_abilabl is not in the schema so it will be added to the database
    //  await book.save()
    // //  other method to save the data...

    // await Book.create({name:"the rising sun",price:997})  

    // await Book.insertMany({name:"the hami",price:1097},{ordered: false}) // ordered: false means if one of the document is not inserted then it will not stop the other documents to be inserted




    // const data = await Book.find({})            //==========> find all the documents
    // console.log(data)

    // const data2 = await Book.find({name:"the hami"}) //==================>  find the documents by name
    // console.log(data2)
      
} 

// main()



// .then(()=>{ console.log('connected to database')})
// .catch((err)=>{console.log(err)})

module.exports = main;