import { Value } from "./value";

const TYPE = "CONSTANT"
export class Constant implements Value{
    type : string;
    private value : any;  
    constructor(value : any){
        this.type = TYPE
        this.validateTypes(value)
        this.value = value;
    }

    private validateTypes(value : any){
        if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean" ){
            throw new Error('Constant must have a string, bool or number type.')
        }
    }

    getValue(){
        return this.value
    }

    toJSON() : string {
        let value = this.value;
        if (typeof value == "string"){
            value = "".concat('"',this.value,'"');
        }
        return '{ "type":"'.concat(this.type,'","value":',value,' }')
    }

    execute(){
        return this.value
    }

    executeFromDataBase(){
        return this.execute()
    }
}