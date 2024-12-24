const express = require("express");
const doctorController = require("../controllers/doctor.Controller");
const permissionMiddleware = require("../../../middlewares/apikey.middleware");
const router = express.Router();

// Set up multer upload instance for doctor profile image uploads
// const upload = createUpload(); // Define the path for image storage

// Define the routes


// Get all doctors
router.get(
  "/all",
  permissionMiddleware("read"),
  doctorController.getAllDoctors
);

// Get a doctor by ID
router.get(
  "/:id",
  permissionMiddleware("read"),
  doctorController.getDoctorById
);

// Update a doctor's information
// router.put(
//   "/update/:id",
//   permissionMiddleware("write"),
//   upload.single("image"),
//   doctorController.updateDoctor
// );

// Delete a doctor
router.delete(
  "/delete/:id",
  permissionMiddleware("write"),
  doctorController.deleteDoctor
);

// Add a review to a doctor
router.post(
  "/review/:id",
  permissionMiddleware("write"),
  doctorController.addReview
);

// Time slot management routes

// Get available time slots for a doctor
router.get(
  "/timeslots/:id",
  permissionMiddleware("read"),
  doctorController.getTimeSlots
);

// Add a time slot for a doctor
router.post(
  "/timeslots/:id",
  permissionMiddleware("write"),
  doctorController.addTimeSlot
);

// Update time slots for a doctor
router.put(
  "/timeslots/:id",
  permissionMiddleware("write"),
  doctorController.updateTimeSlot
);

// Delete a  time slots of a day
router.delete(
  "/timeslots/:id",
  permissionMiddleware("write"),
  doctorController.deleteTimeSlot
);

// Delete a specific time slot of a specific date
router.delete(
  "/timeslots/:id",
  permissionMiddleware("write"),
  doctorController.deleteTimeSlot
);


// Search for doctors by speciality, district, or name
router.get(
  "/search",
  permissionMiddleware("read"),
  doctorController.searchDoctors
);

// Export the router
module.exports = router;
