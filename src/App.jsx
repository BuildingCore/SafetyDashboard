import { useState, useEffect } from 'react'
import { supabase } from './client'
import { Route, Routes} from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css"

import Home from './routes/Home'
import Trade from './routes/Trade'
import Admin from './routes/Admin'
import Navigation from './components/Navigation'
import Project from './routes/Project'

function App() {

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/trade/:id" element={<Trade />} />
        <Route path="/project/:id" element={<Project />} />
      </Routes>
    </>
  )
}

export default App
