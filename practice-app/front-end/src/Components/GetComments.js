import React from 'react';
import ReactDOM from 'react-dom';

class GetComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Results: '' };
  }
  GetTweets = (event) => {

    fetch("http://localhost:3000/twittercomments?query="+event.target.value+"&count=10", {
        method: "GET",
      })
      .then((resp) => {
        return resp.json()
      }) 
      .then((data) => {
        this.setState({Results: data});
      })
      .catch((error) => {
        console.log(error, "catch the hoop")
      })
  }
  render() {
    return (
      <form>
      <h1>Get Tweets About You Product</h1>
      <p>Enter your query:</p>
      <input
        type='text'
        onChange={this.GetTweets}
      />
          <div>
            {this.state.Results}
          </div>
      </form>
    );
  }
}

ReactDOM.render(<GetComments />, document.getElementById('root'));


export default GetComments  ;

