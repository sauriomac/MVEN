import mongoose from 'mongoose';

const uniqueValidator = require('mongoose-unique-validator');


const roles = {
    values:['ADMIN', 'USER'],
    message:'{VALUE} rol no valido'
}


const Schema = mongoose.Schema;

const UserSchema = new Schema({

    nombre:   { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'Email es necesario'] },
    pass: { type: String, required: [true, 'Pass es necesario'] },
    date: { type: Date, default: Date.now },
    role: { type: String, default: 'USER', enum: roles },
    activo: { type: Boolean, default: true }
});

UserSchema.plugin(uniqueValidator, { message: 'Error, esperaba {PATH} único.' });

UserSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.pass;
    return obj;
   }

const User = mongoose.model('User',UserSchema);

export default User;