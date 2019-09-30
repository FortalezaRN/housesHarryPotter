import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/home/Home';
import Students from './components/students/Students';
import Score from './components/score/Score';
import './App.css';

function App() {
  return (
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/students" exact component={Students} />
      <Route path="/scoresHouses" exact component={Score} />
    </div>
  );
}

export default App;
