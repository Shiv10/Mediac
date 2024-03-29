import express from 'express';
import jwt from 'jsonwebtoken';
import patients from '../models/patients'
import fbUpdate from '../actions/updateDetailsFIrebaseAuth';

const verify = express.Router()

verify.get('/', (req, res) => {

    let token: any = req.query.token;
    let jwtSecret: any = process.env.JWT_SECRET;
    jwt.verify(token, jwtSecret, async (err: any, decoded: any) => {
        if (err) {
            console.error(err);
            return res.send({error: 'Could not verify!'});
        }

        var patient: any = await patients.findOne({uid: decoded._id});
        if (patient) {
            patient.verified = true;
            try {
                patient.save()
                fbUpdate.changeEmailVerificationStatus(patient.uid);
                
            } catch (e) {
                console.log(`Error in saving: ${e}`)
                return
            }
        } 
        res.redirect(process.env.WEB_URL+"login")
    });

});

export default verify;