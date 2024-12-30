import express from 'express'
import {sendMessage,getMessages} from './controllers/message.js' 

const router = express.Router();

router.post('/sendMessage',sendMessage);
router.post('/getMessages',getMessages);


export default router;