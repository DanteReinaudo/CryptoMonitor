export interface Value {
    type : string;
    toJSON() : string;
    executeFromDataBase(userId:string): Promise<any>; 
};