import {
    faFaceSmile,
    faImage,
    faMicrophone,
    faPaperclip,
    faPaperPlane,
    faPlusCircle,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import React from 'react';
import { useState } from 'react';

import './message-box.css';

export const MessageBox = forwardRef(({ handleSendMessage }, inputRefParent) => {
    const inputRef = useRef(null);
    const fileRef = useRef(null);
    const imgRef = useRef(null);
    const [isShowImageInput, setIsShowImageInput] = useState(false);

    const specialTypeMessageMap = {
        image: 1,
        audio: 2,
        video: 3,
    };

    const checkTypeMessage = () => {
        try {
            const file = fileRef.current.files[0];
            if (file != null) {
                return specialTypeMessageMap[file.type.split('/')[0]];
            } else {
                return 0;
            }
        } catch (e) {}
    };

    const sendTextMessage = () => {
        let messageText = {
            message: inputRef.current.value,
            type: 0,
        };
        handleSendMessage(messageText);
    };

    const sendSpecialMessage = (file) => {
        let reader = new FileReader();
        try {
            if (
                file.type &&
                !file.type.startsWith('image/') &&
                !file.type.startsWith('audio/') &&
                !file.type.startsWith('video/')
            ) {
                return;
            }
            reader.onload = (e) => {
                const data = {
                    message: e.target.result,
                    type: checkTypeMessage(),
                };
                setIsShowImageInput(false);
                handleSendMessage(data);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectMethodSendMessage = () => {
        if (checkTypeMessage() === 0) { sendTextMessage(); }
        else { sendSpecialMessage(fileRef.current.files[0])}
    }

    useImperativeHandle(
        inputRefParent,
        () => {
            return {
                reset() {
                    inputRef.current.value = '';
                },
                sendMessage() {
                    handleSelectMethodSendMessage();
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
    };

    useEffect(() => {
        window.addEventListener('paste', (e) => {
            handlePasteImage(e);
        });

        return () => {
            window.removeEventListener('paste', (e) => handlePasteImage(e));
        };
    }, []);

    return (
        <div className="message-box">
            <div className="message-box-method">
                <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faPlusCircle} />
                <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faMicrophone} />
                <label className="message-box-icon message-box-method-icon" htmlFor="message-box-file-input">
                    <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faPaperclip} />
                </label>
            </div>
            <div className="message-box-main">
                <input
                    onChange={() => {
                        handleInputFile();
                    }}
                    ref={fileRef}
                    name="input"
                    id="message-box-file-input"
                    className="message-box-file-input"
                    type="file"
                />
                <div
                    className={`message-box-input-container ${
                        isShowImageInput === true ? 'show-image-input-container' : ''
                    }`}
                >
                    <div
                        className={`message-box-image-container ${isShowImageInput === true ? 'show-image-input' : ''}`}
                    >
                        <img ref={imgRef} className="message-box-image-input" src="#" alt="your image" />
                        <FontAwesomeIcon
                            onClick={() => setIsShowImageInput(false)}
                            icon={faTimes}
                            className="message-box-input-image-icon"
                        />
                    </div>
                    <input ref={inputRef} placeholder="Type message" type="text" className="message-box-input" />
                </div>
                <FontAwesomeIcon className="message-box-icon message-box-method-icon" icon={faFaceSmile} />
            </div>
            <div onClick={() => handleSelectMethodSendMessage()} className="message-box-send">
                <FontAwesomeIcon className="message-box-icon message-box-send-icon" icon={faPaperPlane} />
            </div>
        </div>
    );
});
