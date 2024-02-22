const MessageModal = ({close, openModal}) => {
  return (
    <div id="demo-modal" class={` ${openModal ? " modal" : "modal_display"}`}>
      <div class="modal__content">

        <div className="message_form">
          <form  action="">


            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your email..." />

            <label for="message">Message</label>
            <input type="text" id="message" name="message" placeholder="Your message..." />



            <input type="submit" value="Send" />
          </form>
          <div onClick={()=>close()} className="modal_Cancel" >Cancel</div>
        </div>

      </div>
    </div>
  );
};

export default MessageModal;
