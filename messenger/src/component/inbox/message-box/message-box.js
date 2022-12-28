import { faFaceSmile, faMicrophone, faPaperclip, faPaperPlane, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import React from 'react';
import { useState } from 'react';

import './message-box.css';
import { useRecorder } from '../../../hooks/useRecorder';
import { MessageBoxInput } from './message-box-input';

export const MessageBox = ({ handleSendMessage, isDoneSend }) => {
    const fileRef = useRef(null);
    const [isShowImageInput, setIsShowImageInput] = useState(false);
    const [isOpenRecordInput, setIsOpenRecordInput] = useState(false);
    const [isSendMessage, setIsSendMessage] = useState(false);
    const [isSendRecord, setIsSendRecord] = useState(false);

    const [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

    const sendRecordMessage = (value) => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';

        xhr.open('GET', value);
        xhr.send();

        xhr.onload = () => {
            let bobContent = xhr.response;
            let reader = new FileReader();
            reader.readAsDataURL(bobContent);
            reader.onload = () => {
                let messageText = {
                    message: reader.result,
                    type: 2,
                };
                handleSendMessage(messageText);
            };
        };
    };

    useEffect(() => {
        if (isSendRecord === true) {
            sendRecordMessage(audioURL);
            setIsSendRecord(false);
        }
    }, [audioURL]);

    return (
        <div className="message-box">
            <div className="message-box-method">
                <FontAwesomeIcon
                    onClick={() => {
                        if (isOpenRecordInput === true) {
                            stopRecording();
                            setIsOpenRecordInput(false);
                        }
                    }}
                    className={`message-box-icon message-box-method-icon plus-icon ${
                        isOpenRecordInput === true ? 'record-start' : ''
                    }`}
                    icon={faPlusCircle}
                />
                <FontAwesomeIcon
                    onClick={() => {
                        startRecording();
                        setIsOpenRecordInput(true);
                    }}
                    className={`message-box-icon message-box-method-icon ${
                        isOpenRecordInput === true ? 'record-start' : ''
                    }`}
                    icon={faMicrophone}
                />
                <label className={`label`} htmlFor="message-box-file-input">
                    <FontAwesomeIcon
                        className={`message-box-icon message-box-method-icon ${
                            isOpenRecordInput === true ? 'record-start' : ''
                        }`}
                        icon={faPaperclip}
                    />
                </label>
            </div>

            <MessageBoxInput
                isDoneSend={isDoneSend}
                isOpenRecordInput={isOpenRecordInput}
                setIsShowImageInput={setIsShowImageInput}
                isShowImageInput={isShowImageInput}
                handleSendMessage={handleSendMessage}
                isSendMessage={isSendMessage}
                setIsSendMessage={setIsSendMessage}
                fileRef={fileRef}
            />
            <FontAwesomeIcon
                className={`message-box-icon message-box-method-icon ${
                    isOpenRecordInput === true ? 'record-start' : ''
                }`}
                icon={faFaceSmile}
            />
            <div
                onClick={() => {
                    if (isOpenRecordInput === true) {
                        stopRecording();
                        setIsSendRecord(true);
                        setIsOpenRecordInput(false);
                    } else {
                        setIsSendMessage(true);
                    }
                }}
                className="message-box-send"
            >
                <FontAwesomeIcon className="message-box-icon message-box-send-icon" icon={faPaperPlane} />
            </div>
        </div>
    );
};
