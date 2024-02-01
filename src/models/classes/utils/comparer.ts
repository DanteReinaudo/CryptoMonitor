import {Coin} from '../context/coin';
import { Wallet } from '../context/wallet';

export enum State{
    Stable,
    Rising,
    Falling
}

export enum Operation{
    Operable,
    NotOperable,
}

export class Comparer{

    constructor(){}

    
    // Devuelve el estado de la primer moneda en comparacion con la segunda (En suba, En baja o Estable)
    compareCoinStates(coin1: Coin, coin2: Coin){
        let actualValueCoin1 = coin1.getCurrentValue()
        let actualValueCoin2 = coin2.getCurrentValue()
        if (actualValueCoin1 == actualValueCoin2){
            return State.Stable
        }
        if (actualValueCoin1 == undefined){
            return State.Falling
        } 
        if (actualValueCoin2 == undefined){
            return State.Rising
        }
        return this.compareStates(actualValueCoin1,actualValueCoin2)
    }

    private compareStates(value1: number,value2:number){
        if (value1 > value2){
            return State.Rising
        } else if (value1 < value2){
            return State.Falling
        } else {
            return State.Stable
        }
    }

    // Compara el valor actual de la moneda 1 con el valor actual de la moneda 2, si el primero es mayor devuelve Operable
    isOperable(coin1: Coin, coin2: Coin){
        let actualValueCoin1 = coin1.getCurrentValue()
        let actualValueCoin2 = coin2.getCurrentValue()
        if (actualValueCoin1 == undefined){
            return Operation.NotOperable
        } 
        if (actualValueCoin2 == undefined){
            return Operation.Operable
        }
        return this.compareOperation(actualValueCoin1,actualValueCoin2)  
    }
    

    private compareOperation(value1: number,value2:number){
        if (value1 > value2){
            return Operation.Operable
        } else {
            return Operation.NotOperable
        }
    }

    // Compara el la cantidad de una moneda que se tiene en una cartera con el valor value
    // Si es menor o igual, retorna No operable
    // Si es mayor, retorna Operable 
    compareAmountCoinValueOnWallet(name:string,wallet: Wallet,value:number){
        let coinAmount = wallet.getCoinAmount(name);
        if (coinAmount == undefined){
            return Operation.NotOperable
        } else {
            return this.compareOperation(coinAmount,value)
        }
    }

    // Compara el valor actual de una moneda en el mercado con el valor
    // Si es menor o igual, retorna No operable
    // Si es mayor, retorna Operable 
    compareCoinValueOnMarket(coin: Coin, value:number){
        let coinValue = coin.getCurrentValue();
        if (coinValue == undefined){
            return Operation.NotOperable
        } else {
            return this.compareOperation(coinValue,value)
        }
    }
}

module.exports.Comparer = Comparer;
module.exports.State = State;
module.exports.Operation = Operation;