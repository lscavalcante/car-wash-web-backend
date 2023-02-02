import { BrowserRouter } from 'react-router-dom';
import Routes from './routes'
import './style/global.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes />
    </BrowserRouter>
  );
}

export default App
