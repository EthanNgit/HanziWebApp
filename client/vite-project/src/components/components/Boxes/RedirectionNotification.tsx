import React from 'react';
import '../../styles/Boxes/RedirectionNotification.css';
import {
    EN_UC_CONTINUE_HEADER,
    EN_UC_STOP_HEADER,
} from '../../../global/Ts/Strings';

interface RedirectionNotificationProps {
    header?: string;
    description?: string;
    oneOption?: boolean;
    selectedOption: (newOption: boolean | null) => void;
    clickedOutside?: (event?: React.MouseEvent) => void;
}

function RedirectionNotification({
    header,
    description,
    oneOption,
    selectedOption,
    clickedOutside,
}: RedirectionNotificationProps) {
    return (
        <div
            className="black-out-wrapper"
            onClick={() => clickedOutside && clickedOutside()}>
            <div
                className="redirection-notification-wrapper"
                onClick={(e) => e.stopPropagation()}>
                <h1>{header}</h1>
                <hr className="notification-bar" />
                <p>{description}</p>
                {oneOption ? (
                    <button
                        className="button-18"
                        role="button"
                        onClick={() => {
                            selectedOption(false);
                        }}>
                        {EN_UC_STOP_HEADER}
                    </button>
                ) : (
                    <>
                        <button
                            className="button-18"
                            role="button"
                            onClick={() => {
                                selectedOption(false);
                            }}>
                            {EN_UC_STOP_HEADER}
                        </button>
                        <button
                            className="button-18"
                            role="button"
                            onClick={() => {
                                selectedOption(true);
                            }}>
                            {EN_UC_CONTINUE_HEADER}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default RedirectionNotification;
