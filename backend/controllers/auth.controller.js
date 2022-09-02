const global = require("../helpers/global.helpers");
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const db = require("../models");
const User = db.user;

dotenv.config();

exports.login = async (req, res) => {
    let username = req.body.username ? req.body.username.trim() : '';
    let password = req.body.password ? req.body.password.trim() : '';
  
    if (username != '' && password != '') {
      password = await bcrypt.hash(password, saltRounds);
  
      User.findOne({username}, async (err, user) => {
        if (err) {
          console.log(err);
        }
  
        if (!user) {
            global.sendMsg(res, 'error', 'login', {
            username,
            password,
          });
        } else {
          if (await bcrypt.compare(req.body.password, user.password)) {
            let token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
                expiresIn: 86400
            });

            global.sendMsg(res, 'success', 'login', user, token);
           } else {
            global.sendMsg(res, 'error', 'login', {
              username,
              password,
            });
           }
        }
      });
    } else {
        global.sendMsg(res, 'error', 'login', {
        username,
        password,
      });
    }
}

exports.register = async (req, res) => {
    let username = req.body.username ? req.body.username.trim() : '';
    let password = req.body.password ? req.body.password.trim() : '';
    let firstname = req.body.firstname ? req.body.firstname.trim() : '';
    let lastname = req.body.lastname ? req.body.lastname.trim() : '';
    let email = req.body.email ? req.body.email.trim() : '';
    let phone = req.body.phone ? req.body.phone.trim() : '';
    let address = req.body.address ? req.body.address.trim() : '';
    let products = req.body.products ? req.body.products : '';
  
    if (username != '' && password != '' && firstname != '' && lastname != '' && email != '' && phone != '' && address != '' && products != '') {
      password = await bcrypt.hash(password, saltRounds);
  
      User.findOne({username}, (err, user) => {
        if (err) {
          console.log(err);
        }
  
        if (!user) {
          new User({
            username,
            password,
            firstname,
            lastname,
            email,
            phone,
            address,
            products,
          }).save(err => {
              if (err) {
                  console.error('Error');
              }
  
              global.sendMsg(res, 'success', 'register', user);
          });
      
          return;
        } else {
            global.sendMsg(res, 'error', 'register', {
            username,
            password,
          });
        }
      });
    } else {
        global.sendMsg(res, 'error', 'register', {
        username,
        password,
      });
    }
}
