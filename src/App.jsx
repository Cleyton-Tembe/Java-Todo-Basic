import "./global.css";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoTotals from "./components/TodoTotals";
import TodoForm from "./form/TodoForm"
import { FormContext } from "./Context/FormProvider";
import { useContext } from "react";

function App() {

  const {formState} = useContext(FormContext);

  return (
  
      <main>
        <h1>Todo App</h1>
        <TodoTotals />
        <TodoList />

      {formState && <TodoForm />}

      </main>
  );
}

export default App;
