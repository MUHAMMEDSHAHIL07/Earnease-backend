import { employerModel } from "../../models/employerSchema"
import EmployerVerification from "../../models/employerVerifiySchema"
import { userModel } from "../../models/userSchema"

export const dashboardStat = async(req,res)=>{
    try{
        const totalStudent = await userModel.countDocuments()
        const totalEmployer = await employerModel.countDocuments({isVerified: true})
        const PendingEmployer = await EmployerVerification.countDocuments({status:"pending"})

        res.status(200).json({
            totalStudent,
            totalEmployer,
            PendingEmployer
        })
    }
    catch(error){
        return res.status(500).json({message:"internal server error"})
    }
}