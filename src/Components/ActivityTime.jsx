import React, { useContext, useRef } from 'react'
import { MyContext } from '../App';

export default function ActivityTime(props) {
    const startSun = useRef();
    const startMon = useRef();
    const startTues = useRef();
    const startWed = useRef();
    const startThur = useRef();
    const startFri = useRef();
    const startSat = useRef();
    const endSun = useRef();
    const endMon = useRef();
    const endTues = useRef();
    const endWed = useRef();
    const endThur = useRef();
    const endFri = useRef();
    const endSat = useRef();

    const {setActivityTime} = useContext(MyContext);

    function setActive(){
        const days = [
            {start: startSun.current.value, end: endSun.current.value},
            {start: startMon.current.value, end: endMon.current.value},
            {start: startTues.current.value, end: endTues.current.value},
            {start: startWed.current.value, end: endWed.current.value},
            {start: startThur.current.value, end:endThur.current.value},
            {start: startFri.current.value, end: endFri.current.value},
            {start: startSat.current.value, end: endSat.current.value}
        ]
        setActivityTime(days);
        props.show(false);
    }


  return (
    <div className='row d-flex flex-column align-items-center'>
        <div className='m-2 w-75 d-flex justify-content-end' >Sunday: <input className='col-3 mx-1' type="time" ref={startSun} /><input className='col-3 mx-1' type="time" ref={endSun} /></div>
        <div className='m-2 w-75 d-flex justify-content-end' >Monday: <input className='col-3 mx-1' type="time" ref={startMon} /><input className='col-3 mx-1' type="time" ref={endMon} /></div>
        <div className='m-2 w-75 d-flex justify-content-end' >Tuesday: <input className='col-3 mx-1' type="time" ref={startTues} /><input className='col-3 mx-1' type="time" ref={endTues} /></div>
        <div className='m-2 w-75 d-flex justify-content-end' >Wednesday: <input className='col-3 mx-1' type="time" ref={startWed} /><input className='col-3 mx-1' type="time" ref={endWed} /></div>
        <div className='m-2 w-75 d-flex justify-content-end' >Thursday: <input className='col-3 mx-1' type="time" ref={startThur} /><input className='col-3 mx-1' type="time" ref={endThur} /></div>
        <div className='m-2 w-75 d-flex justify-content-end' >Friday: <input className='col-3 mx-1' type="time" ref={startFri} /><input className='col-3 mx-1' type="time" ref={endFri} /></div>
        <div className='m-2 w-75 d-flex justify-content-end' >Saturday: <input className='col-3 mx-1' type="time" ref={startSat} /><input className='col-3 mx-1' type="time" ref={endSat} /></div>
        <div className='btn btn-light w-25 mt-2 mb-2' onClick={setActive}>Set</div>
    </div>
  )
}
