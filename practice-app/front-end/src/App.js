import React from 'react';
import logo from './logo.svg';
import './App.css';
import GetComments from './Components/GetComments';
import SearchTrend from './Components/SearchTrend';
import UserMentions from './Components/UserMentions';
function App() {
  return (
    <div className="App">
      <GetComments />
      <SearchTrend />
      <UserMentions />
    </div>
  );
}

export default App;
