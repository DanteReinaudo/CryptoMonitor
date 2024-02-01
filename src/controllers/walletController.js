require('express');
const axios = require('axios');
const { getUrl } = require('../models/classes/utils/binanceRequest')
const Wallet = require('../models/classes/schemas/wallet')

class WalletController {

  async index(req, res) {

    try {
      const response = await axios(getUrl('GET', 'account?', []));
      
      response.data.balances.forEach(async (element)=> {
          let wallet = await Wallet.findOne({coin: element.asset});
          if (wallet) {
              wallet.amount = element.free
              await wallet.save()
          } else {
              const wallet = {
                  coin: element.asset,
                  amount: element.free,
              }
              await Wallet.create(wallet) 
          }  
      }) 
      res.render('wallet', {
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


}

const walletController = new WalletController();
module.exports = walletController;