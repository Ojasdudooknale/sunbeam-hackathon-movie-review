import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// Import Bootstrap CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap JavaScript bundle to enable interactive components 
// (like the Navbar collapse toggler, dropdowns, modals, etc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Note: The second './index.css' import is redundant and can be removed if they are the same file.

createRoot(document.getElementById('root')).render(
  // BrowserRouter enables client-side routing within your application
  <BrowserRouter>
    <App /> {/* Your main application component */}
  </BrowserRouter>
)
