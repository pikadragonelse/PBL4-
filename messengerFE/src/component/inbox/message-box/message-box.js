import {
    faFaceSmile,
    faImage,
    faPaperclip,
    faPaperPlane,
    faPlusCircle,
    faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './message-box.css';

const MessageBox = () => {
    return (
        <div className="message-box">
            <div className="message-box-method">
                <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faPlusCircle} />
                <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faPaperclip} />
                <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faImage} />
            </div>
            <div className="message-box-main">
                <input placeholder="Type message" type="text" className="message-box-input" />
                <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faFaceSmile} />
            </div>
            <div className="message-box-send">
                <FontAwesomeIcon className="message-box-icon message-box-send-icon" icon={faPaperPlane} />
            </div>
        </div>
    );
};

export { MessageBox };
