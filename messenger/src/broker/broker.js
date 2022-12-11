import React from 'react';

export const createBroker = () => {
    const channelMap = {
        default: {
            subscribeMap: {},
        },
    };

    return {
        sendToBroker: (channelName, payload) => {
            const targetChannel = channelMap[channelName].subscribeMap;
            Object.values(targetChannel).forEach((callback) => {
                callback(payload);
            });
        },

        useSubscribe: (channelName) => {
            const [newestMessage, setNewestMessage] = React.useState(0);
            const [messageCount, setMessageCount] = React.useState(0);
            const subscribeId = React.useRef(`${Math.random()}`);

            const unSubscribe = () => {
                delete channelMap[channelName].subscribeMap[subscribeId];
            };

            React.useEffect(() => {
                channelMap[channelName].subscribeMap[subscribeId] = (payload) => {
                    setMessageCount((cur) => cur + 1);
                    setNewestMessage(payload);
                };
            }, []);

            return {
                newestMessage,
                messageCount,
                unSubscribe,
            };
        },
    };
};
