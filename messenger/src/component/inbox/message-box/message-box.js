import {
    faFaceSmile,
    faImage,
    faPaperclip,
    faPaperPlane,
    faPlusCircle,
    faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';

import './message-box.css';

const MessageBox = ({ handleSendMessage }) => {
    const inputRef = useRef(null);
    const sendMessage = () => {
        let message = {
            idSender: 1,
            message: inputRef.current.value,
            text: true,
        };
        handleSendMessage(message);
    };

    return (
        <div className="message-box">
            <div className="message-box-method">
                <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faPlusCircle} />
                <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faPaperclip} />
                <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faImage} />
            </div>
            <div className="message-box-main">
                <input ref={inputRef} placeholder="Type message" type="text" className="message-box-input" />
                <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faFaceSmile} />
            </div>
            <div onClick={sendMessage} className="message-box-send">
                <FontAwesomeIcon className="message-box-icon message-box-send-icon" icon={faPaperPlane} />
            </div>
        </div>
    );
};

export { MessageBox };
