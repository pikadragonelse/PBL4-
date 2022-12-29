import React from 'react';
import { Button } from '../button';

import './form-noti.css';

export const FormNoti = ({ content, setIsOpenModal }) => {
    return (
        <div className="form-noti">
            <div className="form-noti-body">{content}&nbsp;</div>
            <div className="form-noti-footer">
                <Button
                    primary
                    onClick={() => {
                        setIsOpenModal(false);
                    }}
                    size="small"
                >
                    OK
                </Button>
            </div>
        </div>
    );
};
