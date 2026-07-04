import "./todoStyles/todolistStyle.css";
import "./todoStyles/updateFormStyle.css";

import TodoBar from "./TodoBar";
import { useContext, useEffect, useState } from "react";
import AxiosInstance from "../util/axios";
import { FormContext } from "../Context/FormProvider";

const TodoList = () => {
  const [todo, setTodo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [formData, setFormData] = useState({ titulo: "", descricao: "" });
  const { handleTotals, newTodo, handleNewTodo } = useContext(FormContext);

  async function getAllTodos() {
    try {
      const response = await AxiosInstance.get("/api/todo");
      setTodo(response.data);
    } catch (error) {
      console.error("GetallTodos: ", error.response);
    }
  }

  async function toggleCompleted(id) {
    setTodo(
      todo.map((td, idx) =>
        td.id === id ? { ...td, completed: !td.completed } : td,
      ),
    );

    try {
      const updateTodo = todo.find((t) => t.id === id);
      await AxiosInstance.patch(`/update/${id}`, {
        completed: !updateTodo.completed,
      });
    } catch (error) {
      console.error("toggleCompleted ", error.response);
      setTodo((prev) =>
        prev.map((td, idx) =>
          idx === id ? { ...td, completed: !td.completed } : td,
        ),
      );
    }
  }

  useEffect(() => {
    console.log("updated todo: ", todo);

    handleTotals({
      total: todo ? todo.length : 0,
      pendente: todo ? todo.filter((t) => t.completed === false).length : 0,
      concluido: todo ? todo.filter((t) => t.completed === true).length : 0,
    });
  }, [todo]);

  useEffect(() => {
    if (!newTodo) return;

    setTodo((prev) => [...prev, newTodo]);
    handleNewTodo(null);
  }, [newTodo]);

  async function deleteTodo(id) {
    console.log(id);
    const deleted = todo.find((t) => t.id === id);
    console.log(deleted);
    setTodo(todo.filter((t) => t.id !== id));

    try {
      const response = await AxiosInstance.delete(`/delete/${id}`);
      console.log(response);
    } catch (error) {
      console.error("Delete Todo: ", error.response);
      setTodo((prev) => [...prev, deleted]);
    }
  }

  useEffect(() => {
    getAllTodos();
  }, []);

  const openEditModal = (todo) => {
    setCurrentTodo(todo);
    setFormData({
      titulo: todo.titulo,
      descricao: todo.descricao,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTodo(null);
    setFormData({ titulo: "", descricao: "" });
  };

  const handleSaveEdit = async () => {
    if (!currentTodo) return;

    try {
      await AxiosInstance.patch(`/update/${currentTodo.id}`, formData);

      setTodo(
        todo.map((t) => (t.id === currentTodo.id ? { ...t, ...formData } : t)),
      );
      closeModal();
    } catch (error) {
      setTodo(
        todo.map((t) => (t.id === currentTodo.id ? { ...t, currentTodo } : t)),
      );
      console.error("Erro ao salvar:", error);
      alert("Erro ao atualizar tarefa.");
    }
  };
  return (
    <div className="wrapper-todo">
      <ul className="container-todo">
        {todo && todo.length > 0 ? (
          todo.map((task) => (
            <TodoBar
              key={task.id}
              task={task}
              toggleCompleted={toggleCompleted}
              deleted={deleteTodo}
              openEdit={openEditModal}
            />
          ))
        ) : (
          <p className="no-todos">No todos</p>
        )}
      </ul>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Editar Tarefa</h2>

            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                rows="4"
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
              />
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={closeModal}>
                Cancelar
              </button>
              <button className="btn-save" onClick={handleSaveEdit}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
