import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Inicio from './paginas/Inicio'


function App() {
  return (
    <Router>
      <Route component={Inicio}></Route>
    </Router>

  );
}

export default App;
