import { Coin } from "./coin";

export class Market {
    private coins : Map<string, any>;
    constructor() {
        this.coins = new Map<string, any>();
    }

    isEmpty(){
        return (this.coins.size == 0);
    }


    setCoin(name : string ,value : Coin){
        this.coins.set(name,value);
    }

    deleteCoin(name : string){
        this.coins.delete(name);
    }

    getCoin(name : string){
        return this.coins.get(name);
    }

    setCoinValue(currency: string, newValue: Number){
        var coin = this.getCoin(currency);
        if ( coin == undefined){
            coin = new Coin(currency);
        }
        coin.addValue(newValue, new Date());
        this.setCoin(currency, coin)
    }

    toJSON(){
        if (this.coins.size == 0){
            return "[]"
        }
        let str = '[ '
        let count = 0
        this.coins.forEach((v,k) => {
            let final_symbol = ",";
            if (count == this.coins.size - 1) {
                final_symbol = " ]";
            }
            count = count + 1;
            str = str.concat(v.toJSON(),final_symbol);
        }); 
        return str

   }
}

module.exports.Market = Market;