// Imports the express package into your file
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const FeedModel = require('./models/FeedModel');

// Create an express app
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = 'mongodb+srv://admin:jmtkr1840@cluster0-z9f7p.mongodb.net/test?retryWrites=true&w=majority';
mongoose
.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}) //Promise 
.then(()=>{
    console.log('DB is connected');
})
.catch((err)=>{
    console.log('error', err)
})
 
/*
    Our first route
    First argument: route address
    Second argument: callback
*/
app.get('/', (req, res)=>{
    res.send("<h1>Welcome Home</h1>")
})

app.get('/about', (req, res)=>{

    res.send(`
                <h1>About Page</h1>
                <p>${req.query.section}</p>
                <p>${req.query.year}</p>
                <p>${req.query.industry}</p>
    `)

});

app.get('/contact', (req, res)=>{
    res.send("<h1>Contact Page</h1>")
});

app.get('/blog/:page', (req, res)=>{
    const page = req.params.page;
    res.send("<h1>Welcome to " + page + "</h1>")
});

app.post('/register', (req, res)=>{

    const formData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    }

    const newUser = new User(formData);

    newUser
    .save() // Promise

    // If promise is fulfilled
    .then((newUserData)=>{
        // Send response in the form of JSON
        res.json(newUserData)
    })
    .catch((err)=>{
        console.log('error', err);
    });
});


    
    app.post('/feed', (req, res)=>{

        const formData = {
            username : req.body.username,
            comment : req.body.comment,
            tags : req.body.tags,
            image : req.body.image,
            likes : req.body.likes,
            shares : req.body.shares
        }
    
      const newFeed = new FeedModel(formData);

    newFeed
    .save() // Promise

    // If promise is fulfilled
    .then((newFeedData)=>{
        // Send response in the form of JSON
        res.json(newFeedData);
    })
    
    // Otherwise...
    .catch((err)=>{
        console.log('error', err);
    })

});



app.listen(3000, ()=>{
    console.log('You are connected!')
});