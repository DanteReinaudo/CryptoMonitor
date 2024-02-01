import { Executer } from "../utils/executer";
import { Market } from "../context/market";
import { Variables } from "../context/variables";
import { Wallet } from "../context/wallet";
import { Value } from "./value";

const TYPE = "CALL"
export class Call implements Value{

    type : string;
    private name : string;  
    private arguments: Value[];

    constructor(name: string,arg: Array<Value>){
        this.type = TYPE
        this.name = name;
        this.arguments = arg
    }

    execute(variables:Variables, market: Market,wallet : Wallet){
        let executer = new Executer();
        let results: any[] = [];
        this.arguments.forEach((value : any) => {
            let result = executer.execute(value,variables,market,wallet)
            results.push(result)
        });
        return this.implement_call(results)
    }

    async executeFromDataBase( userId:string){
        let results = await this.obtainValues(userId);
        let flated = results.flat()
        return this.implement_call(flated)
    }

    async obtainValues( userId:string){
        let results: any[] = [];
        for (const value of this.arguments) {
            let result = await value.executeFromDataBase(userId)
            results.push(result)
        }
        return results
    }

    private countValidator(values: any[],type:string){
        let cant = 0;
        values.forEach((value : any) => {
            if (typeof value == type){
                cant+=1
            }
        })
        return cant
    }
    private validateNumericalOperations(values: any[]){
        let cant = this.countValidator(values,"number")
        if ( cant != values.length ){
            throw new Error('All the values for this operation must be numbers');
        }
    }
    private validateMoreThanOneValue(values: any[]){
        if ( values.length <= 1 ){
            throw new Error('Need more than 1 value for this operation');
        }
    }

    private validateBinaryOperations(values: any[]){
        if ( values.length != 2 ){
            throw new Error('Need exactly 2 values for this operation');
        }
    }

    private validateNotZeroDivision(values: any[]){
        if ( values[1] == 0){
            throw new Error('Zero division error');
        }
    }

    private validateNumericalOrBooleanOperation(values: any[]){
        let cantNumbers = this.countValidator(values,"number")
        let cantBooleans = this.countValidator(values,"boolean")
        if ( cantNumbers != values.length && cantBooleans != values.length  ){
            throw new Error('The values for this operation must be all numbers or all booleans');
        }
    }

    private validateBooleanOperation(values: any[]){
        let cant = this.countValidator(values,"boolean")
        if ( cant != values.length ){
            throw new Error('The values for this operation must be all booleans');
        }
    }

    private validateUnaryOperations(values: any[]){
        if ( values.length != 1 ){
            throw new Error('Need exactly 1 value for this operation');
        }
    }


    implement_call(values : any[]) {
        var operator: string = this.name;

        if (values == undefined || values.length == 0) {
            throw new Error('Cannot operate with an empty array');
        }

        const mapOperations: { [key: string]: Function } = {
            "+": (values: any[]) => {
                return this.addition(values);
            },
            "*": (values: any[]) => {
                return this.multiplication(values);
            },
            "MIN": (values: any[]) => {
                return this.minimum(values);
            },
            "MAX": (values: any[]) => {
                return this.maximum(values);
            },
            "AVERAGE": (values: any[]) => {
                return this.average(values);
            },
            "STDDEV": (values: any[]) => {
                return this.stddev(values);
            },
            "FIRST": (values: any[]) => {
                return this.first(values);
            },
            "LAST":(values: any[]) => {
                return this.last(values);
            },
            "-": (values: any[]) => {
                return this.substraction(values);
            },
            "/": (values: any[]) => {
                return this.division(values);
            },
            "==": (values: any[]) => {
                return this.equal(values);
            },
            "DISTINCT": (values: any[]) => {
                return this.distinct(values);
            },
            "<": (values: any[]) => {
                return this.lower(values);
            },
            "<=": (values: any[]) => {
                return this.lower_eq(values);
            },
            ">": (values: any[]) => {
                return this.greater(values);
            },
            ">=": (values: any[]) => {
                return this.greater_eq(values);
            },
            "NEGATE": (values: any[]) => {
                return this.negate(values);
            },
            "NOT": (values: any[]) => {
                return this.not(values);
            },
            "AND": (values: any[]) => {
                return this.and(values);
            },
            "OR": (values: any[]) => {       
                return this.or(values);
            }
        }

        if (mapOperations[operator] == undefined) {
            throw new Error('Invalid operator');
        } 

        return mapOperations[operator](values);

    }

    private or(values: any[]) {
        //boolean[]
        this.validateBooleanOperation(values);
        this.validateMoreThanOneValue(values);
        return values.reduce((a, b) => a || b);
    }

    private and(values: any[]) {
        //boolean[]
        this.validateBooleanOperation(values);
        this.validateMoreThanOneValue(values);
        return values.reduce((a, b) => a && b);
    }

    private not(values: any[]) {
        //boolean
        this.validateBooleanOperation(values);
        this.validateUnaryOperations(values);
        return !values[0];
    }

    private negate(values: any[]) {
        //number
        this.validateNumericalOperations(values);
        this.validateUnaryOperations(values);
        return (values[0] * -1);
    }

    private greater_eq(values: any[]) {
        //number[]
        this.validateNumericalOperations(values);
        this.validateMoreThanOneValue(values);
        return values.reduce((previousValue, currentValue, idx, array) => previousValue && (currentValue <= array[idx - 1]) ? true : false);
    }

    private greater(values: any[]) {
        //number[]
        this.validateNumericalOperations(values);
        this.validateMoreThanOneValue(values);
        return values.reduce((previousValue, currentValue, idx, array) => previousValue && (currentValue < array[idx - 1]) ? true : false);
    }

    private lower_eq(values: any[]) {
        //number[]
        this.validateNumericalOperations(values);
        this.validateMoreThanOneValue(values);
        return values.reduce((previousValue, currentValue, idx, array) => previousValue && (currentValue >= array[idx - 1]) ? true : false);
    }

    private lower(values: any[]) {
        //number[]
        this.validateNumericalOperations(values);
        this.validateMoreThanOneValue(values);
        return values.reduce((previousValue, currentValue, idx, array) => previousValue && (currentValue > array[idx - 1]) ? true : false);
    }

    private distinct(values: any[]) {
        //number[] or boolean[]
        this.validateNumericalOrBooleanOperation(values);
        this.validateMoreThanOneValue(values);
        const distinctValues = [...new Set(values)];
        return distinctValues.length == values.length;
    }

    private equal(values: any[]) {
        //number[] or boolean[]
        this.validateNumericalOrBooleanOperation(values);
        this.validateMoreThanOneValue(values);
        const distinctValues = [...new Set(values)];
        return distinctValues.length == 1;
    }

    private division(values: any[]) {
        //number[]
        this.validateNumericalOperations(values);
        this.validateBinaryOperations(values);
        this.validateNotZeroDivision(values);
        return values.reduce((a, b) => a / b);
    }

    private substraction(values: any[]) {
        //number[]
        this.validateNumericalOperations(values);
        this.validateBinaryOperations(values);
        return values.reduce((a, b) => a - b);
    }

    private last(values: any[]) {
        //number[]
        this.validateNumericalOperations(values);
        return values[values.length - 1];
    }

    private first(values: any[]) {
        //number[]
        this.validateNumericalOperations(values);
        return values[0];
    }

    private stddev(values: any[]) {
        //number[]
        this.validateNumericalOperations(values);
        this.validateMoreThanOneValue(values);
        const n = values.length;
        const mean = values.reduce((a, b) => a + b) / n;
        return Math.sqrt(values.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
    }

    private average(values: any[]) {
        //number[]
        this.validateNumericalOperations(values);
        return values.reduce((a, b) => a + b) / values.length;
    }

    private maximum(values: any[]) {
        //number[]
        this.validateNumericalOperations(values);
        return values.reduce((a, b) => b > a ? b : a);
    }

    private minimum(values: any[]) {
        //number[]
        this.validateNumericalOperations(values);
        return values.reduce((a, b) => b < a ? b : a);
    }

    private multiplication(values: any[]) {
        //number[]
        this.validateNumericalOperations(values);
        this.validateMoreThanOneValue(values);
        return values.reduce((a, b) => a * b);
    }

    private addition(values: any[]) {
        //number[]
        this.validateNumericalOperations(values);
        this.validateMoreThanOneValue(values);
        return values.reduce((a, b) => a + b);
    }

    toJSON() : string {
        let arg = '"arguments":[';
        this.arguments.forEach((value : Value, index : any) => {
            let final_symbol = ","
            if (index == this.arguments.length -1){
                final_symbol = "]";
            }
            arg = arg.concat(value.toJSON(),final_symbol);
        });
        return '{ "type":"'.concat(this.type,'","name":"',this.name,'",',arg, ' }')
    }
}