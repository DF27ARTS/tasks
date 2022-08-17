import React, { Fragment, useState, useRef } from "react";
import "./App.css";

type FormElement = React.FormEvent<HTMLFormElement>;
type InputElement = React.ChangeEvent<HTMLInputElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [Tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);
  function HandleChange(e: InputElement): void {
    e.preventDefault();
    setNewTask(e.target.value);
  }

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    AddTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const AddTask = (name: string): void => {
    const newTasks: ITask[] = [...Tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...Tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...Tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  return (
    <Fragment>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <input
                    className="form-control"
                    type="text"
                    value={newTask}
                    autoFocus
                    ref={taskInput}
                    onChange={(e) => HandleChange(e)}
                  />
                  <button className="btn btn-success btn-block mt-2 w-100">
                    Save
                  </button>
                </form>
              </div>
            </div>
            {Tasks.length
              ? Tasks.map((t: ITask, i: number) => (
                  <div key={i} className="card card-body mt-2">
                    <h2
                      style={{ textDecoration: !t.done ? "line-through" : "" }}
                    >
                      {t.name}
                    </h2>
                    <div>
                      <button
                        onClick={() => toggleDoneTask(i)}
                        className="btn btn-secondary"
                      >
                        {t.done ? "✓" : "✗"}
                      </button>
                      <button
                        onClick={() => removeTask(i)}
                        className="btn btn-danger"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
