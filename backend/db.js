const mongoose = require('mongoose'); 
const { string } = require('zod');

mongoose.connect("mongodb://localhost:27017/paytm");

const userSchema = new mongoose.Schema({
    first_name :{
        type : String,
        required : true,
        minLength: 3,
        maxLength: 30
    },
    last_name :{
        type : String,
        required : true,
        minLength: 3,
        maxLength: 30
    },
    username:{
        type : String,
        required : true,
        minLength: 3,
    },
    password :{
        type : String,
        required : true,
        minLength: 6,
    }
}, {
    collection: 'userInfo'
});

const accountSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance:{
        type : Number,
        required : true
    } 
});



const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);


module.exports = {
    User,
    Account
};
