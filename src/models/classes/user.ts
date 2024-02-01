import mongoose, {Schema, model} from 'mongoose'

export interface User extends mongoose.Document{
    user: String, 
    password: String, 
}

const UserSchema = new Schema({
    user: String, 
    password: String,   
})
export default model<User>('User', UserSchema)