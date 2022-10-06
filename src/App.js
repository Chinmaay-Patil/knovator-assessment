import React from "react";
import './App.css'
import { useState, useEffect } from 'react';

const App = () => {

  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [task, setTask] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);


  let Hour = calculateTime(3600000);
  let min = calculateTime(60000);
  let sec = calculateTime(1000);
  let milisec = calculateTime(10);

  function calculateTime(mili) {
    return ("0" + Math.floor((time / mili) % 60)).slice(-2)
  }


  function Modal({ setOpenModal }) {

    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');

    function handleSubmitTask() {
      let tempobj = {
        title: Title,
        description: Description,
        hour: Hour,
        min: min,
        sec: sec

      }
      setTask([...task, tempobj]);
      setTimerOn(true);
      setModalOpen(false);

    }
    return (

      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <input placeholder="Enter Title Here..." className="InputField" onChange={e => setTitle(e.target.value)} />


          </div>
          <div className="body">
            <input placeholder="Write Description Here..." className="InputField" onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={handleSubmitTask}>Save</button>
          </div>
        </div>
      </div>
    );
  }


  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);



  return (
    <div className="App">

      {modalOpen && <Modal setOpenModal={setModalOpen} />}
      <div className="box">
        <div >
          <table>
            <thead>
              <tr class="table-headers">
                <th>Hour</th>
                <th>Minutes</th>
                <th>Seconds</th>
                <th>Mili-Seconds</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Hour}</td>
                <td>{min}</td>
                <td>{sec}</td>
                <td>{milisec}</td>
              </tr>
            </tbody>
          </table>


        </div>

        <div >

          {!timerOn && time === 0 && (
            <button className="button" onClick={() => { setTimerOn(true); setModalOpen(false); }}>Start</button>
          )}
          {
            timerOn && <><button className="button" onClick={() => { setTimerOn(false); setModalOpen(false); }}>Pause</button>
              <button className="button" onClick={() => { setTimerOn(false); setModalOpen(true); }} >Save</button></>
          }

          {!timerOn && time > 0 && <>
            <button className="button" onClick={() => { setTime(0); setModalOpen(false); }}>Reset</button>
            <button className="button" onClick={() => { setTimerOn(false); setModalOpen(true); }} >Save</button></>
          }
          {!timerOn && time > 0 && (
            <button className="button" onClick={() => { setTimerOn(true); setModalOpen(false); }}>Resume</button>
          )}

        </div>

        <table >
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Time(HH:MM:SS)</td>
          </tr>


          {task.map((ele) =>
            <tr>
              <td>{ele.title}</td>
              <td>{ele.description}</td>
              <td> {ele.hour}:
                {ele.min}:
                {ele.sec}
              </td>
            </tr>
          )
          }
        </table>
      </div>
    </div>

  );
};

export default App;