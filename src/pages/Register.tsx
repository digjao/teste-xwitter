import React, { useState } from 'react';
import { registerUser } from '../services/postServices';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser({ username, email, password });

        } catch (error) {
            console.error('Erro ao registrar', error);
        }
    };


    return (
        <div className='h-screen text-white bg-black'>
            <header className="h-14 bg-[#B5B5B5] border-b-2 flex items-center pl-4"></header>
            <div className="flex justify-center items-center mt-48">
                <div className="w-96 p-6  rounded-3xl drop-shadow-5xl border-gray-300 bg-gray-800">
                    <h1 className="mb-10 text-3xl block text-center font-semibold">Crie sua conta</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className=" border-b-2 border-black w-full text-xl px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 mb-5 bg-[#EFEFEF]" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    
                        <input
                            type="text"
                            className="text-black border-b-2 border-black w-full text-xl px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 mb-5 bg-[#EFEFEF]" 
                            placeholder="Nome do usuário"
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
                        
                        <div className="flex justify-center mt-5">
                            <button type="submit" className="border-2 bg-[#7B66FD] text-white rounded-md py-1 w-48 text-xl border-black">Criar conta</button>
                        </div>
                    </form>
                    <div className="mt-3 flex justify-center">
                        <h1 className="font-bold">Ja tem uma conta? </h1>
                        <a href="/login" className="text-[#7B66FD] ml-2">Entrar</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
