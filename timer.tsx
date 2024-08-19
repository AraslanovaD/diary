import React, { useEffect, useState, useRef } from 'react';

const Timer = () => {
    const [time, setTime] = useState(0);
    const [isPaused, setIsPaused] = useState(true);

    const timeRef = useRef<number | null>(null)

    const formatTime = () => {
        const secondsStr = `0${time % 60}`.slice(-2)

        const minutes = Math.floor(time / 60)
        const minutesStr = `0${minutes % 60}`.slice(-2)

        const hours = Math.floor(time / (60 * 60))
        const hoursStr = `0${hours % 24}`.slice(-2)

        const days = Math.floor(time / (24 * 60 * 60))
        const daysStr = `0${days}`.slice(-2)

        return `${daysStr} : ${hoursStr} : ${minutesStr} : ${secondsStr}`
    }

    const handleStart = () => {
        setIsPaused(false);
        timeRef.current = setInterval(() => setTime((time) => time + 1), 1000);
    }

    const handlePause = () => {
        setIsPaused(true);
        clearInterval(timeRef.current);
    }

    const handleResume = () => {
        handleStart();
    }

    const handleRestart = () => {
        setTime(0);
        setIsPaused(true);
        clearInterval(timeRef.current);
    }

    return (
        <div>
            {formatTime()}
            <div>
                <button onClick={handleStart}>Start</button>
                {!isPaused && <button onClick={handlePause}>Pause</button>}
                {isPaused && <button onClick={handleResume}>Resume</button>}
                <button onClick={handleRestart}>Restart</button>
            </div>

        </div>
    );

    /*
    return (
        { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset, formatTime }
    );

    */
}

export default Timer;
