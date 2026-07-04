import { createContext, useState } from "react";



const FormContext = createContext()


const FormProvider = ({children}) => {

    const [formState, SetFormState] = useState(false)
    const [newTodo, setNewTodo] = useState(null)
    const [totals, setTotals] = useState({
      total: 0,
      pendente: 0,
      concluido: 0,
    })

    const handleTotals = (todos) => {
      setTotals(todos)
    }

    const handleFormState = () => {
      SetFormState(!formState)
    }

    const handleNewTodo = (todo) => {
      setNewTodo(todo)
    }

  return (
    <FormContext.Provider value={{formState, handleFormState, handleTotals, totals, newTodo, handleNewTodo}}>
        {children}
    </FormContext.Provider>
  )
}

export {FormProvider, FormContext}