import { Variables } from "../context/variables";
import { Parser } from "../utils/parser";
import { Value } from "./value";
const VariableSchema = require('../schemas/variable')

const TYPE = "VARIABLE"
export class Variable implements Value{
    type : string;
    private name : string;  
    constructor(name: string){
        this.type = TYPE
        this.name = name;
    }

    getName(){
        return this.name
    }

    toJSON(){
        return '{ "type":"'.concat(this.type,'","name":"',this.name,'" }')
    }

    execute(variables: Variables){
        let value = variables.getValue(this.name)
        if (value == undefined){
            throw new Error('Variable: '.concat(this.name, " not found."))
        }
        return value;
    }

    async executeFromDataBase(userId:string){
        let parser = new Parser()
        let variable = await VariableSchema.findOne({name:this.name}).lean()
        if (variable){
            return parser.convertType(variable.type,variable.value)
        } else {
            throw new Error("Variable required: ".concat(this.name," not exist."))
        }
    }
}