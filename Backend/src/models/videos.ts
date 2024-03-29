import mongoose from 'mongoose'

const videos = mongoose.model('videos', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true
        
    },
    doctorId: {
        type: String,
        required: true,
        trim: true
    },
    metaDescription: {
        type: String,
        trim: true,
     },
    postData: {
        type: String,
        required: true,
     }, 
   
    postDate: {
        type: Date,
        required: true,
        default: Date.now
    },
   
    thumbnail: {
        type : String,
                required: true,
trim : true

    },
    
    videoLink: {
        type : String,
                required: true,
unique : true

    },
 
    keywords: {
        type: String,
 
    },
    likes : {

        type : Number,
        default : 0
    },
      views : {

        type : Number,
        default : 0
    }
}));

export default videos;