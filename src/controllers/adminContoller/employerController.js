import { employerModel } from "../../models/employerSchema.js"

export const getEmployer = async(req,res)=>{
    try{
        const employer = await employerModel.find().select("-password")
            res.status(200).json({employer})
    }
    catch(error){
        return res.status(500).json({message:"internal server error"})
    }
}

export const BlockUnblockEmployer = async (req, res) => {
  try {
    const userId = req.params.id;
    const { isBlocked } = req.body;

    const user = await employerModel.findByIdAndUpdate(
      userId,
      { isBlocked },
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: isBlocked ? "Employer blocked successfully" : "Employer unblocked successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update status" });
  }
};