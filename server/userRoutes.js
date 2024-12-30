import express from 'express'
import {editUser, getUser,signIn,signUp} from './controllers/user.js' 

const router = express.Router();

router.post('/signin',signIn);
router.post('/signup',signUp);
router.post('/editUser',editUser);
router.get('/getUser',getUser);


export default router;