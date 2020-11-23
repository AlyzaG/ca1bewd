// import required
const express = require('express');
const app = express ();
const {MongoClient, ObjectId} = require('mongodb');

// connections to the database
const url = "mongodb+srv://userdb:jcJd7YgFirQ2CW6@dbshows.ulzym.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(url, {useUnifiedTopology : true});

// declare the database used
const dbName = "netflixFlops";

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));

// declare variables to connect the database
let db, showsDb;

run().catch(console.dir);


    // Home page router
app.get('/', (req, res) => {
    // send a message to check if we are in the home page
    res.send('Hello world')
});

    // Get router (READ)
app.get('/shows/:id', (req, res)=> {
   // res.send('you are in the shows router');
    // using function findShows to retrieve one of the data in the database
    async function findShows() {
        const foundShows = await showsDb.findOne({name: "Death Note"});
        res.json(foundShows)
    }
    findShows();
});

    // Post router (CREATE)
app.post('/shows', (req, res) => {
    // send a message to check if we are in the shows page, and the method used is working
    console.log('I have received a post request in the /shows route');
    // declare a variable with all the field into the table shows
    let shows = new Shows(
        req.body.name,
        req.body.year,
        req.body.review,
        req.body.category,
        req.body.director,
        req.body.watched);
    // insert into the database all the new fields
    showsDb.insertOne(shows);
    res.sendStatus(200)
});

    // Update router (UPDATE)
app.put('/shows', (req, res)=> {
    // send a message to check if we are in the shows page, and the method used is working
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
                foundShows.director,
                foundShows.watched);
            // here we specify the specific field using req
            shows.year = req.body.year;
            // create a variable to update the specific field selected earlier
            const updatedResult = await showsDb.updateOne({"_id": ObjectId(req.body.id)}, {$set: shows});
            console.log(updatedResult)

        }
    }
        findShows();
});

// Delete router (DELETE)
app.delete('/shows', (req, res) => {
    // send a message to check if we are in the shows page, and the method used is working
   console.log('Router to delete one car');
   console.log(req.body.id);
   // select a specific document on the database using its id to delete it
    showsDb.deleteOne({"_id" : ObjectId(req.body.id)});
    //using function findShows we are going to search for the id of the document that we want to delete
    async function findShows() {
        const foundShows = await  showsDb.findOne({"_id": ObjectId(req.body.id)});
        // add a condition to check if the query has been executed
        if(foundShows !== null){
            res.send("The entry was not deleted")
        }
        res.send("The entry was deleted")
    }
    findShows();




});


// function used to connect with the database
 async function run(){
    try{
        await client.connect();
        //defining the database
        db = client.db(dbName);
        // console.log("Connected to the server");
        // specifying the table inside the database
        showsDb = db.collection("shows");
        // the port used
        app.listen(3000);
        /*   "name" : "Disjointed",
            "year" : 2017,
            "review" : 19,
            "category" : "comedy",
            "director": "Chuck Lorre",
            "watched" : false
        }
        // const p = await collection.insertOne(shows)
        */
    } catch(err){
        // the message if the database is not connected
            console.log(err.stack);
        }
}

// the class that specify every field name into the database Shows

class Shows {
    constructor(name, year, review, category, director, watched){
        this.name = name;
        this.year = year;
        this.review = review;
        this.category = category;
        this.director = director;
        this.watched = watched;
    }

    /*printValues(){
        console.log(this.make, this.model, this.availability, this.fuelType, this.warranty);
    }*/
}
