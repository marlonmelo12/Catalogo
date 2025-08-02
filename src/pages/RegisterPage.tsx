import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authService';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';

const RegisterPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    try {
      await register({ nome, email, senha: password });
      navigate('/login');
    } catch (err) {
      setError('Falha ao registrar. O email pode já estar em uso.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text-main p-4">
       <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">Criar Conta</h1>
            <p className="text-text-secondary">Junte-se à sua coleção!</p>
        </div>
        <div className="p-8 bg-surface rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-text-secondary" />
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required className="w-full pl-10 pr-3 py-2 bg-background border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-text-secondary" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full pl-10 pr-3 py-2 bg-background border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div className="relative">
                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-text-secondary" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required className="w-full pl-10 pr-3 py-2 bg-background border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            
            {error && <p className="text-secondary text-center">{error}</p>}
            
            <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <FaUserPlus />
                <span>Registrar</span>
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
            <p className="text-text-secondary">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-primary hover:underline font-semibold">
                    Faça login
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;