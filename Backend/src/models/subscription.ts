import mongoose from 'mongoose'

const subscription = mongoose.model('subscriptions', new mongoose.Schema({
    subscripiton: {
        type: Object,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    regEmails:{
        type : Array,
        default:[]
    },
    regSubscriptions:{
        type : Array,
        
    }
}));

export default subscription;