import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
    chatId: String,
    senderId: mongoose.Schema.Types.ObjectId,
    text: String
},
{
    timestamps: true
}
)

const Message = mongoose.model('Message', messageSchema);
export default Message;