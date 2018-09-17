import express from 'express';
import mongodb from 'mongodb';
const mongoDbClient = mongodb.MongoClient;

var app = express();
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'react_calendar';
mongoDbClient.connect(mongoUrl,(err,client)=>{
    if(err) throw err;
    const db = client.db(dbName);
    app.get('/',(req,res)=>{
        res.send("HI, How are you");
    });
    app.listen(8082,()=>{
        console.log("server listen to 8082");
    });
});