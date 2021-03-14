const express = require("express");
const router = express.Router();
const Auth=require('./../controllers/Auth');


router.post('/signup',Auth.signup);
router.post('/login',Auth.login);
router.post('/updatePassword',Auth.protect,Auth.updatePassword);

module.exports=router;
