import express from 'express'
import {getUser,signIn,signUp} from './controllers/user.js' 

const router = express.Router();

router.post('/signin',signIn);
router.post('/signup',signUp);
router.get('/getUser',getUser);


export default router;