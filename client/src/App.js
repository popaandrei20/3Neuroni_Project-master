import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import View from "./pages/View";

import React, { useEffect, useState } from "react";
import Search from "./pages/Search";
import axios from "axios";
import Login from './Login';

function App() {
  

  return (
    <main className="App">
       <BrowserRouter>
                    <div className="App">
                         <ToastContainer position="top-center" />
                             <Routes>
                                  <Route exact path="/" element={<Home/>} />
                                  <Route path="/addReview" element={<AddEdit/>} />
                                  <Route path="/update/:id" element={<AddEdit/>} />
                                  <Route path="/view/:id" element={<View/>} />
        
                              </Routes>
                    </div>
                    </BrowserRouter>
  </main>
  );
}

export default App;
