import { Action} from './action';
import { Wallet } from '../context/wallet';
import { Value } from '../values/value';
import { Variables } from '../context/variables';
import { Market } from '../context/market';
import { Executer } from '../utils/executer';

export class Rules {
    requiredVariables : string[];
    name: string;
    condition : Value;
    actions: Action[];


   constructor(requiredVariables: string[] ,name:string, condition: Value, actions: Action[] ) {
        this.validateNotEmpty(actions,"action")
        this.requiredVariables = requiredVariables
        this.name = name,
        this.condition = condition,
        this.actions = actions
   }

   private validateRequiredVariables(variables: Variables){
        this.requiredVariables.forEach((required : any) => {
            if (variables.getValue(required) == undefined){
                throw new Error("Variable required: ".concat(required," not exist."))
            }
        });
   }

   private validateNotEmpty(array: any,where: string){
        if (array.length == 0 || array.length == undefined){
            throw new Error("The length of the ".concat(where," array cant be 0."))
        }
   }

   private executeConditions(variables: Variables, market: Market, wallet : Wallet){
        let executer = new Executer();
        let result = executer.execute(this.condition,variables,market,wallet)
        if (typeof result != "boolean"){
            throw new Error("Condition result must be a boolean")
        }
        return result
   }

   apply(variables: Variables, market: Market, wallet : Wallet){
        this.validateRequiredVariables(variables)
        let result = this.executeConditions(variables,market,wallet)
        if (result){
            this.actions.forEach((action : Action) => {
                action.execute(variables,market,wallet)
            }); 
        }

        return result

   }

    // BDD SECTION
   async applyFromDataBase(userId:string){
        let result = await  this.executeConditionsFromDataBase(userId)
        if (result){
            this.actions.forEach(async (action : Action) => {
                await action.executeFromBinance(userId)
            }); 
        } else {
            throw new Error("The condition to apply the rule was false")
        }
    }

    private async executeConditionsFromDataBase(userId : string){
        let result = await this.condition.executeFromDataBase(userId)
        if (typeof result != "boolean"){
            throw new Error("Condition result must be a boolean")
        }
        return result
   }


// JSON SECTION

   toJSON(){
        let required = this.requiredVariablesToJSON();
        let actions = this.actionsToJSON(required); 
        return '{ '.concat(required,'"rules":[{ "name":"',this.name,'","condition":',this.condition.toJSON(),actions, "}] }")

   }

    private actionsToJSON(required: string) {
        let actions = ',"action":[';
        this.actions.forEach((value: Action, index: any) => {
            if (index != this.actions.length - 1) {
                actions = actions.concat(value.toJSON(), ",");
            } else {
                actions = actions.concat(value.toJSON());
            }

        });
        return actions.concat("]");
    }

    private requiredVariablesToJSON() {
        let required = '"requiredVariables":[';
        this.requiredVariables.forEach((value: any, index: any) => {
            if (index != this.requiredVariables.length - 1) {
                required = required.concat('"', value, '",');
             } else {
                required = required.concat('"', value, '"');
             } 
        });
        return required.concat("],");
    }
}


module.exports.Rules = Rules;