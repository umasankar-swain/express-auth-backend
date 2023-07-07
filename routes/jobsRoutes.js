import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJobController, deleteJob, getAllJobs, updateJobs } from "../controllers/jobController.js";

const router = express.Router()
//routes
//CREATE JOBS || POST
router.post('/create-job', userAuth, createJobController);

//GET JOBS || GET
router.get('/get-job', userAuth, getAllJobs)

//UPDATE JOBS || PUT
router.put('/update-job/:id', userAuth, updateJobs)

//DELETE JOBS || DELETE
router.delete('/delete-job/:id', userAuth, deleteJob)

export default router;