import React, { useState, useEffect} from 'react';

import '../style/stopwatch.scss'

const StopWatch = () => {
    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [hours, setHours] = useState('00');
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);
    const [num, setNum] = useState(1);
    const [mili, setMili] = useState(null)


    useEffect(() => {
        let intervalId;
        if (isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor((counter / 60) % 60);
                const hoursCounter = Math.floor(Math.floor(counter / 60) / 60);
                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
                const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;
                const computedHours = String(hoursCounter).length === 1 ? `0${hoursCounter}`: hoursCounter;

                setSecond(computedSecond);
                setMinute(computedMinute);
                setHours(computedHours);

                setCounter(counter => counter + 1);
            }, 1000)
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter])
    const reset = () =>{
        setCounter(0)
        setHours('00');
        setSecond('00');
        setMinute('00')
    }

    const wait = () =>{
        if(num === 1){
            const date = new Date();
            setMili(date)
            setNum(2);
        }else {
            const date2 = new Date();
            (mili - date2) <= -300 ? setIsActive(true) :  setIsActive(false)
            setMili(0)
            setNum(1)
        }
    }

    return (
        <div className="container">
            <div className="time">
                <span className="hours">{hours}</span>
                <span>:</span>
                <span className="minute">{minute}</span>
                <span>:</span>
                <span className="second">{second}</span>
            </div>
            <div className="buttons">
                <button onClick={() => setIsActive(!isActive)} className="start stopWatch-button">
                    {isActive ? "PAUSE": "START"}
                </button>
                <button onClick={() => reset()} className="RESET stopWatch-button">Reset</button>
                <button onClick={() => wait()} className='stopWatch-button'>Wait</button>
            </div>
        </div>
    )
}

export default StopWatch;
