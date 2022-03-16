// from hint-1
import React from 'react';

class NavBar extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        // this.state = {
        //     username: this.props.username
        // }
        console.log('NavBar component created');
        // this.fetchUser = this.fetchUser.bind(this);
    }

    componentDidMount() {
        // this.fetchUser();
        console.log('NavBar component mounted');
    }

    // fetchUser () {
    //     fetch('/api/profile', {
    //         // authentication headers added using 
    //         // getHeaders() function from src/utils.js
    //         headers: getHeaders()
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         this.setState({ username: data.username });
    //         // console.log(data);
    //     })
    // }

    render () {
        // const username = this.props.username;
        return (
            <nav className="main-nav">
                <h1>{this.props.title}</h1>
                <ul>   
                    <li><a href="/api">API Docs</a></li>
                    <li><span>{this.props.username}</span></li>
                    <li><a href="/logout">Sign out</a></li>
                </ul> 
            </nav>       
        );
    }
}

export default NavBar;