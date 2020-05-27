import React from 'react';
import ReactDOM from 'react-dom';

class searchtrendforvendor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Results: '' };
    }
    GetVendor = (event) => {

        fetch("http://localhost:3000/searchtrendforvendor?vendor=" + event.target.value, {
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
                <h1>Trend Tweets About Vendor:</h1>
                <p>Enter your query:</p>
                <input
                    type='text'
                    onChange={this.GetVendor}
                />
                <div>
                    {this.state.Results}
                </div>
            </form>
        );
    }
}

ReactDOM.render(<searchtrendforvendor />, document.getElementById('root'));


export default searchtrendforvendor;

