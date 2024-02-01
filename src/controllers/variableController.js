require('express');
const Variable = require('../models/classes/schemas/variable')
const {Parser} = require ("../models/classes/utils/parser")

class VariableController{
    async index(req ,res) {
        let variables = await Variable.find({userId: req.user.mail}).lean();
        res.render('variables', { 
                title: 'Variables',
                variables
        });
    }

    add(req, res) {
        res.render("variables/add",{title:"Agregar Variable"})
        
    }

    async save(req, res) {
        const {name,type,value} = req.body ;
        let parser = new Parser()
        try {
            if (!parser.validateType(type,value)){
                throw new Error("The value ".concat(value," is not a ",type))
            }

            let variableOnBDD = await Variable.findOne({ name: name })
            if (variableOnBDD) {
                variableOnBDD.type = type
                variableOnBDD.value = parser.convertType(type,value)
                variableOnBDD.userId = req.user.mail
                await variableOnBDD.save()
            } else {
                const variable = {
                    name: name,
                    type: type,
                    value: parser.convertType(type,value),
                    userId: req.user.mail,
                }
                await Variable.create(variable) 
            }   
            res.redirect('/variables');
        }
        catch (err) {
            res.render("rules/error",{error: err, title:"Variable: Error"})
        }
    }
    
}
const variableController = new VariableController();
module.exports = variableController;