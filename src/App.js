import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cadastro } from './Pages/Cadastro';
import { Login } from './Pages/Login';
import Perfil from './Pages/Perfil';
import { Edicao } from './Pages/Edicao';
import { TabelaUsers } from './Pages/TabelaUsers';

function App() {
  return (  
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/tabela-users' element={<TabelaUsers />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='/edicao' element={<Edicao />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
