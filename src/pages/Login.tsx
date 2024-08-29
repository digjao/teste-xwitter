import React, { useState } from 'react';
import { loginUser } from '../services/postServices';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
    console.log('aqui', response);
    if (response.status === 200) {
        navigate("/posts")
      }
    } catch (error:any) {
      console.error('Erro ao fa zer login:', error.response ? error.response.data : error.message);
    }
  };


  return (
    <div className="h-screen text-white bg-black">
      <header className="h-14 bg-[#B5B5B5] border-b-2 border-black flex items-center pl-4">
      </header>
      <div className="flex justify-center items-center mt-48">
        <div className="w-96 p-6  rounded-3xl drop-shadow-5xl border-gray-300 bg-gray-800">
          <h1 className="mb-10 text-3xl block text-center font-semibold">Login</h1>
          <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                className="text-black border-b-2 border-black w-full text-xl px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 mb-5 bg-[#EFEFEF]" 
                placeholder="Email ou nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input 
                type="password" 
                className="text-black border-b-2 border-black w-full text-xl px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 mb-5 bg-[#EFEFEF] " 
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            
            <div className="mt-3 flex justify-between items-center mb-5">
              <div className="flex items-center">
                <input className="h-4 w-4" type="checkbox"/>
                <label htmlFor="" className="font-semibold ml-2">Lembrar de mim</label>
              </div>
              <div>
                <a href="#" className="font-bold">Esqueceu a senha?</a>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button 
                type="submit" 
                className="border-2 bg-[#7B66FD] text-white rounded-md py-1 w-48 text-xl border-black">Entrar</button>
            </div>
          </form>
          <div className="mt-3 flex justify-center">
            <h1 className="font-bold">Não tem uma conta? </h1>
            <a href="/register" className="text-[#7B66FD] ml-2">Inscreva-se</a>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Login;
