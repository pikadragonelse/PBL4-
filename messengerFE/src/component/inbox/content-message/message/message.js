import React from 'react';

import './message.css';

const Message = ({ children, type, image }) => {
    return (
        <div className={`message ${type}`}>
            <div className="message-img-wrapper ">
                <img className="message-avt" src={image} alt="avt-message" />
            </div>
            <div className="message-content">
                <p className="message-content-text">{children}</p>
            </div>
        </div>
    );
};

export { Message };
