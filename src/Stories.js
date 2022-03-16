import React from 'react';
import {getHeaders} from './utils';

class Stories extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        this.state = {
            stories: null
        }
        console.log('Stories component created');
        this.fetchStories = this.fetchStories.bind(this);
    }

    componentDidMount() {
        // fetch posts
        this.fetchStories();
        console.log('Stories component mounted');
    }

    fetchStories () {
        fetch('https://julias-photo-app.herokuapp.com/api/stories', {
            // authentication headers added using 
            // getHeaders() function from src/utils.js
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ stories: data });
            console.log("Stories data...", data);
        })
    }

    render () {
        if (!this.state.stories) {
            return (
                <header className="stories"></header>  
            )
        }
        return (
            <header className="stories">
                {
                    this.state.stories.map(story => {
                        return (<div key={'story-' + story.id}>
                                <img src={story.user.thumb_url} className="pic" alt={"profile pic for " + story.user.username}/>
                                <p>{story.user.username}</p>
                            </div>)
                    })
                }
            </header>
        );
    }
}

export default Stories;
