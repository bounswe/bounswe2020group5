import React from 'react';
import logo from './logo.svg';
import './App.css';
import GetComments from './Components/GetComments';
import SearchTrend from './Components/SearchTrend';
import UserMentions from './Components/UserMentions';
import ShowFollowers from './Components/ShowFollowers';
import Searchtrendforvendor from './Components/searchtrendforvendor';
import Vendortweets from './Components/Vendortweets'
function App() {
    return (
        <div className="App">
            <GetComments />
            <SearchTrend />
            <UserMentions />
            <ShowFollowers />
            <Searchtrendforvendor />
            <Vendortweets />
            <div>
            <a href="http://34.224.5.21:3000/database/newproduct">Add New Product to List</a>
            </div>
            <div>
            <a href="http://34.224.5.21:3000/database/thelist">Show The Product List</a>
            </div>
        </div>
    );
}

export default App;
