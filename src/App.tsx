import React, { useState } from 'react';
import './App.css';

import { Container } from '@mui/material';
import Diary from './components/diary.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Diary />} />
          <Route path=":id" element={<Diary />} />
        </Routes>
      </BrowserRouter>
    </Container >
  );
}

export default App;
