const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');


var ObjectID = require('mongoose').Types.ObjectId
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/postManage',{useNewUrlParser:true,useUnifiedTopology:true},
    err => {
        if (!err)
            console.log('Mongodb connection succeeded.')
        else
            console.log('Error while connecting MongoDB : ' + JSON.stringify(err, undefined, 2))
    })

// parse application/json
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:3000'}))




var { PostMessage } = require('./models/postMessage')


app.get('/api/view', (req, res) => {
    PostMessage.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records : ' + JSON.stringify(err, undefined, 2))
    })
})

app.post('/api/create', (req, res) => {
    
     var newRecord = new PostMessage({
         name:req.body.name,
         branch:req.body.branch,
         email:req.body.email
     })

     newRecord.save((err, docs) => {
         if (!err) res.send(docs)
         else console.log('Error while creating new record : ' + JSON.stringify(err, undefined, 2))
     })
})

 app.put('/api/update', (req, res) => {
     if (!ObjectID.isValid(req.params.id))
         return res.status(400).send('No record with given id : ' + req.params.id)

     var updatedRecord = {
        name:req.body.name,
        branch:req.body.branch,
        email:req.body.email
     }

     PostMessage.findByIdAndUpdate(req.params.id, { $set: updatedRecord },{new:true}, (err, docs) => {
         if (!err) res.send(docs)
         else console.log('Error while updating a record : ' + JSON.stringify(err, undefined, 2))
     })
 })

 app.delete('/api/delete/:id', (req, res) => {
     if (!ObjectID.isValid(req.params.id))
         return res.status(400).send('No record with given id : ' + req.params.id)

     PostMessage.findByIdAndRemove(req.params.id, (err, docs) => {
         if (!err) res.send(docs)
         else console.log('Error while deleting a record : ' + JSON.stringify(err, undefined, 2))
     })
 })


app.listen(8000, () => {
	console.log("server started on port 8000...");
});
