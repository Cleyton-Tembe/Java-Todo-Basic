import { useContext, useState } from "react";
import AxiosInstance from "../util/axios";
import "./formStyle.css";
import { FormContext } from "../Context/FormProvider";

const TodoForm = () => {

  const {handleNewTodo} = useContext(FormContext);
  const [todo, setTodo] = useState({
    titulo: "",
    descricao: "",
  });
  const {handleFormState} = useContext(FormContext)

  const [disabled, setDisabled] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!todo.descricao || !todo.titulo) return;

    try {
      setDisabled(true);
      

      const response = await AxiosInstance.post("/new", todo);
      handleNewTodo(response.data)
    } catch (error) {
      console.error("error: ", error.response);
    } finally {
      setTodo({
        titulo: "",
        descricao: "",
      });
      handleFormState()
      setDisabled(false);
    }
  }

  return (
    <div className="overlay-form">
      <form onSubmit={(e) => handleSubmit(e)} onClick={(e)=> e.stopPropagation()}>
        <h2>Criar uma Tarefa</h2>
        <label htmlFor="title" id="title" className="input-form">
          <input
            className="input-text"
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTodo({ ...todo, titulo: e.target.value })}
            value={todo.titulo}
          />
        </label>
      
        <label htmlFor="descricao" id="descricao" className="input-form">
          <textarea
            rows="4"
            className="input-text"
            type="text"
            name="descricao"
            id="descricao"
            value={todo.descricao}
            onChange={(e) => setTodo({ ...todo, descricao: e.target.value })}
          />
        </label>
      
        <div className="btn-form">
          <button type="submit" className="btn-submit" disabled={disabled}>
            Submeter
          </button>
          <button type="button" className="btn-cancelar" onClick={handleFormState}>cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
