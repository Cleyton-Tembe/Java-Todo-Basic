import { useContext } from "react";
import "./todoStyles/statsStyle.css"
import { FormContext } from "../Context/FormProvider";

const TodoTotals = () => {

  const {handleFormState, totals} = useContext(FormContext)

  return (
    <div className="container-stats">
        <div className="container-create">
            <h1>Minhas Tarefas</h1>
            <button type="button" onClick={handleFormState} >Novo Todo</button>
        </div>
        <div className="box-stats">
          <div className="container-total">
            <div className="box">
              <div className="total">{totals.total || "0"}</div>
              <div className="stat">Total</div>
            </div>
            <div className="box">
              <div className="pendentes">{totals.pendente || "0"}</div>
              <div className="stat">Pedente</div>
            </div>
            <div className="box">
              <div className="concluidos">{totals.concluido || "0"}</div>
              <div className="stat">Concluido</div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default TodoTotals