import messageServices from "../services/message.js";



export const sendMessage = async (req, res) => {

    const { _id: senderId } = req.user;
    const { userId: receiverId } = req.params;
    const { message } = req.body;

    const newMessage = await messageServices.sendMessage({ senderId, receiverId, message });
    res.json(newMessage)
}


export const getMessages = async (req, res) => {

    const { userId: userToChatId } = req.params;
    const { _id: senderId } = req.user

    const messages = await messageServices.getMessages({ senderId, userToChatId });
    res.json(messages);

}