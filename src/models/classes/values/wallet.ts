import { Wallet } from "../context/wallet";
import { Value } from "./value";
const WalletSchema = require('../schemas/wallet')

const TYPE = "WALLET"
export class WalletType implements Value{
    type : string;
    private symbol : string;  
    constructor(symbol: string){
        this.type = TYPE
        this.symbol = symbol;
    }

    getSymbol(){
        return this.symbol
    }

    toJSON(){
        return '{ "type":"'.concat(this.type,'","symbol":"',this.symbol,'" }')
    }

    execute(wallet : Wallet){
        let value = wallet.getCoinAmount(this.symbol)
        if (value == undefined){
            return 0
        }
        return value
    }

    async executeFromDataBase(userId:string){
        let wallet = await WalletSchema.findOne({coin: this.symbol}).lean();
        if (wallet){
            return wallet.amount
        } else {
            return 0
        }     
    }
}