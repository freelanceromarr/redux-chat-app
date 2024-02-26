import { useEffect, useState } from "react";
import isValidEmail from "../../utils/validateEmail";
import { useGetUserQuery } from "../../features/api/users/usersApi";
import Error from "../ui/Error";
import { useDispatch, useSelector } from "react-redux";
import conversationApi, { useAddConversationMutation, useEditConversationMutation } from '../../features/api/conversations/conversationsApi'

const MessageModal = ({ close, openModal }) => {
  const [sendTo, setSendTo] = useState('')
  const [message, setMessage] = useState('')
  const [userCheck, setUserCheck] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [getConversation, setGetConversation] = useState(undefined)
  const dispatch = useDispatch()

  const { data: participantUser, isLoading, isError } = useGetUserQuery(sendTo, {
    skip: !userCheck
  });
  const { user } = useSelector(state => state.auth)
  const debounceHandler = (fn, delay) => {
    let timeOutId;
    return (e) => {

      clearTimeout(timeOutId)
      timeOutId = setTimeout(() => {
        fn(e.target.value)
      }, delay)
    }
  }
  const doSearch = (value) => {
    if (isValidEmail(value)) {
      setSendTo(value)
      setUserCheck(true)

    }
  }

  const handleSearch = debounceHandler(doSearch, 1000);
  const submitHandler = (e) => {
    e.preventDefault();
    if (getConversation?.length > 0) {
      //edit conversation
      editConversation(
        {
          id: getConversation[0].id,
          data: {
            participants: `${user?.email}-${participantUser[0].email}`,
            users: [user, participantUser[0]],
            message,
            timestamp: new Date().getTime()
          }, 
          sender: user
        }
        )
       
    } else if (getConversation?.length === 0) {
      //add new conversation
      addConversation({
        sender: user, 
        data: {
        participants: `${user?.email}-${participantUser[0].email}`,
        users: [user, participantUser[0]],
        message,
        timestamp: new Date().getTime()
      }})
      
    }
    console.log('submitted');
  }
  const [addConversation, { isSuccess: isAddedConversation }] = useAddConversationMutation()
  const [editConversation, { isSuccess: isEdidtedConversation }] = useEditConversationMutation();
  useEffect(() => {
    if(isAddedConversation || isEdidtedConversation){
      close();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isAddedConversation, isEdidtedConversation])
  useEffect(() => {
    if (participantUser?.length > 0 && participantUser[0].email !== user?.email) {
      //check conversation existance of user
      dispatch(conversationApi.endpoints.getConversation.initiate({
        userEmail: user?.email, participantEmail: sendTo
      })).unwrap().then((response) => {
        setGetConversation(response)
      })

    } else if (participantUser?.length > 0 && participantUser[0].email !== user?.email) {

    }

  }, [participantUser, sendTo, user.email, dispatch])
  return (

    <div id="demo-modal" class={` ${openModal ? " modal" : "modal_display"}`}>
      <div class="modal__content">

        <div className="message_form">
          <form onSubmit={submitHandler} >


            <label for="email">Email</label>
            <input onChange={handleSearch} type="email" id="email" name="email" placeholder="Your email..." required />

            <label for="message">Message</label>
            <input onChange={e => setMessage(e.target.value)} value={message} type="text" id="message" name="message" placeholder="Your message..." required />



            <input type="submit" value="Send" disabled={participantUser?.length > 0 && participantUser[0].email === user?.email || getConversation === undefined} />
          </form>
          <Error message={errorMessage} />
          <div onClick={() => { setErrorMessage(''); setSendTo(''); close() }} className="modal_Cancel" >Cancel</div>
        </div>

      </div>
    </div>
  );
};

export default MessageModal;
