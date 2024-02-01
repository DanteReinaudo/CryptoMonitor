const SIGNIFICANT_CHANGE = 0.1

type Pair<T,K> = [T,K];

export class Coin {
   name:string;
   values: number[]; 
   dates: Date[];

   constructor(name:string) {
      this.name=name;
      this.values = [];
      this.dates = [];
   }

   isEmpty(){
      return (this.values.length == 0);
   }

   getName() {
      return this.name;
   }

   getValuesLength(){
      return this.values.length;
   }

   private significantChange(value:number){
      let currentValue = this.getCurrentValue();
      if (currentValue == undefined){
         return true
      }
      let change = (Math.abs(currentValue - value) / currentValue) * 100
      return (change > SIGNIFICANT_CHANGE)
   }


   addValue(value:number,date:Date){
      if (value < 0) {
         throw new Error('Coin value must be positive.');
      }
      if (this.significantChange(value)){
         this.values.push(value);
         this.dates.push(date);
      }
      
   }

   getCurrentValue() {
      let index = this.values.length - 1;
      return this.values[index];
   }

   getCurrentValueDate() {
      let index = this.dates.length - 1;
      return this.dates[index];
   }

   getMaxValue() {
      return Math.max.apply(null, this.values)
   }

   getMinValue() {
      return Math.min.apply(null, this.values)
   }

   getMeanValue() {
      return this.obtainMean(this.values);
   }

   getMeanValueFromOtherCoin(otherCoin: Coin, minutes: number, actual_date: Date){
      let since_time = this.createTimeSince(minutes, actual_date)

      let coin_value_time = this.getValueByTime(since_time) 
      let other_coin_value_time = otherCoin.getValueByTime(since_time)

      if (!coin_value_time || !other_coin_value_time) {
         throw new Error('Not enough values.');
      }

      let dif_value_time = other_coin_value_time - coin_value_time
      let dif_value_actual_time = otherCoin.getCurrentValue() - this.getCurrentValue() 

      return dif_value_actual_time - dif_value_time
   }

   createTimeSince(minutes: number, actual_date: Date){
      return new Date(actual_date.getFullYear(), actual_date.getMonth(), actual_date.getDate(), actual_date.getHours(), actual_date.getMinutes() - minutes, actual_date.getSeconds()) 
   }

   getValueByTime(time: Date){
      if (this.isEmpty() || this.dates[0].toISOString() > time.toISOString()) {
         return undefined
      }

      let length = this.dates.length
      for(let i = 1; i < length; i++) {
         if (this.dates[i].toISOString() > time.toISOString()){
            return this.values[i-1]
         }
      }

      return this.getCurrentValue()
   }

   private obtainMean(values : number[]){
      let sum = 0;
      let length =values.length
      for(var i = 0; i < length ; i++){
         sum += values[i];
      }
      return sum / length;
   }

   valuesByDateRange(min_date : Date, max_date: Date){
      let values = [];
      let length = this.dates.length
      for(var i = 0; i < length ; i++){
         if (this.dates[i].toISOString() > min_date.toISOString() && this.dates[i].toISOString() <= max_date.toISOString()){
            values.push(this.values[i]);
         }
      }
      return values;
   }

   private getDateXDaysAgo(numOfDays : number, date : Date) {
      let daysAgo = new Date(date.getTime());
    
      daysAgo.setDate(date.getDate() - numOfDays);
    
      return daysAgo;
    }

   getValueByDate(date : Date) {
      let length = this.dates.length
      for(var i = 0; i < length ; i++){
         if (this.dates[i].toISOString() == date.toISOString()){
            return this.values[i];
         }
      }
      return undefined;
   }

   private validateDates(min_date : Date, max_date: Date){
      if (min_date.toISOString() > max_date.toISOString()){
         throw new Error('Min date must be minor than Max Date.');
      }
   }

   getMaxValueByDates(min_date : Date, max_date: Date) {
      this.validateDates(min_date,max_date);
      let values = this.valuesByDateRange(min_date, max_date);
      if (values.length == 0){
         return undefined;
      }
      return Math.max.apply(null, values)
   }

   getMinValueByDates(min_date : Date, max_date: Date) {
      this.validateDates(min_date,max_date);
      let values = this.valuesByDateRange(min_date, max_date);
      if (values.length == 0){
         return undefined;
      }
      return Math.min.apply(null, values)
   }

   getMeanValueByDates(min_date : Date, max_date: Date) {
      this.validateDates(min_date,max_date);
      let values = this.valuesByDateRange(min_date, max_date);
      if (values.length == 0){
         return undefined;
      }
      return this.obtainMean(values);
   }

   getMeanValuesFromTheLastXDays(daysAgo : number, date : Date){
      if (daysAgo < 0) {
         throw new Error('Days Ago value must be positive.');
      }
      let means = [];
      for (var i = 0; i < daysAgo ; i++){
         let min_date = this.getDateXDaysAgo(daysAgo - i,date);
         let max_date = this.getDateXDaysAgo(daysAgo - i - 1,date);
         let mean = this.getMeanValueByDates(min_date,max_date);
         means.push(mean);
      }
      return means;
   }

   toJSON(){
      let values = this.valueToJSON('","values":[');
      return '{ "name":"'.concat(this.name,values, " }")

   }


   private valueToJSON(value:string) {
      
      this.values.forEach((number: number, index: any) => {
         if (index != this.values.length - 1) {
            value = value.concat('{"value":',number.toString(),',"date":"',this.dates[index].toISOString(), '"},');
         } else {
            value = value.concat('{"value":',number.toString(),',"date":"',this.dates[index].toISOString(), '"}');
         }     
      });
      return value.concat("]");
   }

}

module.exports.Coin = Coin;