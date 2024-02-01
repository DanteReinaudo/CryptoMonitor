require('express');
const Market = require('../models/classes/schemas/market')
class MarketController{
    async index(req ,res) {
        let market = await Market.find({}).lean();
        res.render('market', { 
                title: 'Market',
                market
        });
    }
    
}
const marketController = new MarketController();
module.exports = marketController;