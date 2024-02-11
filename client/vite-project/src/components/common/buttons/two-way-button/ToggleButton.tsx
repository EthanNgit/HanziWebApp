import { useState } from 'react';
import './toggle-button.css';

interface ToggleButtonProps {
    buttonNames: { buttonOne: string; buttonTwo: string };
    onToggle: (toggledState: boolean) => void;
}

function ToggleButton({ buttonNames, onToggle }: ToggleButtonProps) {
    const [isToggled, setToggled] = useState(true);

    const handleToggle = () => {
        const newToggledState = !isToggled;

        setToggled(newToggledState);
        onToggle(newToggledState);
    };

    return (
        <div className="toggle-button-container">
            <button onClick={handleToggle} className={`toggle-button ${isToggled ? 'selected' : ''}`}>
                {buttonNames?.buttonOne ? buttonNames.buttonOne : 'Option one'}
            </button>
            <button onClick={handleToggle} className={`toggle-button ${isToggled ? '' : 'selected'}`}>
                {buttonNames?.buttonTwo ? buttonNames.buttonTwo : 'Option two'}
            </button>
        </div>
    );
}

export default ToggleButton;
