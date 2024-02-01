import { Coin } from '../context/coin';
import { Market } from '../context/market';
import { Variables } from '../context/variables';
import { Wallet } from '../context/wallet';
import { ActionFactory } from '../rules/action_factory';
import { Rules } from '../rules/rules';
import { ValueFactory } from '../values/value_factory';

const fs = require('fs')

const CONDITION = "condition"
const ACTION = "action"


const BOOLEAN = "BOOLEAN";
const NUMBER = "NUMBER";
const STRING = "STRING";

export class Parser {
	constructor(){};

	private parseJsonRule(json: any){
		let parsed = JSON.parse(json, (key, value) => {
			if (key == CONDITION){
				return this.parseCondition(value)
			}
			if (key == ACTION){
				return this.parseAction(value)
			}
			return value;
		  });
		return parsed
	}


	private parseAction(actions : any[]){
		let results: any[] = []
		let action_factory = new ActionFactory()
		if (actions.length == undefined){
			results.push(action_factory.createAction(actions))
		} else { 
			actions.forEach((action : any) => {
				results.push(action_factory.createAction(action))
			});
		}
		return results
		
	}


	private parseCondition(value : any){
		if (value.length != undefined){
			throw new Error("The condition must be one, cant be an array")
		} else { 
			let value_factory = new ValueFactory()
			return value_factory.createValue(value)	
		}
	}

	private validateNotUndefined(parameter: any,message: string){
        if (parameter == undefined){
            throw new Error(message)
        }
    }
	readJsonFromPath(path: string) {
        const json = fs.readFileSync(path, 'utf-8',  (err: any, data: any) => {
        });
		return json
    }

	convertJsonToRule(json : any){
		let parsedJson = this.parseJsonRule(json)
		this.validateNotUndefined(parsedJson.requiredVariables,"Required variables cant be undefined")
		this.validateNotUndefined(parsedJson.rules,"Rules cant be undefined")
		let requiredVariables = parsedJson.requiredVariables
		let rules = parsedJson.rules
		if (rules.length != undefined){
			rules = rules [0]	
		} 
		this.validateNotUndefined(rules.name,"Rule name cant be undefined")
		this.validateNotUndefined(rules.condition,"Rule condition cant be undefined")
		this.validateNotUndefined(rules.action,"Rule actions cant be undefined")
		return new Rules(requiredVariables,rules.name,rules.condition,rules.action)
	}

	readRuleFromPath(path: string) {
		let json = this.readJsonFromPath(path)
		return this.convertJsonToRule(json)
    }


	convertJsonToCoin(json:string ){
		let parsed = JSON.parse(json, (key, value) => {
			if (key == CONDITION){
				return this.parseCondition(value)
			}
			if (key == ACTION){
				return this.parseAction(value)
			}
			return value;
		  });
		return parsed
	}
    
	convertJsonToVariables(json:string){
		let parsed = JSON.parse(json)
		let variables = new Variables()
		if (parsed.length == undefined){
			return variables
		}
		parsed.forEach((key : any) => {
			variables.setVariable(key.name,key.value)
		});
		return variables
	}

	convertJsonToWallet(json:any){
		let parsed = JSON.parse(json)
		let wallet = new Wallet()
		if (parsed.length == undefined){
			return wallet
		}
		parsed.forEach((key : any) => {
			wallet.addAmount(key.symbol,key.amount)
		});
		return wallet
		
	}

	convertJsonToMarket(json: any){
		let parsed = JSON.parse(json)
		let market = new Market()
		if (parsed.length == undefined){
			return market
		}
		parsed.forEach((key : any) => {
			let coin = new Coin(key.name)
			if (key.values.length == undefined){
				market.setCoin(key.name,coin)
			} else {
				key.values.forEach((sub_key : any) => {
					coin.addValue(sub_key.value,new Date(sub_key.date))
				});
				market.setCoin(key.name, coin)
			}
		});
		return market
		
	}

	validateType(type:string,value:string){
		type = type.toUpperCase()
		if (type == STRING){
			return true
		} else if (type == BOOLEAN && typeof Boolean(value) == "boolean") {
			return true
		} else if (type == NUMBER && !Number.isNaN(Number(value))){
			return true
		} else {
			return false
		}
	}

	convertType(type:string,value:string){
		type = type.toUpperCase()
		if (type == BOOLEAN ) {
			return Boolean(value)
		} else if (type == NUMBER ){
			return Number(value)
		} else {
			return value
		}
	}
    
}
module.exports.Parser = Parser;