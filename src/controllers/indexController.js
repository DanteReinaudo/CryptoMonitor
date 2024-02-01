const express = require('express')
const User = require('../models/classes/schemas/user')
const { keys } = require('../keys');

const jwt = require("jsonwebtoken")


class IndexController{
    home(req ,res, next) {
        res.render("index",{lastName: req.user.lastName, firstName: req.user.firstName, title:" Bienvenidos a Crypto Montior"})
    }

    login(req ,res, next) {
        res.render("login",{
            layout : "login",
            title:" Bienvenidos a Crypto Montior"
        })
    }

    register(req ,res, next) {
        res.render("login/register",{
            layout : "login",
            title:" Registro - Cryptomonitor"
        })
    }

    async validateLogin(req ,res){
        const {email,password} = req.body ;     
        try {
            const user = await User.findOne({mail: email}).lean();
            if (user) {
              if (user.password === password){
                  await jwt.sign({
                          user: user,
                      },"secret", { expiresIn: "1h" },
                      (err, token) => {
                          res.cookie('token', token, { expires: new Date(Date.now() + (15*24*60*60*1000))})
                          if (email === keys.ADMIN_EMAIL) {
                              res.redirect('/admin');
                          } else {
                              res.redirect('/home');
                          }
                      })

              } else {
                res.redirect('/');
              }  
            } else {
                res.redirect('/');
            }

          } catch (err) {
            console.error(err)
          }     
    }

    async validateRegister(req ,res){
        const {firstName,lastName,email,password} = req.body ;
        try {
            let user = await User.findOne({mail: email}).lean();  
            if (user) {
                res.redirect('/');
            } else {
                let admin = false
                if (email === keys.ADMIN_EMAIL){
                    admin =true
                }
                const newUser = {
                    mail:email,
                    password:password,
                    firstName: firstName,
                    lastName: lastName,
                    admin : admin
                }
                user = await User.create(newUser)
                jwt.sign({
                    user: user,
                  },"secret", { expiresIn: "1h" }, 
                  (err, token) => {
                    if (err) {
                      return res.redirect(`/`)
                    }
                    res.cookie('token', token, { expires: new Date(Date.now() + (15*24*60*60*1000)) })
                    return res.redirect(`/home`)
                  })
            }
          } catch (err) {
            console.error(err)
          }         
    }
    
}

const indexController = new IndexController();
module.exports = indexController;