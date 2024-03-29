import express from 'express';
import patients from '../../models/patients';
import doctors from '../../models/doctors';
import video from '../../models/videos';
import checkAuthStatus from '../../actions/checkLoginStatus'

const router = express.Router();

router.post('/', async (req, res) => {



    try{
            var user: any ; 
    if(!await checkAuthStatus.checkAuthStatus(req))
    {
            var update = await video.updateOne(
        { _id: req.body.videoId },
         { $inc: { likes: 1 } }
   )
                return res.send({status: 'saved_successfuly', });

    }
    
    if(req.body.role == "doctor")
    {
        user= await doctors.findOne({uid: req.body.uid});
    }else{

        user= await patients.findOne({uid: req.body.uid});
    }
    console.log(user)

    if (user){
 
       
        try {
   
console.log(user.videoLikes)
if(!user.videoLikes)

{
    user.videoLikes = []
}
    console.log(user.videoLikes)

             if(!user.videoLikes.includes(req.body.videoId))
            {
                console.log("lodalassun")
 user.videoLikes.push(req.body.videoId);
        var i=   await  user.save()
        console.log(i)
   var update = await video.updateOne(
        { _id: req.body.videoId },
         { $inc: { likes: 1 } }
   )
                return res.send({status: 'saved_successfuly', });

            }
                    
             return res.send({status: 'saved_successfuly', });

        } catch (e) {
            console.log(e)
            return res.send({status: 'technical_error'});
        }
    }

    return res.send({status: 'patient_not_found'});
    }catch(e){
    return res.send({status: 'error'});

    }


});

export default router;