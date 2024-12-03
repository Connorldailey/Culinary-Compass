import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='page-container'>
      <Navbar />
      <main className='main-content p-3'>
        <Outlet />
      </main>
    </div>
  )
}

export default App;
