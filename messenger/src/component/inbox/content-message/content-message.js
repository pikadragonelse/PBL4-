import { forwardRef, useImperativeHandle, useRef } from 'react';
import React from 'react';

import './content-message.css';
import { Message } from './message';
import { Loading } from '../../loading';

export const ContentMessage = forwardRef(({ idUser, listMessage, isLoading }, contentMessageRefParents) => {
    const contentMessageRef = useRef(null);

    useImperativeHandle(contentMessageRefParents, () => {
        return {
            setScroll() {
                contentMessageRef.current.scrollTop =
                    contentMessageRef.current.scrollHeight - contentMessageRef.current.clientHeight;
            },
        };
    });

    return (
        <div
            ref={contentMessageRef}
            className={`content-message ${isLoading === true ? 'content-message-loading' : ''} `}
        >
            {isLoading === true ? (
                <Loading className="loading-content-message" />
            ) : (
                listMessage.map((item) => (
                    <Message
                        key={item.idMessage}
                        type={item.idSender === idUser ? 'user-message' : ''}
                        image={process.env.PUBLIC_URL + '/avatar.jpg'}
                        typeMessage={item.type}
                    >
                        {item.message}
                    </Message>
                ))
            )}
        </div>
    );
});
