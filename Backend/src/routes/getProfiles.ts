import express from 'express'
import patients from '../models/patients'
import getAge from '../actions/getAge'
import consultations from '../models/consultation'
const router = express.Router();
import Settings from '../models/settings';
import chat from '../models/chat'

router.get('/', async (req, res) => {
try{


     if(req.body.role !== "patient")
    {
        return res.send({url : "/login", redirected : true})
    }
 var details = await Settings.find({})


        var patient: any = await patients.findOne({uid: req.body.uid} );
    if (patient) {
        let profiles = patient.profiles;

        var age  : any  = ""
        if(patient.dob)
        {
            age = getAge(patient.dob)
        }



        var consultation: any = await consultations.find({patientEmail: req.body.email});
  var consultationId = ''
  var chatId = "";
  console.log(consultation, "ALL")
   for(var i=0;i<consultation.length; i++)
   {
       if(consultation[i].scheduled === false)
       {

//for paid uncomment this immidieate below one and comment far below onw
//if(consultation[i].active && !consultation[i].accepted)
           
           //for not paid
           if(consultation[i].active  && (consultation[i].byDoctorStatus === 'on' || consultation[i].byDoctorStatus === 'no'))
            {
                           console.log(consultation[i].byDoctorStatus === 'on' || consultation[i].byDoctorStatus === 'no')

                               console.log(consultation[i])

                consultationId = consultation[i].uid

                 let ch :any= await chat.findOne({consultationId: consultationId});
                 if(ch){
                    
                    chatId = ch.chatId
                    }
                break
            }
       }
   }

var data = {status: 'success', data: details.length >0 ? details[0] : {} ,profiles: profiles, age : age, gender : patient.gender, phoneNumber : patient.phone , consultationId: consultationId , chatId :chatId}
   console.log(data)
 
         return res.send(data);
    }
 return   res.send({status: 'no_account_found'});
}catch(e)
{
    
    console.log(e)
     return   res.send({status: 'no_account_found'});

}
});

export default router;