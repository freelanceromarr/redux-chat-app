import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../features/api/messages/messagesApi";
import Messages from "../Messages";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

const ChatBody = () => {
  const { id } = useParams();
  const { data: messages, isLoading, isError, error } = useGetMessagesQuery(id);

  //decide what to render
  let content = null;

  if (isLoading) {
    content = <div className="m-2 text-center">loading ...</div>;
  } else if (!isLoading && isError) {
    content = <div className="m-2 text-center">{error.data}</div>;
  } else if (!isLoading && !isError && messages?.length > 0) {
    content = (
      <>
        <ChatHeader message = {messages[0]} />
        <Messages messages = {messages} />
       
        <ChatFooter conversationId={id} messages = {messages} />
      </>
    );
  }
  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">
        {content}
      </div>
    </div>
  );
};

export default ChatBody;
