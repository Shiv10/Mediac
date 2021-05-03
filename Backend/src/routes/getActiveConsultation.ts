import express from 'express'
import consultations from '../models/consultation'

const router = express.Router();

router.post('/', async (req, res) => {
    const consultation: any = await consultations.find({patientEmail: req.body.email});
    if (consultation.length != 0){
        return res.send({status: true, consultation});
    }
    //sending dummy data for testing
    return res.send({status: false});
});

export default router;