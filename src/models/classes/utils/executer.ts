import { Market } from "../context/market";
import { Value } from "../values/value";
import { Variable } from "../values/variable";
import { Call } from "../values/call";
import { Wallet } from "../context/wallet";
import { Constant } from "../values/constant";
import { Data } from "../values/data";
import { Variables } from "../context/variables";
import { WalletType } from "../values/wallet";

export class Executer {

    constructor(){}
    execute(value: Value,variables: Variables,market: Market,wallet:Wallet){
        if (value instanceof Call){
            return value.execute(variables,market,wallet)
        }else if (value instanceof Variable){
            return value.execute(variables)
        }else if (value instanceof Constant){
            return value.execute()
        }else if (value instanceof Data){
            return value.execute(variables,market,wallet)
        }else if (value instanceof WalletType){
            return value.execute(wallet)
        } else {
            throw new Error("Cant execute, value has no valid instance")
        }
    }

}