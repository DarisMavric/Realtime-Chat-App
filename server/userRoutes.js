import express from 'express'
import {editUser, getUsers, signIn, signUp} from './controllers/user.js' 
import { upload } from './app.js';

const router = express.Router();

router.post('/signin',signIn);
router.post('/signup',signUp);
router.post('/editUser',editUser);
router.get('/getUsers',getUsers);


export default router;