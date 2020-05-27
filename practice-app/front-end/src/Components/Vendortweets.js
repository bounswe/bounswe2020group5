import React from 'react';
import ReactDOM from 'react-dom';
import Tweet from './Tweet';

class Vendortweets extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Results: '' };
    }
    GetTweets = (event) => {

        fetch("http://localhost:3000/vendortweets?vendor_name=" + event.target.value, {
            method: "GET",
        })
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
            <form>
                <h1>Vendor Tweets:</h1>
                <p>Enter your query:</p>
                <input
                    type='text'
                    onChange={this.GetTweets}
                />
                <div >
                    {this.state.Results.split("\n").map((i,key) => {
                    return <div key={key}> <Tweet tweet={i}></Tweet> </div>;
                    })}
                </div>
            </form>
        );
    }
}

ReactDOM.render(<Vendortweets />, document.getElementById('root'));


export default Vendortweets;

