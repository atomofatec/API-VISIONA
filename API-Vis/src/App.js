import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cadastro } from './Pages/Cadastro';
import { Login } from './Pages/Login';
import Perfil from './Pages/Perfil';
import { Edicao } from './Pages/Edicao';
import { Esquecer } from './Pages/Esquecer';
import { TabelaUsers } from './Pages/TabelaUsers';
import { Adicionar } from './Pages/Adicionar';
import { Dashboard } from './Pages/Dashboard';

function App() {
  return (  
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/esquecer' element={<Esquecer />} />
        <Route path='/tabela-users' element={<TabelaUsers />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='/edicao' element={<Edicao />} />
        <Route path='/adicionar' element={<Adicionar />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
