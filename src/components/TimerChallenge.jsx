import { useRef, useState } from "react";
import ResultModal from "./ResultModal";
import { createPortal } from "react-dom";

export default function TimerChallenge({title, targetTime}) {
    const [timeRemaining,setTimeRemaining] = useState(targetTime * 1000); 
    // reason for this is targeted time is in sec and we want millsecs
    const timer = useRef();
    const dialog = useRef();

    const timerIsActive = timeRemaining > 0 && timeRemaining < (targetTime * 1000);

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining((prevTimeRemaining) => prevTimeRemaining -10)
        }, 10);
    }

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleStop() { 
        dialog.current.open();
        clearInterval(timer.current);
    }

    function handleReset() {
        setTimeRemaining(targetTime*1000);
    }

    return createPortal(
        <>
                <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
                <section className="challenge">
                    <h2>{title}</h2>
                    <p className="challenge-time">
                        {targetTime} second{targetTime > 1 ? 's':''}
                    </p>
                    <p>
                        <button onClick={timerIsActive ? handleStop:handleStart}>
                            {!timerIsActive ?  'Start' :'End'} Challenge
                        </button>
                    </p>
                    <p className={timerIsActive ? 'active':undefined}>
                        {timerIsActive ? 'Time is running...':'Timer inactive'}
                    </p>
                </section>
            </>

    , document.getElementsByTagName('body'));
}