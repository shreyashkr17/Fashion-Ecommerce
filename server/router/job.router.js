const express = require('express');
const router = express.Router();
const JobController = require('../controller/job.controller')
const verifyAuth = require("../middleware/verifyAuth");

router.post('/job-post', JobController.postJob);
router.post('/single-job-detail', JobController.getJobBySlug);

router.post('/update-job', JobController.updateJob);

// router.post('/filter-job', verifyAuth.authenticateJWt, JobController.getFilterJob)


//get methods
router.get('/get-all-job', JobController.getAllJobs); 
router.get('/get-count-category',JobController.getCountByCategory);

// delete methods
router.delete('/delete-job-by-slug', JobController.deletedJobBySlug);

module.exports = router