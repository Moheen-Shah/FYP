const Activity = require('./../Model/activityModel');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');




exports.getAllActivities = asyncErrorHandler(async (req, res, next) => {
    const activity = await Activity.find();

    res.status(200).json({
        status: 'success',
        totalActivities: activity.length,
        data: {
            activity
        }
    });
});

// Add a new activity
exports.addActivity = asyncErrorHandler(async (req, res, next) => {
    const newActivity = await Activity.create(req.body);
    console.log(newActivity);

    

    res.status(200).json({
        status: 'success',
        activity: newActivity
    });
});




// Get details of a specific activity for the logged-in user


// Delete an activity by ID
exports.deleteActivity = asyncErrorHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);

        const deletedActivity = await Activity.findByIdAndDelete(id);

        if (!deletedActivity) {
            return res.status(404).json({
                status: 'fail',
                message: 'Activity not found.'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Activity successfully deleted.',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
});
exports.assignActivityToStaff = asyncErrorHandler(async (req, res, next) => {
    const { activityId, staffId } = req.body;

    // Validate the input
    if (!activityId || !staffId) {
        return res.status(400).json({
            status: 'fail',
            message: 'Activity ID and Staff ID are required.'
        });
    }

    // Find the activity and update it with the staff ID
    const updatedActivity = await Activity.findByIdAndUpdate(
        activityId,
        { staffId: staffId },
        { new: true } // Return the updated document
    );

    // Check if the activity was found and updated
    if (!updatedActivity) {
        return res.status(404).json({
            status: 'fail',
            message: 'Activity not found.'
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Activity successfully assigned to staff.',
        activity: updatedActivity
    });
});

// Update an activity by ID
exports.updateActivity = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;

    // Find the activity by ID and update it with new data from the request body
    const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, {
        new: true,           // Return the updated document
        runValidators: true   // Ensure the updated data adheres to schema validation rules
    });

    // If activity not found, send a 404 error
    if (!updatedActivity) {
        return res.status(404).json({
            status: 'fail',
            message: 'Activity not found.'
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Activity successfully updated.',
        data: {
            activity: updatedActivity
        }
    });
});
