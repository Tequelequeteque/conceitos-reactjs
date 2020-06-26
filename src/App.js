import React, {useState,useEffect} from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(()=>{
    (async function(){
      const {data} = await api.get('repositories');
      setRepositories(data);
    })()
  },[]);

  async function handleAddRepository() {
    const {data:rep} = await api.post(`repositories`,{
      title:`Repository ${Date.now()}`,
    });
    setRepositories([...repositories,rep]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(rep => rep.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(
          ({id,title}) => (
          <li key={id}> {title} 
            <button onClick={() => handleRemoveRepository(id)}>
                Remover
            </button>
          </li>)
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
