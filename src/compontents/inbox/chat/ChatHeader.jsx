import { useSelector } from "react-redux";

const ChatHeader = ({message}) => {
    const {user} = useSelector(state=>state.auth);
    const {sender, receiver} = message|| {}
    const partnerName = sender?.email === user?.email ? receiver?.name : sender?.name; 
  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <img
        className="object-cover w-10 h-10 rounded-full"
        src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
        alt="username"
      />
      <span className="block ml-2 font-bold text-gray-600">{partnerName}</span>
      <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
    </div>
  );
};

export default ChatHeader;
