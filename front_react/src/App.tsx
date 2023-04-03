import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./pages/Login";
import Cadastro from './pages/Cadastro';
import TabelaUsers from './pages/TabelaUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/tabela-users' element={<TabelaUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
