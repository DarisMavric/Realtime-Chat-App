import express from 'express'
import {createGroup,sendGroupMessage,findGroup} from './controllers/group.js' 
import { upload } from './app.js';

const router = express.Router();

router.post('/createGroup',createGroup);
router.post('/sendGroupMessage',sendGroupMessage);
router.get('/findGroup',findGroup);


export default router;