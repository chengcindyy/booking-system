import mongoose from 'mongoose';

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//1. specify the port where we can access our mongodb database server
//it should be followed by the name of the database that we want to create or connect to
const url = `mongodb://localhost:27017/booksDB`;
mongoose.connect(url)
console.log("Database connected")
//the above line of code makes a connection to mongoDb database server
// and then start looking for the database called booksDB
//if the database doesnot exist, it creates a brand new database

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//2. create a schema which is a blueprint or structure of our data that we are going to save into our MongoDB database

//This bookSchema lays down the foundation for every new book that will be added to our database.
//Performing Validations while defining the schema

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please check the entry, no title is specified."]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    author: String,
    numberInStock: Number,
    like: Boolean
})

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//3. The next step is compiling our schema into a Model.

//use the schema to create a mongoose model - specify two parameters
//first is name of the collection that complies with this particular schema
//If you have a collection of books, you use the word Book in singular form
//and Mongoose will convert this string to a plural form to create your collection.

//A model is a class with which we construct documents.

const Book = mongoose.model("Book", bookSchema);

////////////////Alternate////////////////////////
/*const Book = mongoose.model("Book", new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please check the entry, no title specified."]
        },
        rating: {
            type: Number,
            min: 1,
            max: 10
        },
        author: String,
        numberInStock: Number,
        like: Boolean

    }))
    */

//By doing this, you have created a new collection called books
//and those books have to stick to the structure that we have defined in bookSchema


/////////////////////////////////////////////////////////////////////////////////////////////
//4. Ready to create a new book document
//we are creating this document from the model that we specified up there on above line
//which means this document sticks to the schema
const book1 = new Book({
    title: "Python Data Science Handbook",
    rating: 7,
    author: "Jake VanderPlas",
    numberInStock: 37,
    like: true
})

// /////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//5. Saving the new book document
//The save() method returns a promise.
//If save() succeeds, the promise resolves to the document that was saved.

const saveBook = async () => {
    try {
        const savedDoc = await book1.save();
        console.log(`Document saved successfully. ${savedDoc}`)
    }
    catch (err) {
        console.log("Error: " + err)
    }
}

//saveBook();

//it calls the save method in Mongoose to save this book document into a books collection inside a booksDB
//Every single time you run save(), it will save the same book to your books collection in your booksDB.


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//6. Inserting many new documents to the booksDB
const book2 = new Book({
    title: "R for Data Science",
    rating: 5,
    author: "Garret Grolemund and Hadley Wickham",
    numberInStock: 99,
    like: false
})

const book3 = new Book({
    title: "Guide to Big data Hadoop Distributed File System",
    rating: 8,
    author: "Kartikeya Mishra",
    numberInStock: 10,
    like: true
})

const book4 = new Book({
    title: "Eloquent JavaScript",
    rating: 9,
    author: "Marijn Haverbeke",
    numberInStock: 5,
    like: true
})
const saveBooks = async () => {
    try {
        const docs = await Book.insertMany([book2, book3, book4]);
        console.log("documents saved successfully.")
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
// saveBooks();

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//7. Reading documents from the booksDB

// The find() method retrieves an array of documents that match the specified conditions.
// The findOne() method retrieves a single document that matches the specified conditions.

const findBooks = async () => {
    try {
        const books = await Book.find({ rating: 5 })
        console.log("Found")
        books.forEach(book => console.log(book.title))
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
//findBooks()

const findBook = async () => {
    try {
        const book = await Book.findOne({ rating: 5, title: "Data Sciences" })
        console.log("Found", book);
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
// findBook();


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//8. Updating the documents

// findOneAndUpdate() finds the first document that matches a given filter, applies an update, and returns the document. By default, findOneAndUpdate() returns the document as it was before update was applied.
//You should set the new option to true to return the document after update was applied.

const findOneAndUpdate = async () => {
    try {
        const filter = { title: "Eloquent JavaScript" };
        const update = { title: "Introduction To JavaScript" }
        const doc = await Book.findOneAndUpdate(filter, update, {
            new: true
        })
        console.log("UPDATED: ", doc)
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
// findOneAndUpdate()


//UpdateOne updates an existing document with the information mentioned in the "update" object. 
//It updates only the first document that is returned in the filter.
const updateOne = async () => {
    try {
        const filter = { title: "Eloquent JavaScript" }
        const update = { title: "My Eloquent JavaScript" };
        const result = await Book.updateOne(filter, update)
        // console.log(result.modifiedCount)
        if (result.modifiedCount > 0) {
            console.log('updated successfully:', result);
        } else {
            console.log('Book not found or no modifications were made.');
        }
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
// updateOne()
// /////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//8. Deleting a document

//DeleteOne - Deletes first document that matches the condition
// The result contains an object with the property name deletedCount indicating the number of documents deleted.

const deleteOne = async () => {
    const filter = { title: "Eloquent JavaScript" }
    try {
        const result = await Book.deleteOne(filter);
        if (result.deletedCount === 0) console.log(`Deleted 0 documents`)
        else console.log(`Successfully deleted ${result.deletedCount} documents.`)
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
// deleteOne();
const deleteMany = async () => {
    // const filter = { title: "Eloquent JavaScript" }
    // const filter = { title: "Eloquent JavaScript", rating: 5 }
    const filter = { rating: 9 }
    try {
        const result = await Book.deleteMany(filter);
        if (result.deletedCount === 0) console.log(`Deleted 0 documents`)
        else console.log(`Successfully deleted ${result.deletedCount} documents.`)
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
// deleteMany();

//once you are done with the database, you can close the database using close() method
//when the last action with the database is completed, and the callback returns no error,
//then we must close the connection

//serer listening on port 5000
/* const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`The app is up and listening on port ${port}`)
}) */
