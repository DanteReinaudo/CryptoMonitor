export class Variables {
    private variables : Map<string, any>;
    constructor() {
        this.variables = new Map<string, any>();
    }

    isEmpty(){
        return (this.variables.size == 0);
    }

    private validateTypes(value : any){
        if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean" ){
            throw new Error('Variable must have a string, bool or number type.')
        }

    }

    setVariable(name : string ,value : any){
        this.validateTypes(value);
        this.variables.set(name,value);
    }

    deleteVariable(name : string){
        this.variables.delete(name);
    }

    getValue(name : string){
        return this.variables.get(name);
    }

    private stringValue(value:any){
        if (typeof value !== "string") {
            return value.toString()
        } else {
            return '"'.concat(value,'"')
        }
    }
    
    toJSON(){
        if (this.variables.size == 0){
            return '[]'
        }
        let str = '[ '
        let count = 0
        this.variables.forEach((v,k) => {
            let final_symbol = ",";
            if (count == this.variables.size - 1) {
                final_symbol = " ]";
            }
            count = count + 1;
            str = str.concat('{"name":"',k,'","value":',this.stringValue(v),"}",final_symbol);
        }); 
        return str
   }

}

module.exports.Variables = Variables;