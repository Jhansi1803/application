
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ReactDOM from "react-dom/client";
import { LoginAndSigninPage } from './pages/LoginAndSigninPage/LoginAndSigninPage';
import {Notes} from './pages/NotesPage/Notes.js';
import { PassKeyPage } from './pages/PassKeyPage/PassKeyPage.js';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/notes" element={<Notes />} />
        <Route path="/passkey" element={<PassKeyPage />} />
        <Route path="/" element={<LoginAndSigninPage />}>
        {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
     </BrowserRouter>
    
  );
}

export default App;