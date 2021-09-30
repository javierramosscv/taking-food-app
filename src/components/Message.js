import "./Message.css";
const Message = (props) => (
    <div className="Message">
     
     <div >
      <p className="NOData">{props.message}</p>
    </div>
    <br/>
    <br/>
   </div>
);

export default Message;