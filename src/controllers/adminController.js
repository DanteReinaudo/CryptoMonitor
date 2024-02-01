require('express')
const {Parser} = require ("../models/classes/utils/parser")
const Rule = require('../models/classes/schemas/rule')
const Market = require('../models/classes/schemas/market')
const Transaction = require('../models/classes/schemas/transaction')
var CryptoJS = require("crypto-js");
const axios = require('axios');
const { getUrl } = require('../models/classes/utils/binanceRequest')


class AdminController{
    home(req ,res) {
        res.render("index",{layout: "admin",title:" Bienvenidos a Crypto Montior"})
    }

    add_rules(req, res) {
        res.render("rules/add",{layout: "admin",title:"Agregar Reglas"})
        
    }

    async rules(req, res) {
        const rules = await Rule.find({}).lean();
        res.render('rules/admin', { 
            layout: "admin",
            title: 'Rules',
            rules
        });
    }

    async market(req, res) {
        let market = await Market.find({}).lean();
        res.render('market', { 
                layout: "admin",
                title: 'Market',
                market
        });
        
    }

    async wallet(req, res) {
        try {
            const response = await axios(getUrl('GET', 'account?', []));
            res.render('wallet', {
                layout: "admin",
                title: 'Wallet',
                wallet: response.data.balances
            })
            return response;
        }
        catch (err) {
            console.log(err);
            return err;
        };   
    }



    

    async transactions(req, res) {
        let transactions = await Transaction.find({}).lean();
            res.render('transactions/index', { 
                layout: "admin",
                title: 'Transactions',
                transactions
        });
        
    }

    async save(req, res) {
        const {name,description,format} = req.body ;
        let parser = new Parser()
        try {
            parser.convertJsonToRule(format)
            const rule = {
                name: name,
                description: description,
                format: format,
            }
            await Rule.create(rule)
            res.redirect('/admin/rules');
        }
        catch (err) {
            res.render("rules/error",{error: err,layout: "admin", title:"Reglas: Error"})
        }
    }
    
}

const adminController = new AdminController();
module.exports = adminController;