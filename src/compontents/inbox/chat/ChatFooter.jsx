import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useEditConversationMutation } from "../../../features/api/conversations/conversationsApi";
import { useParams } from "react-router-dom";

const ChatFooter = ({conversationInfo}) => {
  const [message, setMessage] = useState('')
  const {user} = useSelector(state=>state.auth)
  const [editConversation, { isLoading, isError, isSuccess }] = useEditConversationMutation();
  
  const{id}=useParams();
  const participantUser = conversationInfo?.receiver?.email !== user?.email ? conversationInfo?.receiver : conversationInfo?.sender
  const sendMessageHandler = (e) => {
    e.preventDefault();
    //add message
    editConversation({
      id: id,
      data: {
        participants: `${user?.email}-${participantUser?.email}`,
        users: [user, participantUser],
        message,
        timestamp: new Date().getTime()
      }, 
      sender: user,
    })
    
  }
useEffect(() =>{
  if (isSuccess) {
    setMessage('')
  }
  
} ,[isSuccess, conversationInfo])
  return (
    <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <form className="flex w-full" onSubmit={e=>sendMessageHandler(e)}>
        <input
          onChange={e => setMessage(e.target.value)}
          value={message}
          type="text"
          placeholder="Message"
          className="block w-full py-2 pl-4 mx-3 bg-gray-100 focus:ring focus:ring-violet-500 rounded-full outline-none focus:text-gray-700"
          name="message"
          required
        />
        <button type="submit">
          <svg
            className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
