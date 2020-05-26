import React from 'react';
import ReactDOM from 'react-dom';

class ShowFollowers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Results: '' }
    }
    getFollowers = (event) => {
        fetch("http://localhost:3000/showfollowers?name="+event.target.value, {
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
            <h1>Follower Count:</h1>
            <p>Enter the username:</p>
            <input
              type='text'
              onChange={this.getFollowers}
            />
                <div>
                  {this.state.Results}
                </div>
            </form>
        );
    }
}

ReactDOM.render(<ShowFollowers />, document.getElementById('root'));


export default ShowFollowers;