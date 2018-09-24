import express from 'express';
import mongodb from 'mongodb';
var ObjectId = mongodb.ObjectID
var MongoClient = mongodb.MongoClient;

import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
//const dbName = 'crudWithRedux';

function validate(data){
    let errors = {};
    if(data.title == '') errors.title = "Can't be empty";
    if(data.event_date == '') errors.event_date = "Can't be empty";
    const isValid = Object.keys(errors).length === 0;
    return { errors, isValid };
}

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err;
    var db = client.db('react_calendar');
    app.get('/api/events',(req,res) => {
        db.collection('events').aggregate([ {$project: {title: 1, description: 1, month: {$month: '$date'}, year: {$year: '$date'}, day: {$dayOfMonth: '$date'} }}, {$match: {month: parseInt(req.query.month), year: parseInt(req.query.year)}} ]).toArray(function (err, events) {
            if (err) throw err;
            res.json({events});
        })
        /*db.collection('events').find().toArray(function (err, events) {
            if (err) throw err;
            res.json({events});
        })*/
    });
    app.post('/api/events',(req,res) => {
        const { errors, isValid } = validate(req.body);
        if(isValid){
            const { title, description, event_date } = req.body;
            db.collection('events').insert({ title, description, date: new Date(event_date)}, (err, result)=> {
                if(err){
                    res.status(500).json({ errors: { global: "Something wend wrong." }});
                }else{
                    res.json({ event: result.ops[0] });
                }
            })
        }else{
            res.status(400).json({ errors });
        }
    });
    app.put('/api/events',(req,res) => {
        const { errors, isValid } = validate(req.body);
        if(isValid){
            const { title, description, event_date, _id } = req.body;
            db.collection('events').updateOne({_id:new ObjectId(_id)},{$set: {
                    title, description, date: new Date(event_date)
                }});
            res.json({});
        }else{
            res.status(400).json({ errors });
        }
    });
    app.delete('/api/events/:_id',(req,res) => {
        try{
            db.collection('events').remove({
                _id: new ObjectId(req.params._id)
            });
            res.json({});
        }catch (e) {
            res.status(404).json({errors:{
                    global: e.message
                }});
        }
    });
    app.use((req,res) => {
        res.status(404).json({
           errors:{
               global: 'Something wrong.'
           }
        });
    });
    app.listen(8082, ()=> console.log('Server is running on localhost:8082'));
});

