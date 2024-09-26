import Conversation from "../models/conversation.js"
import Message from "../models/message.js"

const sendMessage = async ({ senderId, receiverId, message }) => {

    let conversation = Conversation.findOne({
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

    //TODO: SOCKET IO FUNCTIONALITY WILL GO HERE

    await Promise.all([conversation.save(), newMessage.save()]);

    return newMessage;
}


const getMessages = async ({senderId, userToChatId}) => {

    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] }
    }).populate("messages");

    if (!conversation) return [];

    const messages = conversation.messages;

    return { messages }

}

const messageServices = { sendMessage, getMessages };

export default messageServices;