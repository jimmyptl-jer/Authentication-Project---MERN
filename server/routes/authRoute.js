import express from 'express';
import cors from 'cors';

import {getAuth,postRegisterUser,postLoginUser} from '../controller/authController.js'

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

router.get('/', getAuth);
router.post('/register',postRegisterUser);
router.post('/login',postLoginUser)

export default router;
