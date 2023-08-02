import React, { useEffect, useState } from "react";
import "./Form.css";

function Form(props) {
  const [TaskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

  var today = new Date(),
    date = today.getHours() + ":" + today.getMinutes();

  function handleTaskName(e) {
    setTaskName(e.target.value);
  }

  function handleTaskChange(e) {
    let temp = [...tasks];
    temp[e.target.id] = {
      Task: e.target.value,
      Comment: temp[e.target.id].Comment,
      Time: date,
    };
    setTasks(temp);
  }

  function handleCommentChange(e) {
    let temp = [...tasks];
    temp[e.target.id] = {
      Task: temp[e.target.id].Task,
      Comment: e.target.value,
      Time: temp[e.target.id].Time,
    };
    setTasks(temp);
  }

  function handlaTaskButton(e) {
    setTasks((tasks) => [...tasks, { Task: e, Comment: "", Time: date }]);
  }
  useEffect(() => {
    if (props.clickedTask != null) {
      let clickedName = Object.keys(props.clickedTask)[0];
      setTaskName(Object.keys(props.clickedTask)[0]);
      let clickedArray = props.clickedTask[clickedName];
      setTasks(clickedArray);
    }
  }, []);

  return (
    <div>
      {(() => {
        switch (props.formType) {
          case "newTask":
            return (
              <div>
                <div className="header">
                  <div>
                    <input
                      value={TaskName}
                      onChange={handleTaskName}
                      className="name"
                      placeholder="Unesite naziv zadatka"
                    ></input>
                  </div>
                </div>

                {tasks.map((task, index) => (
                  <div key={index} className="taskContainer">
                    <div className="time">{task.Time}h </div>
                    <div className="task">
                      <input
                        onChange={handleTaskChange}
                        id={index}
                        value={task.Task}
                        placeholder="Task"
                      ></input>
                    </div>
                    <div className="coment">
                      <input
                        id={index}
                        onChange={handleCommentChange}
                        placeholder="Coment"
                      ></input>
                    </div>
                  </div>
                ))}

                <div>
                  <ul className="choice">
                    <li onClick={() => handlaTaskButton("A")}>A</li>
                    <li onClick={() => handlaTaskButton("AB")}>AB</li>
                    <li onClick={() => handlaTaskButton("AC")}>AC</li>
                    <li onClick={() => handlaTaskButton("AD")}>AD</li>
                    <li onClick={() => handlaTaskButton("AE")}>AE</li>
                  </ul>
                </div>
                <div className="completeButton">
                  <button
                    onClick={() => {
                      if (TaskName !== "") {
                        if (!props.taskName.hasOwnProperty(TaskName)) {
                          props.setTasks({ [TaskName]: tasks });
                          props.setIsOpen(false);
                          setTasks([]);
                        } else {
                          alert("Naziv već postoji");
                        }
                      } else {
                        alert("Nema imena");
                      }
                    }}
                  >
                    Gotovo
                  </button>
                </div>
              </div>
            );
          case "details":
            return (
              <div>
                <div className="header">
                  <div>
                    <input
                      value={TaskName}
                      className="name"
                      placeholder="Unesite naziv zadatka"
                    ></input>
                  </div>
                </div>

                {tasks.map((task, index) => (
                  <div key={index} className="taskContainer">
                    <div className="time">{task.Time}h </div>
                    <div className="task">
                      <input
                        onChange={handleTaskChange}
                        id={index}
                        value={task.Task}
                        placeholder="Task"
                      ></input>
                    </div>
                    <div className="coment">
                      <input
                        id={index}
                        value={task.Comment}
                        onChange={handleCommentChange}
                        placeholder="Coment"
                      ></input>
                    </div>
                  </div>
                ))}

                <div className="completeButton">
                  <button
                    onClick={() => {
                      if (TaskName !== "") {
                        props.setTasks({ [TaskName]: tasks });
                        props.setIsOpen(false);
                        setTasks([]);
                      } else {
                        alert("No name");
                      }
                    }}
                  >
                    Nazad
                  </button>
                </div>
              </div>
            );
          case "edit":
            return (
              <div>
                <div className="header">
                  <div>
                    <input
                      value={TaskName}
                      className="name"
                      placeholder="Unesite naziv zadatka"
                    ></input>
                  </div>
                </div>

                {tasks.map((task, index) => (
                  <div key={index} className="taskContainer">
                    <div className="time">{task.Time}h </div>
                    <div className="task">
                      <input
                        onChange={handleTaskChange}
                        id={index}
                        value={task.Task}
                        placeholder="Task"
                      ></input>
                    </div>
                    <div className="coment">
                      <input
                        id={index}
                        value={tasks.Comment}
                        onChange={handleCommentChange}
                        placeholder="Coment"
                      ></input>
                    </div>
                  </div>
                ))}

                <div>
                  <ul className="choice">
                    <li onClick={() => handlaTaskButton("A")}>A</li>
                    <li onClick={() => handlaTaskButton("AB")}>AB</li>
                    <li onClick={() => handlaTaskButton("AC")}>AC</li>
                    <li onClick={() => handlaTaskButton("AD")}>AD</li>
                    <li onClick={() => handlaTaskButton("AE")}>AE</li>
                  </ul>
                </div>
                <div className="completeButton">
                  <button
                    onClick={() => {
                      if (TaskName !== "") {
                        props.setTasks({ [TaskName]: tasks });
                        props.setIsOpen(false);
                        setTasks([]);
                      } else {
                        alert("No name");
                      }
                    }}
                  >
                    Gotovo
                  </button>
                </div>
              </div>
            );
        }
      })()}
    </div>
  );
}
export default Form;
