import { Market } from "../context/market";
import { Variables } from "../context/variables";
import { Wallet } from "../context/wallet";
import { Executer } from "../utils/executer";
import { Value } from "../values/value";
const {keys} =  require ("../../../keys")


const { Spot } = require('@binance/connector');
const client = new Spot(keys.BINANCE_API_KEY, keys.BINANCE_API_SECRET,{ baseURL: 'https://testnet.binance.vision'});
const TransactionSchema = require('../schemas/transaction')   
const VariableSchema = require('../schemas/variable')  

const BUY_MARKET = "BUY_MARKET"
const SELL_MARKET = "SELL_MARKET"
const SET_VARIABLE = "SET_VARIABLE"

const BASE_COIN = "USDT"


async function sellMarket(value: number, symbol: string) {
    try {
        let response = await client.newOrder(symbol, 'SELL', 'MARKET', {
            quantity: value,
        })
        return response.data
    } catch(error){
        console.log(error)
        return false
    }
}

async function buyMarket(value: number, symbol: string){
    try {
        let response = await client.newOrder(symbol, 'BUY', 'MARKET', {
            quantity: value,
        })
        return response.data
    } catch(error){
        console.log(error)
        return false
    }
}


export interface Action {
    type: string,
    toJSON():string,
    execute(variables: Variables, market: Market, wallet: Wallet) : boolean;
   executeFromBinance(userId:string) : Promise<boolean>; 
}

export class ActionBuyMarket implements Action {
    type: string;
    symbol: string;
    amount: Value
    constructor(symbol: string, amount: Value) {
        this.type = BUY_MARKET,
        this.symbol = symbol,
        this.amount = amount
    }

    private obtainChange(toBuyCoinName : string, toSellCoinName: string,market : Market){
        let toBuyCoin = market.getCoin(toBuyCoinName); //BTC
        if (toBuyCoin == undefined) return undefined
        let toBuyValue = toBuyCoin.getCurrentValue();

        if (toSellCoinName == BASE_COIN){
            return toBuyValue;
        } else {
            let toSellCoin = market.getCoin(toSellCoinName); //ETH
            if (toSellCoin == undefined) return undefined
            let toSellValue = toSellCoin.getCurrentValue()
            return  toSellValue / toBuyValue
        }
    }

    // Si es BTC/USD compra bitcoins con dolares
    execute(variables: Variables, market: Market, wallet: Wallet): boolean {
        var separateCoins = this.symbol.split('/');
        let toBuyValue = this.obtainChange(separateCoins[0],separateCoins[1],market);
        if (toBuyValue == undefined) return false

        var amountAvailable = wallet.getCoinAmount(separateCoins[1]);
        let executer = new Executer()
        let result = executer.execute(this.amount,variables,market,wallet)
        if (amountAvailable == undefined || amountAvailable < result * toBuyValue) return false;

        wallet.reduceAmount(separateCoins[1], toBuyValue * result);
        wallet.addAmount(separateCoins[0], result);

        return true;
    }
    
    // Si es BTC/USD compra bitcoins con dolares
    async executeFromBinance(userId:string){
        const amount = await this.amount.executeFromDataBase(userId)
        if (typeof amount != "number"){
            throw new Error("The amount must be a number")
        }

        let response = await buyMarket(amount, this.symbol);
        console.log(response)
        const transaction = {
            userId: userId,
            action: response.side,
            symbol: response.symbol,
            oriqQty: response.origQty,
            executedQty: response.executedQty,
            cummulativeQty: response.cummulativeQuoteQty,
            }

        await TransactionSchema.create(transaction)

        return true
    }

    toJSON(): string {
        return '{ "type":"'.concat(this.type,'","symbol":"',this.symbol,'","amount":',this.amount.toJSON(), ' }') 
    }
}

export class ActionSellMarket implements Action {
    type: string;
    symbol: string;
    amount: Value
    constructor(symbol: string, amount: Value ) {
        this.type = SELL_MARKET,
        this.symbol = symbol,
        this.amount = amount
    }

    private obtainChange(toSellCoinName : string, toBuyCoinName: string,market : Market){
        let toSellCoin = market.getCoin(toSellCoinName); //BTC
        if (toSellCoin == undefined) return undefined
        let toSellValue = toSellCoin.getCurrentValue();

        if (toBuyCoinName == BASE_COIN){
            return toSellValue;
        } else {
            let toBuyCoin = market.getCoin(toBuyCoinName); //ETH
            if (toBuyCoin == undefined) return undefined
            let toBuyValue = toBuyCoin.getCurrentValue()
            return  toBuyValue / toSellValue 
        }
    }

    // Si es BTC/USD vende bitcoins compra dolares
    execute(variables: Variables, market: Market, wallet: Wallet): boolean {
        var separateCoins = this.symbol.split('/');
        let toGetValue = this.obtainChange(separateCoins[0],separateCoins[1],market);
        if (toGetValue == undefined) return false
        var amountAvailable = wallet.getCoinAmount(separateCoins[0]);
        let executer = new Executer()
        let result = executer.execute(this.amount,variables,market,wallet)
        if (amountAvailable == undefined || amountAvailable < result) return false;
        wallet.reduceAmount(separateCoins[0], result);
        wallet.addAmount(separateCoins[1], toGetValue * result);
        return true;
    }


    

    // Si es BTC/USD compra bitcoins con dolares
    async executeFromBinance(userId:string){
        const amount = await this.amount.executeFromDataBase(userId)
        if (typeof amount != "number"){
            throw new Error("The amount must be a number")
        }
        let response = await sellMarket(amount, this.symbol);
        const transaction = {
            userId: userId,
            action: response.side,
            symbol: response.symbol,
            oriqQty: response.origQty,
            executedQty: response.cummulativeQuoteQty,
            cummulativeQty: response.executedQty,
        }

        await TransactionSchema.create(transaction)
        return true
    }

    toJSON(): string {
        return '{ "type":"'.concat(this.type,'","symbol":"',this.symbol,'","amount":',this.amount.toJSON(), ' }') 
    }
}
export class ActionSetVariable implements Action {
    type: string;
    name: string;
    value: Value;
    constructor(name: string, value: Value) {
        this.type = SET_VARIABLE,
        this.name = name,
        this.value = value
    }
    execute(variables: Variables, market: Market, wallet: Wallet): boolean {
        let executer = new Executer()
        let result = executer.execute(this.value,variables,market,wallet) 
        variables.setVariable(this.name,result)
        return true
    }

    async executeFromBinance(userId:string) {
        let result = await this.value.executeFromDataBase(userId) 
        let variableOnBDD = await VariableSchema.findOne({ name: this.name })
        if (variableOnBDD) {
            variableOnBDD.type =  typeof result
            variableOnBDD.value = result
            variableOnBDD.userId = userId
            await variableOnBDD.save()
        } else {
            const variable = {
                name: this.name,
                type:  typeof result,
                value: result,
                userId: userId,
            }
            await VariableSchema.create(variable) 
        }  

        
        return true
    }

    toJSON(): string {
        return '{ "type":"'.concat(this.type,'","name":"',this.name,'","value":',this.value.toJSON(), ' }') 
    }

}

module.exports.Rules = ActionBuyMarket, ActionSellMarket, ActionSetVariable;