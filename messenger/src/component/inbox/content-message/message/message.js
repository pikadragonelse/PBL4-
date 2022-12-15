import React from 'react';
import { TimelineAudio } from '../../../timeline-audio/timeline-audio';

import './message.css';

const messageContentSubClassMap = {
    1: 'message-content-special-img',
    3: 'message-content-special-vid',
    2: 'message-content-special-audio',
};

export const Message = ({ children, type, image, typeMessage }) => {
    return (
        <div className={`message ${type}`}>
            <div className="message-img-wrapper ">
                <img className="message-avt" src={image} alt="avt-message" />
            </div>
            <div className={`message-content ${messageContentSubClassMap[typeMessage]}`}>
                {typeMessage === 0 ? (
                    <p className="message-content-text">{children}</p>
                ) : typeMessage === 1 ? (
                    <img src={children} alt="message" className="message-content-img" />
                ) : typeMessage === 2 ? (
                    <TimelineAudio content={children} />
                ) : typeMessage === 3 ? (
                    <video className="message-content-vid" controls>
                        <source src={children} alt="message" type="video/mp4"></source>
                        <source src={`data:video/mp4;base64,${children}`} type="video/ogg"></source>
                    </video>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};
