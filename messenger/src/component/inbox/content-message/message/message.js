import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import './message.css';

const messageContentSubClassMap = {
    1: 'message-content-special-img',
    3: 'message-content-special-vid',
    2: 'message-content-special-audio',
};

export const Message = ({ children, type, image, typeMessage }) => {
    const [isPlayAudio, setIsPlayAudio] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [durationTime, setDurationTime] = useState('0:00');
    const [isStartAudio, setIsStartAudio] = useState(true);

    const audioRef = useRef(null);
    const timelineRef = useRef(null);

    const getTimeCodeFromNum = (num) => {
        if (audioRef.current.duration < 1) {
            return '0:01';
        }
        if (isNaN(audioRef.current.duration)) {
            return '0:00';
        }
        let seconds = parseInt(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;
        if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    };

    useEffect(() => {
        if (audioRef.current != null) {
            setDurationTime(getTimeCodeFromNum(audioRef.current.duration));
        }
    }, [audioRef.current, isPlayAudio]);

    const changeTimelinePosition = () => {
        if (audioRef.current != null && timelineRef.current != null) {
            setCurrentTime(getTimeCodeFromNum(Math.floor(audioRef.current.currentTime)));
            const percentagePosition = (100 * audioRef.current.currentTime) / audioRef.current.duration;
            timelineRef.current.style.backgroundSize = `${percentagePosition}% 100%`;
            timelineRef.current.value = percentagePosition;
        }
    };

    const changeSeek = () => {
        try {
            if (audioRef.current != null && timelineRef.current != null) {
                const time = (timelineRef.current.value * audioRef.current.duration) / 100;
                audioRef.current.currentTime = time;
            }
        } catch (e) {}
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
                                if (isStartAudio === true) setCurrentTime('0:00');
                                setIsStartAudio(false);
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
                            className="message-content-audio-timeline"
                        />
                        <span className="message-content-audio-timeline-duration">{`${currentTime}`}</span>
                        <span>/</span>
                        <span className="message-content-audio-timeline-duration">{`${durationTime}`}</span>

                        <audio
                            onTimeUpdate={changeTimelinePosition}
                            ref={audioRef}
                            src={`${children}`}
                            onEnded={() => {
                                setIsStartAudio(true);
                                setIsPlayAudio(false);
                            }}
                            className="message-content-audio"
                        >
                            <source src={children} alt="message" type="audio/mpeg"></source>
                            <source src={children} type="audio/ogg"></source>
                        </audio>
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
