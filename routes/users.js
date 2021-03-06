const {User, validate} = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


router.post('/', async (req, res) => {
 const { name, email, password } = req.body;
 const { error } = validate({ name, email, password });
 if (error) return res.status(400).send(error['details'][0].message)
 let user = await User.findOne({ email });
 if (user) return res.status(400).json({message: 'User Already exists'});
 const salt = await bcrypt.genSalt(10);
 const hashed = await bcrypt.hash(password,salt);
 user = new User({
     name,
     email,
     password: hashed
 });
 await user.save();
 const token = user.generateAuthToken();

 // store the token in the response header after a user 
 // has created an account. This just ensures that the 
 // user does not have to login as he/she can now
 // make future api request to any permitted route.
 res.header('x-auth-token', token).status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email
 });
});



module.exports = router;