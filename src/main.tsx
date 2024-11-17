import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter} from "react-router-dom";
import './App.css';


// ReactDOM.createRoot(document.getElementById('root')!).render(
//         <App />
// )

createRoot(document.getElementById('root')!).render(
  <BrowserRouter future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }} basename="/rip_front">
        <App />
  </BrowserRouter>

)

