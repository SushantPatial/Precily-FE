import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home /> }></Route> 
        <Route path="/admin" element={ <Admin /> }></Route>
      </Routes>
    </div>
  );
}

export default App;
