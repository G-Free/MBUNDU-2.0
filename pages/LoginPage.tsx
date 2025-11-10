
import React from 'react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  return (
    <div className="min-h-screen bg-light-gray flex flex-col justify-center p-6 font-roboto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-petroleum-blue tracking-wider font-poppins">MBUNDU</h1>
        <p className="text-lg font-light text-mbundu-orange font-poppins">2.0</p>
        <p className="text-dark-gray mt-2">Os seus serviços domésticos, num só lugar.</p>
      </div>
      
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-petroleum-blue text-center mb-6">Bem-vindo de volta!</h2>
        
        <form onSubmit={(e) => { e.preventDefault(); onLoginSuccess(); }}>
          <div className="mb-4">
            <label className="block text-dark-gray text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-dark-gray leading-tight focus:outline-none focus:ring-2 focus:ring-mbundu-orange" id="email" type="email" placeholder="seu.email@exemplo.com" />
          </div>
          <div className="mb-6">
            <label className="block text-dark-gray text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <input className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-dark-gray mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-mbundu-orange" id="password" type="password" placeholder="******************" />
            <a className="inline-block align-baseline font-bold text-sm text-petroleum-blue hover:text-mbundu-orange" href="#">
              Esqueceu a senha?
            </a>
          </div>
          
          <button className="w-full bg-mbundu-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300" type="submit">
            Entrar
          </button>
        </form>

        <div className="my-6 flex items-center">
          <hr className="w-full border-gray-300" />
          <span className="px-4 text-dark-gray font-semibold">OU</span>
          <hr className="w-full border-gray-300" />
        </div>
        
        <button onClick={onLoginSuccess} className="w-full bg-white border border-medium-gray hover:bg-light-gray text-dark-gray font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.82l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>
          Entrar com Google
        </button>

        <p className="text-center text-dark-gray text-sm mt-8">
          Não tem uma conta? <a href="#" className="font-bold text-petroleum-blue hover:text-mbundu-orange">Registre-se</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
