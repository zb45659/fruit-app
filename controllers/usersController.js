const express = require('express');
const router = express.Router();

// const users = require('../users');
const User = require('../models').User;
const Fruit = require('../models').Fruit;

// Get homepage
// router.get("/", (req, res) => {
//     User.findAll().then((users) => {
//       res.render("users/index.ejs", {
//         users: users,
//       });
//     });
//   });

// // create new User
// router.post("/", (req, res) => {
//   User.create(req.body).then((newUser) => {
//     res.redirect("/users/profile");
//   });
// });

// // GET ==> show form for new User
// router.get('/signup', (req,res) =>{
//     res.render('users/new.ejs');
// })

// // POST for login
// router.post('/login', (req,res) =>{
//     User.findOne({
//         where: {
//             username: req.body.username,
//             password: req.body.password,
//         },
//     }).then((foundUser) => {
//         res.redirect(`/users/profile/${foundUser.id}`);
//     })
//     });

// // GET ==> show form for Login
// router.get('/login', (req,res) =>{
//     res.render('users/login.ejs');
// })

// GET USER Profile
router.get("/profile/:id", (req, res) => {
    // IF USER ID FROM TOKEN MATCHES THE REQUESTED ENDPOINT, LET THEM IN
    if (req.user.id == req.params.id) {
      User.findByPk(req.params.id, {
        include: [
          {
            model: Fruit,
            attributes: ["id", "name"],
          },
        ],
      }).then((userProfile) => {
        res.render("users/profile.ejs", {
          user: userProfile,
        });
      });
    } else {
      // res.json("unauthorized");
      res.redirect("/");
    }
  });

// GET ==> show
router.get('/profile/:index', (req, res) =>{
    res.render('users/profile.ejs', {
        user: users[req.params.index]
    });
});

// put ==> update single user profile
router.put("/profile/:id", (req, res) => {
    User.update(req.body, {
        where: {
            id: req.body.id,
        },
        returning: true,
    }).then((updatedUser) => {
        res.redirect(`/users/profile/${req.params.id}`);
    });
});

// post ==> process the create user form data
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    }).then(() => {
        res.redirect('/users');
    });
});




module.exports = router;