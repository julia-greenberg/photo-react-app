import React from 'react';

class Profile extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        console.log('Profile component created');
    }

    componentDidMount() {
        // fetch posts
        console.log('Profile component mounted');
    }

    render () {
        return (
            <header>
                <div>
                    <img className="pic" src={this.props.picture} alt={"Profile pic for " + this.props.username} />
                    <h2>{this.props.username}</h2>
                </div>
            </header>  
        );
    }
}

export default Profile;