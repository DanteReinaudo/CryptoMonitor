export class Wallet {
    private amount : Map<string, number>;

    constructor() {
        this.amount = new Map<string, number>();
    }
    
    isEmpty(){
        return (this.amount.size == 0);
    }

    addAmount(name : string ,value : number){
        let actual = this.amount.get(name);
        if (actual == undefined) {
            actual= value;
        } else{
            actual += value;
            this.amount.delete(name);
        }
        this.amount.set(name,actual);
    }

    reduceAmount(name : string,value : number){
        let actual = this.amount.get(name);
        if (actual != undefined) {
            actual -= value;
            this.amount.delete(name);
            if (actual >= 0) { 
                this.amount.set(name,actual);
            }
        }
        
    }

    getCoinAmount(name : string){
        return this.amount.get(name);
    }


    toJSON(){
        if (this.amount.size == 0){
            return "[]"
        }

        let str = "[ "
        let count = 0
        this.amount.forEach((v,k) => {
            let final_symbol = ",";
            if (count == this.amount.size - 1) {
                final_symbol = " ]";
            }
            count = count + 1;
            str = str.concat('{"symbol":"',k,'","amount":',v.toString(),"}",final_symbol);
        }); 
        return str

   }

}

module.exports.Wallet = Wallet;