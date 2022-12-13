import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

import './message.css';

const messageContentSubClassMap = {
    1: 'message-content-special-img',
    3: 'message-content-special-vid',
    2: 'message-content-special-audio',
};

export const Message = ({ children, type, image, typeMessage }) => {
    const [isPlayAudio, setIsPlayAudio] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const audioRef = useRef(null);
    const timelineRef = useRef(null);

    const getTimeCodeFromNum = (num) => {
        let seconds = parseInt(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;
      
        if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(
          seconds % 60
        ).padStart(2, 0)}`;
      }

    let durationTime = audioRef.current != null ? getTimeCodeFromNum(audioRef.current.duration) : 0;

    const changeTimelinePosition = () => {
        if (audioRef.current != null && timelineRef.current != null) {
            setCurrentTime(getTimeCodeFromNum(Math.floor((audioRef.current.currentTime))));
            const percentagePosition = (100 * audioRef.current.currentTime) / audioRef.current.duration;
            timelineRef.current.style.backgroundSize = `${percentagePosition}% 100%`;
            timelineRef.current.value = percentagePosition;
        }
    };

    const changeSeek = () => {
        if (audioRef.current != null && timelineRef.current != null) {
            const time = (timelineRef.current.value * audioRef.current.duration) / 100;
            audioRef.current.currentTime = time;
        }
    };

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
                    <>
                        <FontAwesomeIcon
                            onClick={() => {
                                audioRef.current.pause();
                                setIsPlayAudio((prev) => !prev);
                            }}
                            icon={faPause}
                            className={`message-content-audio-icon ${
                                isPlayAudio === true ? 'message-content-audio-show-icon' : ''
                            }`}
                        />
                        <FontAwesomeIcon
                            onClick={() => {
                                audioRef.current.play();
                                setIsPlayAudio((prev) => !prev);
                            }}
                            icon={faPlay}
                            className={`message-content-audio-icon ${
                                isPlayAudio === false ? 'message-content-audio-show-icon' : ''
                            }`}
                        />
                        <input
                            ref={timelineRef}
                            onChange={changeSeek}
                            type="range"
                            max="100"
                            min="0"
                            class="message-content-audio-timeline"
                        />
                        <span className="message-content-audio-timeline-duration">{`${currentTime}`}</span>
                        <span>/</span>
                        <span className="message-content-audio-timeline-duration">{`${durationTime}`}</span>

                        <audio
                            onTimeUpdate={changeTimelinePosition}
                            ref={audioRef}
                            src={`data:audio/mp3;base64,${children}`}
                            controls
                            onEnded={() => setIsPlayAudio(false)}
                            className="message-content-audio"
                        />
                    </>
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
