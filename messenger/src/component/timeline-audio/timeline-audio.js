import React from 'react';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import './timeline-audio.css';

export const TimelineAudio = ({ content, inputRecord, isOpenRecordInput = false }) => {
    const [isPlayAudio, setIsPlayAudio] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [durationTime, setDurationTime] = useState('0:00');
    const [isStartAudio, setIsStartAudio] = useState(true);
    const [counter, setCounter] = useState(0);
    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');

    const audioRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        let intervalId;
        if (isOpenRecordInput === true) {
            setIsPlayAudio(true);
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);

                let computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
                let computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

                setSecond(computedSecond);
                setMinute(computedMinute);
                setCurrentTime(`${minute}:${second}`);

                timelineRef.current.style.backgroundSize = `${counter}% 100%`;

                setCounter((counter) => counter + 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isOpenRecordInput, counter]);

    const getTimeCodeFromNum = (num) => {
        if (audioRef.current.duration < 1) {
            return '0:01';
        }

        let seconds = parseInt(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;
        if (isNaN(audioRef.current.duration) || isNaN(hours)) {
            return '0:00';
        }
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
        <div className={`timeline-audio-container ${inputRecord === true ? 'input-record' : ''}`}>
            <FontAwesomeIcon
                onClick={() => {
                    if (inputRecord !== true) {
                        audioRef.current.pause();
                    }
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
                    if (inputRecord !== true) {
                        audioRef.current.play();
                    }
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
            <span className="timeline-slice">/</span>
            <span className="message-content-audio-timeline-duration timeline-duration">{`${durationTime}`}</span>

            <audio
                onTimeUpdate={changeTimelinePosition}
                ref={audioRef}
                src={`${content}`}
                onEnded={() => {
                    setIsStartAudio(true);
                    setIsPlayAudio(false);
                }}
                className="message-content-audio"
            >
                <source src={content} alt="message" type="audio/mpeg"></source>
                <source src={content} type="audio/ogg"></source>
            </audio>
        </div>
    );
};
