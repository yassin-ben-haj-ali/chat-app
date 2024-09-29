import Conversation from "../models/conversation.js"
import Message from "../models/message.js"
import { getReceiverSocketId, io } from "../socket/socket.js"

const sendMessage = async ({ senderId, receiverId, message }) => {

    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    })

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message
    })


    if (newMessage) {
        conversation.messages.push(newMessage._id)
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    //TODO: SOCKET IO FUNCTIONALITY WILL GO HERE

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);

    }

    return newMessage;
}


const getMessages = async ({ senderId, userToChatId }) => {

    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] }
    }).populate("messages");

    if (!conversation) return [];

    const messages = conversation.messages;

    return messages

}

const messageServices = { sendMessage, getMessages };

export default messageServices;