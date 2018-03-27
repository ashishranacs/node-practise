const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req, res, next)=>{
    res.render('maintenance',{
        pageTitle: 'Site is Down',
        message: 'Website is under maintenance'
    });
});

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.get('/', (req, res)=>{
    res.render('home', {
        pageTitle : 'Home Page',
        message : 'Welcome To Home page',
    });
});

app.get('/about', (req, res)=>{

    res.render('about', {
        pageTitle : 'About Page',
        message: 'Welcome to About Us Page', 
    });
});


app.listen(3000, ()=>{
    console.log('Server Started');
});