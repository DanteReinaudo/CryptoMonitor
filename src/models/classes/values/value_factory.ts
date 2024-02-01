import { Call } from "./call"
import { Constant } from "./constant"
import { Data } from "./data"
import { Value } from "./value"
import { Variable } from "./variable"
import { WalletType } from "./wallet"

const DATA_TYPE = "DATA"
const CONSTANT_TYPE = "CONSTANT"
const WALLET_TYPE = "WALLET"
const VARIABLE_TYPE = "VARIABLE"
const CALL_TYPE = "CALL"

export class ValueFactory {
    constructor(){}

    createValue(value: any): Value {
        this.validateNotUndefined(value.type,"Value type cant be undefined")
        if (value.type == CALL_TYPE){
            return this.createCall(value)

        } else if (value.type == VARIABLE_TYPE){
            return this.createVariable(value)

        } else if (value.type == CONSTANT_TYPE){
            return this.createConstant(value)
            
        } else if (value.type == WALLET_TYPE){
            return this.createWalletType(value)
            
        } else if (value.type == DATA_TYPE){
            return this.createData(value)
            
        } else {
            throw new Error("Invalid Value type")
        }
    }

    private createData(value: any) {
        this.validateNotUndefined(value.symbol, "DATA symbol cant be undefined")
        this.validateNotUndefined(value.from, "DATA from cant be undefined")
        this.validateNotUndefined(value.until, "DATA until cant be undefined")
        this.validateString(value.symbol, "Symbol")
        this.validateNumber(value.from, "FROM")
        this.validateNumber(value.until, "UNTIL")
        let def: Array<Value> = []
        if (value.default == undefined){
            return new Data(value.symbol, value.from, value.until, def)
        } else if (value.default.length == undefined){
            def.push(this.createValue(value.default))
        } else {
            value.default.forEach((arg: any) => {
                def.push(this.createValue(arg))
            })
        }
        return new Data(value.symbol, value.from, value.until, def)
    }

    private createWalletType(value: any) {
        this.validateNotUndefined(value.symbol, "WALLET symbol cant be undefined")
        this.validateString(value.symbol, "Symbol")
        return new WalletType(value.symbol)
    }

    private createConstant(value: any) {
        this.validateNotUndefined(value.value, "CONSTANT value cant be undefined")
        this.validateConstantType(value.value)
        return new Constant(value.value)
    }

    private createVariable(value: any) {
        this.validateNotUndefined(value.name, "VARIABLE name cant be undefined")
        this.validateString(value.name, "Name")
        return new Variable(value.name)
    }

    private createCall(value: any) {
        this.validateNotUndefined(value.arguments, "CALL TYPE arguments cant be undefined")
        this.validateNotUndefined(value.name, "CALL TYPE name cant be undefined")
        this.validateString(value.name, "Name")
        let args: Array<Value> = []
        if (value.arguments.length == undefined){
            args.push(this.createValue(value.arguments))
        } else {
            value.arguments.forEach((arg: any) => {
                args.push(this.createValue(arg))
            })
        }  
        return new Call(value.name, args)
    }

    private validateNotUndefined(parameter: any,message: string){
        if (parameter == undefined){
            throw new Error(message)
        }
    }

    private validateString(parameter: any,str : string){
        if (typeof parameter != "string"){
            throw new Error(str.concat(" must be a string"))
        }      
    }

    private validateNumber(parameter: any,str : string){
        if (typeof parameter != "number"){
            throw new Error(str.concat(" must be a number"))
        }      
    }

    private validateConstantType(parameter: any){
        if (typeof parameter != "string" && typeof parameter != "boolean" && typeof parameter != "number"){
            throw new Error("Constant value must be an string, boleean or number")
        }      
    }

}