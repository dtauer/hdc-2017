// Create a variable for express which will help run the server
const express = require('express')

// import our routes
const routes = require('./routes/routes')

// creat a path variable which can find files on our server
const path = require('path')

// Automatically adds varaibles.env to process.env 
require('dotenv').config({ path: 'variables.env' });

// Use express to initialize our server application
const app = express()

// Tell node to compile .pug files to HTML
app.set('view engine', 'pug')

// Tell node where our public/static assets are (css, js, images, etc.)
app.use(express.static(path.join(__dirname, './public')))

// Middleware acts as a man-in-the-middle. It intercepts and handles requests
// Multiple middleware can be used, for example, to populate the view's "locals" property
// with any data that should be available
app.use(function(req, res, next) {
    res.locals.user = "Dustin"
    next()
})

// Middleware for our router
app.use('/', routes)

// Better handle errors...
app.use(function(req, res, next) {
    res.status(404)
    // render 404 page or generic errror page
    res.render('error', {title: "Oops!"});
})

//Tell the server how to start
// Our Port will now use an environment variable if it's on
// heroku...otherwise, use 3000
const port = process.env.PORT || 3000
app.listen(port, function(){
    console.log(`Server is running on PORT ${port}`)
})