import express from 'express'
const router = express.Router();
import chatThread from '../../models/chat';
import fbUpdate from '../../actions/updateDetailsFIrebaseAuth';

router.post('/', async (req, res) => {



        try {
 


        } catch (e) {
            console.log(e);
            return res.send({status: "technical_error", isError : true})
        }


 


 
 
});

export default router;