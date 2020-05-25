import React from 'react';
import ReactDOM from 'react-dom';

class SearchTrend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Results: '' };
  }
  GetTweets = (event) => {

    fetch("http://localhost:3000/searchtrendforproduct?query="+event.target.value, {
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
      <h1>Last Day Tweet Count:</h1>
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

ReactDOM.render(<SearchTrend />, document.getElementById('root'));


export default SearchTrend  ;

