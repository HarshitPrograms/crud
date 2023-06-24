import Mongoose from '@ioc:Mongoose'
//import mongoose from "@ioc:Mongoose";
//const mongoose= require ('mongoose');
const userSchema = new Mongoose.Schema({
  name: { type: String },
  Id: { type: Number },
  email: { type: String },
  address: { type: String },
})

const UserModel = Mongoose.model('User', userSchema)
// UserModel.createIndexes();
export default UserModel
