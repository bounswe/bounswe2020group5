import React from 'react';
import ReactDOM from 'react-dom';
import Tweet from './Tweet';

class UserMentions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        Results: '',
        user: '',
        vendor: ''
        };
  }
  GetTweets = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
    fetch("http://localhost:3000/filter_user_tweets?user="+this.state.user+"&mentioned="+this.state.vendor+"&count=10",{method: "GET"})
      .then((resp) => {
        return resp.json()
      }) 
      .then((data) => {
        let result = '';
        var array = JSON.parse(data);
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          result+=element+"\n";
        }
        this.setState({Results: result});
        })
      .catch((error) => {
        console.log(error, "catch the hoop")
      })
  }
  render() {
    return (
        <div>
            <form>
                <h1>Tweets of an user who mentioned Vendor</h1>
                <p>Enter user name:</p>
                <input
                type='text'
                name='user'
                onChange={this.GetTweets}
                />
                <p>Enter Vendor name:</p>
                <input
                type='text'
                name='vendor'
                onChange={this.GetTweets}
                />
            </form>
    
            <div >
            {this.state.Results.split("\n").map((i,key) => {
            return <div key={key}> <Tweet tweet={i}></Tweet> </div>;
            })}
          </div>
        </div>
    );
  }
}

ReactDOM.render(<UserMentions />, document.getElementById('root'));


export default UserMentions  ;

