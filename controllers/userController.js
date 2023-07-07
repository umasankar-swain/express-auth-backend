import userModel from "../models/userModel.js"

export const updateUserController = async (req, res, next) => {
    const { name, email, location } = req.body
    if (!name || !email || !location) {
        next('Please provide all fields')
    }
    const user = await userModel.findOne({ _id: req.user.userId })
    user.name = name
    user.email = email
    user.location = location

    await user.save();
    const token = user.createJWT()
    res.status(200).json({
        user,
        token
    })
}