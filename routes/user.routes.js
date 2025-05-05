import express from "express";
import { handleLoginUser, handleRegisterUser, handleRegisterUserAsVendor } from "../controllers/user.controllers.js";
import { validateInput } from "../middleware/validateInput.middleware.js";
import { allRFP, createRFP } from "../controllers/rfp.controllers.js";

const router = express.Router();

router.post('/registervendor', validateInput, handleRegisterUserAsVendor);
router.post('/login', handleLoginUser);
router.post('/registeradmin', handleRegisterUser);
router.post('/createrfp', createRFP);
router.post('/allrfp', allRFP);

export default router;