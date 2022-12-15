import React, { useEffect, useRef } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TimelineAudio } from '../../../timeline-audio/timeline-audio';

import './message-box-input.css';

const specialTypeMessageMap = {
    image: 1,
    audio: 2,
    video: 3,
};

export const MessageBoxInput = ({
    isOpenRecordInput,
    setIsShowImageInput,
    isShowImageInput,
    handleSendMessage,
    isSendMessage,
    setIsSendMessage,
    fileRef,
}) => {
    const inputRef = useRef(null);
    const imgRef = useRef(null);

    const sendTextMessage = () => {
        let messageText = {
            message: inputRef.current.value,
            type: 0,
        };
        handleSendMessage(messageText);
    };

    useEffect(() => {
        if (isSendMessage === true) {
            handleSelectMethodSendMessage();
            setIsSendMessage(false);
        }
    }, [isSendMessage]);

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
        if (checkTypeMessage() === 0) {
            sendTextMessage();
        } else {
            sendSpecialMessage(fileRef.current.files[0]);
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

    useEffect(() => {
        window.addEventListener('paste', (e) => {
            handlePasteImage(e);
        });

        return () => {
            window.removeEventListener('paste', (e) => handlePasteImage(e));
        };
    }, []);

    return (
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
            {isOpenRecordInput === true ? (
                <TimelineAudio isOpenRecordInput={isOpenRecordInput} inputRecord />
            ) : (
                <div
                    className={`message-box-input-container ${
                        isShowImageInput === true ? 'show-image-input-container' : ''
                    }`}
                >
                    <div
                        className={`message-box-image-container ${isShowImageInput === true ? 'show-image-input' : ''}`}
                    >
                        <img ref={imgRef} className="message-box-image-input" src="#" alt="your" />
                        <FontAwesomeIcon
                            onClick={() => setIsShowImageInput(false)}
                            icon={faTimes}
                            className="message-box-input-image-icon"
                        />
                    </div>

                    <input
                        onKeyDown={(event) => {
                            if (event.keyCode === 13) {
                                handleSelectMethodSendMessage();
                                inputRef.current.value = '';
                            }
                        }}
                        ref={inputRef}
                        placeholder="Type message"
                        type="text"
                        className="message-box-input"
                    />
                </div>
            )}
        </div>
    );
};
