require('express');
const { keys } = require('../../../keys')
var CryptoJS = require("crypto-js");
const axios = require('axios');

function signature(time: number) {
    return CryptoJS.HmacSHA256(
        `timestamp=${time}` ,
        keys.BINANCE_API_SECRET).toString(CryptoJS.enc.Hex)
}

function signatureTransaction(time: number, symbol: string , limit: string) {
    var url: string = `timestamp=${time}` + symbol ? `symbol=${symbol}`: '' + limit ? `limit=${limit}` : ''; 
    return CryptoJS.HmacSHA256(
        url,
        keys.BINANCE_API_SECRET).toString(CryptoJS.enc.Hex)
}


const binanceConfig = {
    'Content-Type': 'application/json',
    'X-MBX-APIKEY': keys.BINANCE_API_KEY
}

function getUrl(method: string, request: string, params: string[]) {
    var time = new Date().getTime()
    const keyPairs: string[] = []
    params.forEach((_: string, index: number) => {
        request = request.replace("${}",params[index])
    })

    return {
        method: method,
        headers: binanceConfig,
        url: keys.BINANCE_URL + request + 'timestamp=' + time.toString() + '&signature=' + signature(time),
    };
}

function getUrlTransaction(method: string, request: string, params: string[]) {
    var time = new Date().getTime()
    const keyPairs: string[] = []
    params.forEach((_: string, index: number) => {
        request = request.replace("${}",params[index])
    })

    return {
        method: method,
        headers: binanceConfig,
        url: keys.BINANCE_URL + request + 'timestamp=' + time.toString() + '&signature=' + signatureTransaction(time, params[0], params[1]),
    };
}


export const buildUrl = (command : string, params : {[index: string]:string}) => {
    const timestamp = new Date().getTime();
    let url = keys.BINANCE_URL + command + `?timestamp=${timestamp}`
    for (let key in params) {
        url += `&${key}=${params[key]}`
    }
    url += `&signature=${buildSignature(url)}`

    return url;
}

const buildSignature = (url: string) => {
    return CryptoJS.HmacSHA256(
        url.split('?')[1],
        keys.BINANCE_API_SECRET
    ).toString(CryptoJS.enc.Hex);
};

export { getUrl, getUrlTransaction }