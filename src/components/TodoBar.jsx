import "./todoStyles/todobarStyle.css"

const TodoBar = ({task, toggleCompleted, deleted, openEdit}) => {



  return (
    <li className="container-list" key={task.id + 1}>
      <input
        type="checkbox"
        name="todo"
        id={`todo-${task.id}`}
        className="check"
        checked={task.completed || false}
        onChange={() => {
          console.log(task.id);
          toggleCompleted(task.id);
        }}
      />
      <div className="container-check">
        <label htmlFor={`todo-${task.id}`} className="custom-check">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000"
          >
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
          </svg>
        </label>
      </div>
      <label htmlFor={`todo-${task.id}`} id="text-todo">
        <div className="box-text">
          <h3>{task.titulo}</h3>
          <p>{task.descricao}</p>
        </div>
      </label>
      <div className="btn-container">
        <button type="button" id="btn-delete" onClick={() => deleted(task.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#4A4D57"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>

        <button type="button" id="btn-edit" onClick={()=> openEdit(task)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#4A4D57"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default TodoBar