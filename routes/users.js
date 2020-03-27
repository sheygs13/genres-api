const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
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
 const token = jwt.sign({  _id: user._id, isAdmin: user.isAdmin }, config.get('jwtPrivateKey'));
 res.header('x-auth-token', token).status(201).send({
    _id: user._id,
    name: user.name,
    email: user.email
 });
 // User.findOne({ email })
 //     .then(
 //       (user) => {
 //         if (!user) {
 //           let user = new User({ name, email, password });
 //           const SALT_ROUNDS = 10;
 //           bcrypt.genSalt(SALT_ROUNDS)
 //                 .then(
 //                   (salt) => {
 //                      if (salt){
 //                         bcrypt.hash(password,salt)
 //                               .then(
 //                                (hash) => {
 //                                  user = new User({
 //                                    name,
 //                                    email,
 //                                    password: hash
 //                                  });
 //                                }
 //                               ).catch(
 //                                 error => res.status(500).send(error.message)
 //                               )
 //                      }
 //                   }
 //                 ).catch(
 //                  error => res.status(500).send(error.message)
 //                 )
 //           user.save()
 //               .then(
 //                 (user) => {
 //                  // to handpick only the 
 //                  // propeties to send to the 
 //                  // user; alternative is to use lodash
 //                  res.status(201).send({
 //                    _id: user._id,
 //                    name: user.name,
 //                    email: user.email
 //                  });
 //                 } 
 //               )
 //               .catch(
 //                error => res.status(500).send(error.message)
 //               )        
 //         }else {
 //         res.status(400).json({ message: 'User Already Registered'});
 //         }
 //       }
 //     )
 //     .catch(
 //      error => res.status(500).send(error.message)
 //     )
});



module.exports = router;