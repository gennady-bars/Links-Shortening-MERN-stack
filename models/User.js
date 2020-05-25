const {Schema, model, Types} = require('mongoose')

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String},
  links: [{type: Types.ObjectId, ref: 'Link'}]
}, {timestamps:true})

module.exports = model('User', userSchema)