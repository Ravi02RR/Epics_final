// eslint-disable-next-line no-unused-vars
import React, { Suspense } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
import NavBar from './Component/NavBar/NavBar.jsx';
import Footer from './Component/NavBar/Footer.jsx';

// Importing components only once
import Signup from './Component/Signup/Signup.jsx';
import Login from './Component/Login/Login.jsx';
import Main from './Page/Main/Main.jsx';
import Contact from './Page/Contact/Contact.jsx';
import About from './Page/About/About.jsx';
import SearchArea from './Page/Areas/SearchArea.jsx';
import Testai from './Page/Areas/Testai.jsx';
import AreaDetail from './Page/Areas/AreaDetail.jsx';
import Testimonial from './Page/Main/Testemonial.jsx'
import PopUp from './Component/Popup/PopUp.jsx';

function App() {
  const user = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/area/:id" element={<AreaDetail />} />
          <Route path="/about" element={<About />} />

          {!user && <Route path="/login" element={<Login />} />}
          {!user && <Route path="/signup" element={<Signup />} />}
          {user ? <Route path="/" element={<Main  />} /> : <Route path="*" element={<Navigate to="/login" replace />} />}
          {user ? <Route path="/contact" element={<Contact name={name} />} /> : <Route path="*" element={<Navigate to="/login" replace />} />}
          {user ? <Route path="/post" element={<Testai />} /> : <Route path="*" element={<Navigate to="/login" replace />} />}
          {user ? <Route path="/search" element={<SearchArea />} /> : <Route path="*" element={<Navigate to="/login" replace />} />}
          {user ? <Route path="/testmonial" element={<Testimonial user={name} />} /> : <Route path="*" element={<Navigate to="/login" replace />} />}
        </Routes>

      </Suspense>
      <PopUp></PopUp>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
