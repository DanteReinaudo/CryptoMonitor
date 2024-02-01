require('express')
const { Parser } = require("../models/classes/utils/parser")
const Rule = require('../models/classes/schemas/rule')
require('fs')

class RuleController {
    async index(req, res) {
        const rules = await Rule.find({}).lean();
        res.render('rules/index', {
            title: 'Rules',
            rules
        });
    }

    format(req, res) {
        res.render("rules/format", { title: " Format " })
    }

    async execute(req, res) {
        const { rule } = req.body;
        let parser = new Parser()
        try {
            let parsedRule = parser.convertJsonToRule(rule)
            parsedRule.applyFromDataBase(req.user.mail)
            res.render("rules/success", { name: req.user.displayName, title: "Execute Succes" })
        }
        catch (err) {
            res.render("rules/error", { err, title: "Execute Error" })
        }
    }

}

const ruleController = new RuleController();
module.exports = ruleController;
