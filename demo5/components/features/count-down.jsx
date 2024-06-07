// countdown renderer for comming soon
export const rendererOne = ( { days, hours, minutes, seconds } ) => (
    <span className="count-row countdown-show4">
        <span className="countdown-section">
            <span className="countdown-amount">{ days }</span>
            <span className="countdown-period">Days</span>
        </span>
        <span className="countdown-section">
            <span className="countdown-amount">{ hours > 9 ? hours : '0' + hours }</span>
            <span className="countdown-period">Hours</span>
        </span>
        <span className="countdown-section">
            <span className="countdown-amount">{ minutes > 9 ? minutes : '0' + minutes }</span>
            <span className="countdown-period">Minutes</span>
        </span>
        <span className="countdown-section">
            <span className="countdown-amount">{ seconds > 9 ? seconds : '0' + seconds }</span>
            <span className="countdown-period">Seconds</span>
        </span>
    </span>
);

// countdown renderer type 2
export const rendererTwo = ( { days, hours, minutes, seconds } ) => (
    <span className="countdown-row countdown-amount">
        { days } days, { hours > 9 ? hours : '0' + hours } : { minutes > 9 ? minutes : '0' + minutes } : { seconds > 9 ? seconds : '0' + seconds }
    </span>
);

// countdown renderer type 3
export const rendererThree = ( { days, hours, minutes, seconds } ) => (
    <span className="countdown-row countdown-show3">
        <span className="countdown-section">
            <span className="countdown-amount">{ hours > 9 ? hours : '0' + hours }</span>
            <span className="countdown-period">hours</span>
        </span>
        <span className="countdown-section">
            <span className="countdown-amount">{ minutes > 9 ? minutes : '0' + minutes }</span>
            <span className="countdown-period">mins</span>
        </span>
        <span className="countdown-section">
            <span className="countdown-amount">{ seconds > 9 ? seconds : '0' + seconds }</span>
            <span className="countdown-period">secs</span>
        </span>
    </span>
);