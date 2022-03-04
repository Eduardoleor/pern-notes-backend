import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
