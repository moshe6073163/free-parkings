import React, { useContext, useRef } from 'react'
import { MyContext } from '../App';
import Allert from './Allert';

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

  const { setActivityTime, activityTime, setIsShowAlert } = useContext(MyContext);

  function setActive() {
    const days = [
      { start: startSun.current.value, end: endSun.current.value },
      { start: startMon.current.value, end: endMon.current.value },
      { start: startTues.current.value, end: endTues.current.value },
      { start: startWed.current.value, end: endWed.current.value },
      { start: startThur.current.value, end: endThur.current.value },
      { start: startFri.current.value, end: endFri.current.value },
      { start: startSat.current.value, end: endSat.current.value }
    ]
    for (let i = 0; i < 7; i++) {
      if (days[i].start !== "" && days[i].end !== "" && Date.parse("01/04/2023 " + days[i].start) < Date.parse("01/04/2023 " + days[i].end)) {
        continue;
      } else if (days[i].start === "" && days[i].end === "") {
        continue;
      } else {
        setIsShowAlert({ set: true, component: <Allert set={true} detail={"Invalid Time."} /> })
        return null;
      }
    }
    setActivityTime(days);
    if(props.show){
      props.show(false);
    }
  }

  var nameDays = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thur",
    "Fri",
    "Sat"
  ]



  return (
    <>
      {!props.parking ?
        <div className='row d-flex flex-column align-items-center border rounded shadow-lg' style={{backgroundColor: "rgba(5, 202, 237, 0.90)"}}>
          <div className='m-2 w-sm-75 d-flex justify-content-end' >Sunday: <input className='col-4 mx-1' defaultValue={activityTime[0] ? activityTime[0].start : ""} type="time" ref={startSun} /><input className='col-4 mx-1' type="time" defaultValue={activityTime[0] ? activityTime[0].end : ""} ref={endSun} /></div>
          <div className='m-2 w-sm-75 d-flex justify-content-end' >Monday: <input className='col-4 mx-1' type="time" defaultValue={activityTime[1] ? activityTime[1].start : ""} ref={startMon} /><input className='col-4 mx-1' type="time" defaultValue={activityTime[1] ? activityTime[1].end : ""} ref={endMon} /></div>
          <div className='m-2 w-sm-75 d-flex justify-content-end' >Tuesday: <input className='col-4 mx-1' type="time" defaultValue={activityTime[2] ? activityTime[2].start : ""} ref={startTues} /><input className='col-4 mx-1' type="time" defaultValue={activityTime[2] ? activityTime[2].end : ""} ref={endTues} /></div>
          <div className='m-2 w-sm-75 d-flex justify-content-end' >Wednesday: <input className='col-4 mx-1' type="time" defaultValue={activityTime[3] ? activityTime[3].start : ""} ref={startWed} /><input className='col-4 mx-1' type="time" defaultValue={activityTime[3] ? activityTime[3].end : ""} ref={endWed} /></div>
          <div className='m-2 w-sm-75 d-flex justify-content-end' >Thursday: <input className='col-4 mx-1' type="time" defaultValue={activityTime[4] ? activityTime[4].start : ""} ref={startThur} /><input className='col-4 mx-1' type="time" defaultValue={activityTime[4] ? activityTime[4].end : ""} ref={endThur} /></div>
          <div className='m-2 w-sm-75 d-flex justify-content-end' >Friday: <input className='col-4 mx-1' type="time" defaultValue={activityTime[5] ? activityTime[5].start : ""} ref={startFri} /><input className='col-4 mx-1' type="time" defaultValue={activityTime[5] ? activityTime[5].end : ""} ref={endFri} /></div>
          <div className='m-2 w-sm-75 d-flex justify-content-end' >Saturday: <input className='col-4 mx-1' type="time" defaultValue={activityTime[6] ? activityTime[6].start : ""} ref={startSat} /><input className='col-4 mx-1' type="time" defaultValue={activityTime[6] ? activityTime[6].end : ""} ref={endSat} /></div>
          <div className='btn btn-light w-25 mt-2 mb-2' onClick={setActive}>Set</div>
        </div> 
        :
        <div className='row d-flex justify-content-center' >
          <div>
            <table className='border text-light rounded' style={{backgroundColor: "rgba(2, 192, 147, 0.90)"}}>
              <tr className='border'>
                <th className='border'>Day</th>
                <th className='border'>Start</th>
                <th className='border'>End</th>
              </tr>
              {props.activityTime.map((e, i) => (e.start !== "" ? 
                <tr className='border'>
                  <th className='border'>{nameDays[i]}</th>
                  <th className='border'>{e.start}</th>
                  <th className='border'>{e.end}</th>
                </tr>
                :
                ""
              ))}
            </table>
          </div>
        </div>
      }
    </>
  )
}
