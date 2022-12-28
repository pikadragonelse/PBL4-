import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { createPortal } from 'react-dom';

import './drawer.css';
export const Drawer = ({ children, isOpen, setIsOpen }) => {
    return createPortal(
        <div className={`drawer ${isOpen === true ? 'drawer-open' : ''}`}>
            <div className="drawer-overlay"></div>
            <div className="drawer-body">
                <FontAwesomeIcon
                    onClick={() => setIsOpen(false)}
                    icon={faArrowRight}
                    className="drawer-icon"
                ></FontAwesomeIcon>
                {children}
            </div>
        </div>,
        document.querySelector('body'),
    );
};
