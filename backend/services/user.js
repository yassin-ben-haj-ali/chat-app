import User from "../models/user.js"

const getUsers = async (currentUserId) => {

    const users = await User.find({ _id: { $ne: currentUserId } }).select("-password");

    return users;
}


const userServices = { getUsers };

export default userServices

