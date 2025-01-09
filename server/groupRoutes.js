import express from 'express'
import {createGroup,sendGroupMessage} from './controllers/group.js' 
import { upload } from './app.js';

const router = express.Router();

router.post('/createGroup',createGroup);
router.post('/sendGroupMessage',sendGroupMessage);


export default router;