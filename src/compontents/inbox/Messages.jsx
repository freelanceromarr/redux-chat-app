import { useSelector } from "react-redux";
import Message from "./Message";

const Messages = ({messages= []}) => {
    const {email} = useSelector(state=>state.auth)
  return (
    
    <div className="relative w-full p-6 overflow-y-auto">
      <ul className="space-y-2">
        {
        messages.slice().sort((a, b)=>b.timestamp-a.timestamp).map((msg) =>{
            const {message,sender} = msg || {};
            const justify = sender.email !== email ? 'start' : 'end';
            return <Message justify={justify} message={message}/>
        })
        }
        

      </ul>
    </div>
  );
};

export default Messages;
