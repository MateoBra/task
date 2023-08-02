import React, { useEffect, useState } from "react";
import "./Tasks.css";
import Form from "./Form";

function Tasks() {
  const [Tasks, setTasks] = useState({
    A: [{ Task: "A", Comment: "A", Time: "A" }],
    B: [{ Task: "B", Comment: "B", Time: "B" }],
  });
  const [formType, setFormType] = useState();

  const [isOpen, setIsOpen] = useState(false);

  const [clickedTask, setClickedTask] = useState();

  document.addEventListener("click", (e) => {
    if (e.target.className === "App") {
      setIsOpen(false);
    }
  });

  return (
    <div className="container">
      <div>
        {isOpen ? null : (
          <div>
            <ul>
              {Object.keys(Tasks).map((task) => (
                <li key={task}>
                  <button
                    id={task}
                    onClick={(e) => {
                      setClickedTask({ [task]: Tasks[e.target.id] });
                      setFormType("details");
                      setIsOpen(true);
                    }}
                    className="taskButtons"
                  >
                    {task}
                  </button>
                  <button
                    id={task}
                    onClick={(e) => {
                      console.log(e.target.id);
                      setClickedTask({ [task]: Tasks[e.target.id] });
                      setFormType("edit");
                      setIsOpen(true);
                    }}
                    className="editButton"
                  >
                    Uredi
                  </button>
                  <button
                    id={task}
                    onClick={(e) => {
                      setTasks(() => {
                        const {
                          [e.target.id]: {},
                          ...updatedTasks
                        } = Tasks;
                        return updatedTasks;
                      });
                      /*
                      setFormType("delete");
                      setIsOpen(true);*/
                    }}
                    className="deleteButton"
                  >
                    Izbriši
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                setClickedTask();
                setFormType("newTask");
                setIsOpen(true);
              }}
              className="newTask"
            >
              Novi zadatak
            </button>
          </div>
        )}
      </div>
      {isOpen ? (
        <div className="popup">
          <Form
            formType={formType}
            clickedTask={clickedTask}
            setIsOpen={(data) => setIsOpen(data)}
            taskName={Tasks}
            setTasks={(tasks) => {
              Object.assign(Tasks, tasks);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Tasks;
