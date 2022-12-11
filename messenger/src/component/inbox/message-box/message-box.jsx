import { faFaceSmile, faImage, faPaperclip, faPaperPlane, faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import React from 'react';

import './message-box.css';
import { useState } from 'react';

export const MessageBox = forwardRef(({ handleSendMessage, idUser }, inputRefParent) => {
    const inputRef = useRef(null);
    const fileRef = useRef(null);
    const imgRef = useRef(null);
    const isStart = useRef(true);
    const [isShowImageInput, setIsShowImageInput] = useState(false);

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

    const handlePasteImage = (e) => {
        if (fileRef.current != null) {
            fileRef.current.files = e.clipboardData.files;
            const [file] = fileRef.current.files;
            if (file != null && imgRef.current != null) {
                setIsShowImageInput(true);
                imgRef.current.src = URL.createObjectURL(file);
            }
        }
    };

    const handleInputFile = () => {
        if (fileRef.current != null) {
            const [file] = fileRef.current.files;
            if (file != null && imgRef.current != null) {
                setIsShowImageInput(true);
                imgRef.current.src = URL.createObjectURL(file);
            }
        }
    }

    useEffect(() => {        


        window.addEventListener('paste', (e) => {handlePasteImage(e)});

        return () => {
            window.removeEventListener('paste', (e) => handlePasteImage(e));
        };

    }, []);



    return (
        <div className="message-box">
            <div className="message-box-method">
                <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faPlusCircle} />
                <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faPaperclip} />
                <label className="message-box-icon message-box-method-icon" htmlFor='message-box-file-input'>
                    <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faImage} />
                </label>
            </div>
            <div className="message-box-main">
                <input onChange={handleInputFile} ref={fileRef} name="input" id="message-box-file-input" className="message-box-file-input" type="file" />
                <div className={`message-box-input-container ${isShowImageInput === true ? 'show-image-input-container' : ''}`}>
                    <div className={`message-box-image-container ${isShowImageInput === true ? 'show-image-input' : ''}`}>
                        <img ref={imgRef} className="message-box-image-input" src="#" alt="your image" />
                        <FontAwesomeIcon onClick={() => setIsShowImageInput(false)} icon={faTimes} className="message-box-input-image-icon" />
                    </div>
                    <input ref={inputRef} placeholder="Type message" type="text" className="message-box-input" />
                </div>
                <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faFaceSmile} />
            </div>
            <div onClick={sendMessage} className="message-box-send">
                <FontAwesomeIcon className="message-box-icon message-box-send-icon" icon={faPaperPlane} />
            </div>
        </div>
    );
});
