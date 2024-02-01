const WebSocket = require('ws');
//import { Market } from './context/market';
const express = require('express');
const Market = require('./schemas/market');

/**
 * Port to listen for HTTP control
 */
const HTTP_PORT = 9000;

/**
 * How many time to pass between update and update, in milliseconds.
 */
const BATCH_TIME = 5000;

/**
 * A currency change will only be considered if it's bigger
 * than the minimum relative variability allowed.
 */
const MINIMUM_RELATIVE_VARIABILITY_ALLOWED = 0.001;

//Valid Coins
const BTC = "BTCUSDT"
const ETH = "ETHUSDT"
const LUNA = "LUNAUSDT"
const NEO = "NEOUSDT"
const DODO = "DODOUSDT"
const COCOS = "COCOSUSDT"
const ALGO = "ALGOUSDT"
const LOKA = "LOKAUSDT"
const DOCK = "DOCKUSDT"
const BATU = "BATUSDT"
const BNB = "BNBUSDT"
const LTC = "LTCUSDT"
const TRX = "TRXUSDT"
const XRP = "XRPUSDT"
const BUSD = "BUSDUSDT"
const COINS = [BTC, ETH, LUNA, NEO, DODO, COCOS, ALGO, LOKA, DOCK, BATU, BNB, LTC, TRX, XRP, BUSD]

export interface BookTicker {
    u: number;
    s: string;
    b: string;
    B: string;
    a: string;
    A: string;
}


export function startBinanceService() {
    const valid_coins: Map<string, any> = new Map<string, any>();
    COINS.forEach((coin: any) => {
        valid_coins.set(coin, coin)
    });
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/!bookTicker`);
    socket.addEventListener('message', async (ev: any) => {
        const data: BookTicker = JSON.parse(ev.data.toString());
        const currency = data.s;
        const newValue = Number(data.b);
        if (valid_coins.get(currency) != undefined) {
            try {
                let coin = await Market.findOne({ coin: currency })
                if (coin) {
                    if (validate_variability_currency(newValue, coin.lastValue)) {
                        coin.value.push(newValue)
                        coin.date.push(new Date())
                        coin.lastValue = newValue
                        await coin.save()
                    }
                } else {
                    const newCoin = {
                        coin: currency,
                        value: [newValue],
                        date: [new Date()],
                        lastValue: newValue,
                    }
                    await Market.create(newCoin)
                }
            } catch (err) {
                console.error(err)
            }
        }
    });
    setInterval(() => { }, BATCH_TIME);
}

function validate_variability_currency(newValue: number, lastValue: number) {
    return Math.abs(newValue - lastValue) > lastValue * MINIMUM_RELATIVE_VARIABILITY_ALLOWED
}