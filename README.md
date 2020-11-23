# CRUD

# Description

This application is about all the shows and movies produced by Netflix that completely flopped in my opinion and using their review on rotten tomatoes 
(https://www.rottentomatoes.com/)
The application is using a database with mongoDB and Postman to use all the crud methods (create, read, update, delete) to interact with the data stored in the database.

## Installation

```bash
node index.js
```
```bash
nodemon
```
Starting a new project with node, than use nodemon, it will help restart automatically the application when a file has been changed.


## Requirements

```
const express = require('express');
```
This is using the 'Express' module from the package installed
```
const app = express ();
```
Using the express module we create a const app to use in the code
```
const {MongoClient, ObjectId} = require('mongodb');
```
Require the database using MongoClient for the connection, and require ObjectId to use it later on the code.
## Usage

This function is to connect your application with the database, by setting variable for the database and the table inside. You then set a port for the render.
Using the try/catch if the connection fails.
```
async function run(){
    try{
        await client.connect();
        db = client.db(dbName);
        showsDb = db.collection("shows");
        app.listen(3000);
    } catch(err){
            console.log(err.stack);
        }
}
```
Using the variable app, we can now proceed to use methods,.
First methods is to create a field to enter into the table shows.
You check if the router is right with a console.log, then you can do the method with InsertOne.
```
   
app.post('/shows', (req, res) => {
    console.log('I have received a post request in the /shows route');
    let shows = new Shows(
        req.body.name,
        req.body.year,
        req.body.review,
        req.body.category,
        req.body.director);
    showsDb.insertOne(shows);
    res.sendStatus(200)
});
```
Using the same logic than earlier we want now to find one the field we entered.
Create a function with the method FindOne specifying a field to retrieve.

```

app.get('/shows/:id', (req, res)=> {
    async function findShows() {
        const foundShows = await showsDb.findOne({name: "Death Note"});
        res.json(foundShows)
    }
    findShows();
});
```
Now, on to the Update method, which requires a bit more lines.
Verify that you are in the right router witch a console.log.
You use the same function than earlier (FindOne) to retrieve the field that you want to update first.
Using a condition you want to change a specific field only if the columns is not null in the database.
You than proceed your update.

```
app.put('/shows', (req, res)=> {
    console.log('Shows router is updated');

    // using function findShows we are going to retrieve an existing document on the database to be able to change on specific field
    async function findShows() {
        const foundShows = await showsDb.findOne({"_id": ObjectId(req.body.id)});
        if (foundShows !== null) {
            let shows = new Shows(
                foundShows.name,
                foundShows.year,
                foundShows.review,
                foundShows.category,
                foundShows.director);
            shows.year = req.body.year;
            const updatedResult = await showsDb.updateOne({"_id": ObjectId(req.body.id)}, {$set: shows});
            console.log(updatedResult)
        }
    }
        findShows();
});
```

Finally the delete method.
Verify that you are in the right router witch a console.log.
You need to retrieve the id of the column that you want to delete.
Then use a condition to make sure that the entry wad deleted.

```
app.delete('/shows', (req, res) => {
   console.log('Router to delete one car');
   console.log(req.body.id);
    showsDb.deleteOne({"_id" : ObjectId(req.body.id)});
    async function findShows() {
        const foundShows = await  showsDb.findOne({"_id": ObjectId(req.body.id)});
        if(foundShows !== null){
            res.send("The entry was not deleted")
        }
        res.send("The entry was deleted")
    }
    findShows();
});
```

## Authors
Alyza Gumma Saad & Zoom recordings


