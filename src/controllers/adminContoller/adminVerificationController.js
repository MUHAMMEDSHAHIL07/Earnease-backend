import EmployerVerification from "../../models/employerVerifiySchema"


export const getPendingVerification = async(req,res)=>{
    const pending = EmployerVerification.find({status:"pending"}).populate("employer")
    return res.status(200).json({message:"data sent",pending})
}

// export const approveEmployer = async()