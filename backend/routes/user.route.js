import express from 'express'
import { allUsers, login, logout, signup } from '../controller/user.controller.js'
import secureRoute from '../middleware/secureRoute.js';
import multer from 'multer';

const router = express.Router()

const storageUniv = multer.diskStorage({
    destination: "uploadsUniv/",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    },
  });
  const uploadUniv = multer({
    storage: storageUniv,
  });
router.post('/signup', uploadUniv.single("image"),signup);


router.post('/login', login);
router.post('/logout', logout);
router.get('/allusers', secureRoute, allUsers)


export default router;