import jobModel from "../models/jobModel.js";

// ====================CREATE JOB================

export const createJobController = async (req, res, next) => {
    const { company, position } = req.body;
    if (!company || !position) {
        next('Please provide all field')
    }
    req.body.createdBy = req.user.userId;
    const job = await jobModel.create(req.body)
    res.status(201).json({ job })
}


// ==================GET JOBS==================

export const getAllJobs = async (req, res, next) => {
    const jobs = await jobModel.find({ createdBy: req.user.userId })
    res.status(200).json({
        totalJobs: jobs.length,
        jobs
    })
}

// ======================UPDATE JOBS================
export const updateJobs = async (req, res, next) => {
    const { id } = req.params
    const { company, position } = req.body

    // validation
    if (!company || !position) {
        next('Please provide all fields')
    }

    const job = await jobModel.findOne({ _id: id })

    //validation
    if (!job) {
        next(`NO jobs found with this id ${id}`)
    }

    if (!req.user.userId === job.createdBy.toString()) {
        next('You are not authorized to update this job')
        return;
    }
    const updateJob = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    }).exec()
    res.status(200).json({ updateJob })
}

// ======================DELETE JOBS================
export const deleteJob = async (req, res, next) => {
    const { id } = req.params

    //find jobs
    const job = await jobModel.findOne({ _id: id })
    //validation
    if (!job) {
        next(`No job found with this id ${id}`)
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next('You are not authorized to delete')
    }
    await jobModel.deleteOne({ _id: id })
    // await job.remove()
    res.status(200).json({ message: "Success,job deleted" })
}