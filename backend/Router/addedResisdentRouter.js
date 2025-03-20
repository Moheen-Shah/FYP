const express = require('express');
const addedResisdentController = require('./../Controllers/addedResisdentController');

const router = express.Router();

// Route for getting all added residents
router.route('/').get(addedResisdentController.getAllAddedResidents);
router.route('/add-resisdent').post(addedResisdentController.addResident)
// Route for login
router.route('/login').post(addedResisdentController.login);

// Route to get details of the logged-in added resident (requires token verification)
router.route('/added-resident-details')
    .get(addedResisdentController.verifyToken, addedResisdentController.getAddedResidentDetail);


    router.route('/delete-added-resident/:id')
    .delete( addedResisdentController.deleteAddedResident);



    router.route('/update-added-resident/:id')
    .patch( addedResisdentController.updateResident);


    router.route('/find-added-resident/:id')
    .get( addedResisdentController.findAddedResident);
module.exports = router;
