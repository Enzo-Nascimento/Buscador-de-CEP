import api from './services/api'
import {useState} from 'react'
import { RiSearch2Line } from "react-icons/ri";
import './App.css'
function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  async function handleSearch(){
    if(input === ''){
      alert('Preencha algum CEP')
    }
    try{
      const response = await api.get(`${input}/json`)
      console.log(response.data)
      setCep(response.data)
      setInput('')
    }
    catch{
      alert('Erro ao buscar')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className='título'>Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder='Digite seu CEP' value={input} onChange={(e) => setInput(e.target.value)}/>

        <button className='buttonProcurar'><RiSearch2Line size={25} color="#fff" onClick={handleSearch}/></button>
      </div>

      {Object.keys(cep).length > 0 &&(
        <main className="main">
        <h2>CEP: {cep.cep}</h2>
        <p>{cep.logradouro}</p>
        <p>{cep.complemento}</p>
        <p>{cep.bairro}</p>
        <p>{cep.localidade +' - '+ cep.uf}</p>
      </main>
      )}
    </div>
  );
}

export default App;
