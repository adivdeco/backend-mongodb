
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb+srv://sadiv120:82111512hk@adivdeco.fh1i03w.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = 'harsh01';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('user');

  // the following code examples can be pasted here...
//   const insertResult = await collection.insertOne({name:"marco" ,salary: 1000000,bank:"ameraican"});
//   console.log('Inserted documents =>', insertResult);

//   const insertResult2 = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
// console.log('Inserted documents =>', insertResult2);


  const filteredDocs = await collection.find({ name:"marco" }).toArray();
console.log('Found documents filtered by { name:marco } =>', filteredDocs);


//   const findResult = await collection.find({}).toArray();
//   console.log('Found documents =>', findResult);

// ********** another method to find the documents **********
//   const findResult = collection.find({});
// for await (const doc of findResult) {
//     console.log(doc);
//   }
 
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());