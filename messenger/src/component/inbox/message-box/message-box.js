import { faFaceSmile, faImage, faPaperclip, faPaperPlane, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import './message-box.css';

export const MessageBox = forwardRef(({ handleSendMessage, idUser }, inputRefParent) => {
    const inputRef = useRef(null);

    const sendMessage = () => {
        let message = {
            idSender: idUser,
            message: inputRef.current.value,
            text: true,
        };
        handleSendMessage(message);
    };

    useImperativeHandle(
        inputRefParent,
        () => {
            return {
                reset() {
                    inputRef.current.value = '';
                },
            };
        },
        [],
    );

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
});
