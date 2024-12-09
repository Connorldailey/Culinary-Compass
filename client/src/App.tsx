import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import auth from './utils/auth';

function App() {
  const isLoggedIn = auth.loggedIn();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Define the paths where the background should be applied
  const pagesWithBackground = ['/signup', '/login'];

  // Check if the background should be applied
  const shouldApplyBackground = !isLoggedIn && !pagesWithBackground.includes(currentPath);

  return (
    <div className={`page-container ${shouldApplyBackground ? 'background' : ''}`}>
      <Navbar />
      <main className='main-content p-3 p-md-4 p-lg-5'>
        <Outlet />
      </main>
    </div>
  )
}

export default App;
