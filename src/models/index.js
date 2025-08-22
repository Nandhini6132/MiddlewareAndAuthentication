
import mongoose from 'mongoose';



const UserSchema= new mongoose.Schema({
    userName:String,
    email:String,
    password:String,
});

const Data= mongoose.models.Userdata || mongoose.model('Userdata', UserSchema);

export default Data
