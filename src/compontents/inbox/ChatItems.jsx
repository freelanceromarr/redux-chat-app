import { useSelector } from "react-redux";
import { useGetConversationsQuery } from "../../features/api/conversations/conversationsApi";
import ChatItem from "./ChatItem";
import lastTime from "../../utils/readableTime";

const ChatItems = () => {
  const { user } = useSelector((state) => state.auth);
  const { email } = user || {};
  const {
    data: conversations,
    isLoading,
    isError,
    error,
  } = useGetConversationsQuery(email);
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <li className="m-2 text-center">loading ...</li>;
  } else if (!isLoading && isError) {
    content = <li className="m-2 text-center">{error.data}</li>;
  } else if (!isLoading && !isError && conversations.length > 0) {
    content = conversations.map((conversation) => {
      const {id, message, timestamp} = conversation
      return (
        <li key={id}>
          <ChatItem
            avatar="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
            name="Omar Faruk"
            lastMessage={message}
            lastTime= {lastTime(timestamp)}
          />
        </li>
      );
    });
  }
  return (
    <div>
      <ul className="overflow-auto">{content}</ul>
    </div>
  );
};

export default ChatItems;
