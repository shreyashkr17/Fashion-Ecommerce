const Job = require("../model/job.model");
const {v4:uuidv4} = require('uuid');
const Op = require('sequelize');

class JobController{
    static async postJob(req,res){
        try {
            const {jobTitle, jobLocation, jobCategory, jobDesc, jobQualification, openings, slug, postedDate, jobForm} = req.body;

            const jobId = uuidv4();

            const newJob = await Job.create({
                jobId,
                jobTitle,
                jobLocation,
                jobCategory,
                jobDesc,
                jobQualification,
                openings,
                slug,
                postedDate,
                jobForm
            });

            res.status(201).json({
                newJob
            })
        } catch (error) {
            // Handle errors
            console.error("Error posting job:", error);
            res.status(500).json({ error: "Unable to post job" });
        }
    }

    static async getJobBySlug(req,res){
        try {
            const {slug} = req.body;
            const job = await Job.findOne({
                where:{
                    slug:slug
                }
            });

            if(job){
                res.status(201).json({job})
            }else{
                res.status(404).json({error:"Job not found"})
            }
        } catch (error) {
            console.error("Error fetching job:", error);
            res.status(500).json({ error: "Unable to fetch job" });
        }
    }

    static async getCountByCategory(req,res){
        try {
            const jobs = await Job.findAll();
            function calculateTotalOpeningsByCategory(jobs, category) {
                return jobs.reduce((total, job) => {
                    const categoryExists = job.jobCategory.some(cat => cat.name.toLowerCase() === category.toLowerCase());
                    if (categoryExists) {
                        total += job.openings;
                    }
                    return total;
                }, 0);
            }

            const totalOpeningsPartTime = calculateTotalOpeningsByCategory(jobs, 'Part Time');
            const totalOpeningsFullTime = calculateTotalOpeningsByCategory(jobs, 'Full Time');
            const totalOpeningsInternship = calculateTotalOpeningsByCategory(jobs, 'Internship');

            res.status(200).json({ totalOpeningsPartTime, totalOpeningsFullTime, totalOpeningsInternship });
        } catch (error) {
            // Handle errors
            console.error("Error fetching category counts:", error);
            res.status(500).json({ error: "Unable to fetch category counts" });
        }
    }

    static async deletedJobBySlug(req,res){
        try {
            const {slug} = req.body;

            const job = await Job.findOne({
                where:{slug:slug}
            });

            if(job){
                await job.destroy();
                res.status(200).json({message:"Job deleted successfully."});
            }else{
                res.status(404).json({error:"Job Not Found"});
            }
        } catch (error) {
            console.error("Error deleting job:", error);
            res.status(500).json({ error: "Unable to delete job" });
        }
    }

    static async getAllJobs(req, res) {
        try {
            const jobs = await Job.findAll();
            res.status(200).json({jobs});
        } catch (error) {
            console.error("Error fetching jobs:", error);
            res.status(500).json({ error: "Unable to fetch jobs" });
        }
    }

    static async updateJob(req,res){
        try {
            const {jobId, jobLocation, openings, jobForm} = req.body;

            const job = await Job.findOne({
                where:{jobId:jobId}
            });

            if(!job){
                res.status(404).json({error:"Job not found"})
            }

            if(jobLocation){
                if(!jobLocation === ''){
                    job.jobLocation = jobLocation;
                }
            }
            if(!openings === 0){
                job.openings = openings;
            }
            if(jobForm){
                job.jobForm = jobForm;
            }
            // console.log(jobDesc)

            await job.save();

            // console.log(job.jobDesc)

            res.status(200).json({message:"Job updated successfully."});
        } catch (error) {
            console.error("Error updating job:", error);
            res.status(500).json({ error: "Unable to update job" });
        }
    }
}

module.exports = JobController;