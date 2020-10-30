require('dotenv').config()
const express = require('express');
const app = express(); //app is an object

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());//needs to go before verifyToken

const verifyToken = (req, res, next) => {
    let token = req.cookies.jwt; // COOKIE PARSER GIVES YOU A .cookies PROP, WE NAMED OUR TOKEN jwt
  
    console.log("Cookies: ", req.cookies.jwt);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
      if (err || !decodedUser) {
        return res.status(401).json({ error: "Unauthorized Request" });
      }
      req.user = decodedUser; // ADDS A .user PROP TO REQ FOR TOKEN USER
      console.log(decodedUser);
  
      next();
    });
  };

//after app has been defined, use methodOverride.  
const methodOverride = require('method-override');
//include the method-override package
//We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));

// CSS inside public folder 
app.use(express.static('public'));


//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: true }));
//controller used to store GET and POST commands
app.use('/auth', require('./controllers/authController.js'));
app.use('/fruits', require('./controllers/fruitsController.js'));
app.use('/users', verifyToken, require('./controllers/usersController.js'));

// Get homepage
app.get("/", (req, res) => {
      res.render("users/index.ejs");
});

app.listen(process.env.PORT, () =>{
    console.log("I am listening");
});