import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignUp } from './pages/SignUp';
import { MathematicsModule } from './pages/MathematicsModule';
import { IndianSignLanguage } from './pages/IndianSignLanguage';
import { Science } from './pages/Science';
export function AppRouter() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mathematics" element={<MathematicsModule />} />
        <Route path="/isl" element={<IndianSignLanguage />} />
        <Route path="/science" element={<Science />} />
      </Routes>
    </BrowserRouter>;
}