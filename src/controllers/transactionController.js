require('express')
const Transaction = require('../models/classes/schemas/transaction')

class TransactionController{

    async index(req ,res) { 
        let transactions =  await Transaction.find().lean();
        res.render('transactions/index', { 
            title: 'Transactions',
            transactions
        });
        }  
}

const transactionController = new TransactionController();
module.exports = transactionController;