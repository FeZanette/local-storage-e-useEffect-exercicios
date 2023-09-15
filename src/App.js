import { useEffect, useState } from "react";
import { DivContainer, InputsContainer, ListaDeTarefas, Tarefa } from "./style";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [valorDoInput, setValorDoInput] = useState("");
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const tarefasString = JSON.stringify(tarefas);
    if (tarefas.length > 0) localStorage.setItem("tarefas", tarefasString);
  }, [tarefas]);

  useEffect(() => {
    const pegarTarefas = JSON.parse(localStorage.getItem("tarefas"))
    if (pegarTarefas) setTarefas(pegarTarefas)   
  }, []);

  const pegarValorDoInput = (event) => {
    setValorDoInput(event.target.value);
    // console.log("aaa");
  };

  const criarTarefa = () => {
    const novaTarefa = {
      id: Date.now(),
      texto: valorDoInput,
      completa: false,
    };
    const copiaDoEstado = [...tarefas, novaTarefa];
    // EVITA ADICIONAR TAREFAS EM BRANCO NO INPUT
    if (valorDoInput.trim !== "") {
      // ATUALIZDA O ESTADO tarefas ADICIONANDO O QUE É DIGITADO
      setTarefas(copiaDoEstado);
      // APÓS ADICIONAR TAREFA, O INPUT FICA EM BRANCO
      setValorDoInput("");
    }
    // console.log("aaa");
  };

  const selecionarTarefa = (id) => {
    const tarefasAtualizadas = tarefas.map((item) => {
      if (item.id === id) {
        return { ...item, completa: !item.completa };
      } else {
        return item;
      }
    });
    setTarefas(tarefasAtualizadas);
    // console.log(tarefas);
  };

  const pegarValorDoSelect = (event) => {
    setFiltro(event.target.value);
    // console.log("aaa");
  };

  const listaFiltrada = tarefas.filter((tarefa) => {
    switch (filtro) {
      case "pendentes":
        return !tarefa.completa;
      case "completas":
        return tarefa.completa;
      default:
        return true;
    }
  });

  return (
    <DivContainer>
      <h1>Lista de tarefas</h1>
      <InputsContainer>
        <input value={valorDoInput} onChange={pegarValorDoInput} />
        <button onClick={criarTarefa}>Adicionar</button>
      </InputsContainer>
      <br />

      <InputsContainer>
        <label>Filtro</label>
        <select value={filtro} onChange={pegarValorDoSelect}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <ListaDeTarefas>
        {listaFiltrada.map((tarefa) => {
          return (
            <Tarefa
              completa={tarefa.completa}
              onClick={() => selecionarTarefa(tarefa.id)}
            >
              {tarefa.texto}
            </Tarefa>
          );
        })}
      </ListaDeTarefas>
    </DivContainer>
  );
}

export default App;
