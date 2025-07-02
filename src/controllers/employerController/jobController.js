import {jobModel} from "../../models/jobSchema.js"

export const jobPost = async(req,res)=>{
    try{
        const{title,Description,Location,Salary,Category,WorkHour,Gender} = req.body
        const newJob = new jobModel({
            employer:req.user.id,
            title,
            Description,
            Location,
            Salary,
            Category,
            WorkHour,
            Gender
        })
        await newJob.save()
        res.status(200).json({message:"job created",Job:newJob})
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}