import React from 'react';
import logo from './logo.svg';
import './App.css';
import GetComments from './Components/GetComments';
import SearchTrend from './Components/SearchTrend';
import UserMentions from './Components/UserMentions';
import ShowFollowers from './Components/ShowFollowers';

function App() {
  return (
    <div className="App">
      <GetComments />
      <SearchTrend />
      <UserMentions />
      <ShowFollowers />
    </div>
  );
}

export default App;
