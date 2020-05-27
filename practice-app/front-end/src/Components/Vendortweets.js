import React from 'react';
import ReactDOM from 'react-dom';

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
                this.setState({ Results: data });
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
                <div>
                    {this.state.Results}
                </div>
            </form>
        );
    }
}

ReactDOM.render(<Vendortweets />, document.getElementById('root'));


export default Vendortweets;

