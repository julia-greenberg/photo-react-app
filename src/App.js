import React from 'react';
import Posts from './Posts.js';
import NavBar from './NavBar';
import Profile from './Profile';
import Stories from './Stories';
import Suggestions from './Suggestions';
import {getHeaders} from './utils';

class App extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        // constructor logic
        console.log('App component created');
        this.fetchUser = this.fetchUser.bind(this);
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser () {
        fetch('https://julias-photo-app.herokuapp.com/api/profile', {
            // authentication headers added using 
            // getHeaders() function from src/utils.js
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ 
                username: data.username,
                image: data.thumb_url});
        })
    };

    render () {
        // const username = this.state.user.username;
        return (
            <div>
                <NavBar title="Photo App" username={this.state.username} />
                <aside>
                    <Profile username={this.state.username} picture={this.state.image}/>
                    <Suggestions />
                </aside>

                <main className="content">
                    <Stories />
                    <Posts />
                </main>
            </div>
        );
    }
}

export default App;
