import { ActionSetVariable, ActionSellMarket, ActionBuyMarket } from '../rules/action';
import { ValueFactory } from '../values/value_factory';

const BUY_MARKET = "BUY_MARKET"
const SELL_MARKET = "SELL_MARKET"
const SET_VARIABLE = "SET_VARIABLE"

export class ActionFactory {
    constructor(){}

    createAction(action: any){
        if (action.type == BUY_MARKET){
            return this.createBuyMarket(action);
        } else if (action.type == SELL_MARKET){
            return this.createSellMarket(action);
        } else if (action.type == SET_VARIABLE){
            return this.createSetVariable(action);              
        } else {
            throw new Error('Action not recognized:'.concat(' ', action.type));
        }
    }

    private createSetVariable(action: any) {
        this.validateNotUndefined(action.name, "SET VARIABLE name cant be undefined");
        this.validateNotUndefined(action.value, "SET VARIABLE value cant be undefined");
        this.validateString(action.name, "SET VARIABLE name must be a string");
        let value_factory = new ValueFactory()
        let value = value_factory.createValue(action.value);
        return new ActionSetVariable(action.name, value);
    }

    private createSellMarket(action: any) {
        this.validateNotUndefined(action.symbol, "SELL MARKET Symbol cant be undefined");
        this.validateNotUndefined(action.amount, "SELL MARKET amount cant be undefined");
        this.validateString(action.symbol, "SELL MARKET symbol must be a string");
        let value_factory = new ValueFactory()
        let value = value_factory.createValue(action.amount);
        return new ActionSellMarket(action.symbol, value);
    }

    private createBuyMarket(action: any) {
        this.validateNotUndefined(action.symbol, "BUY MARKET symbol cant be undefined");
        this.validateNotUndefined(action.amount, "BUY MARKET amount cant be undefined");
        this.validateString(action.symbol, "BUY MARKET symbol must be a string");
        
        let value_factory = new ValueFactory()
        let value = value_factory.createValue(action.amount);
        return new ActionBuyMarket(action.symbol, value);
    }

    private validateNotUndefined(parameter:any,message : string){
		if ( parameter == undefined ){
            throw new Error(message)
        }
	}

    private validateString(parameter:any,message : string){
		if ( typeof parameter != "string" ){
            throw new Error(message)
        }
	}
}