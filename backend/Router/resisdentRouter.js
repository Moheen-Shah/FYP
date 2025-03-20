const express = require("express")
const resisdentController = require('./../Controllers/resisdentController')

const router = express.Router();

router.route('/').get(resisdentController.getAllresisdents)
router.route('/signup').post(resisdentController.signup);

router.route('/resisdent-details').get(resisdentController.verifyToken,resisdentController.resisdentdetail)
router.route('/delete-resisdent/:id').delete(resisdentController.deleteResisdent)
module.exports = router;

