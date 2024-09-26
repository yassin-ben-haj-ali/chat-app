import userServices from "../services/user.js"


export const getUsers = async (req, res) => {


    const { _id: currentUserId } = req.user;

    const users = await userServices.getUsers(currentUserId);

    res.json(users);

}