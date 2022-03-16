import React from 'react';
import {getHeaders} from './utils';
import Post from './Post';

class Posts extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            posts: null
        }
        // constructor logic
        console.log('Posts component created');
        this.fetchPosts = this.fetchPosts.bind(this);
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts() {
        fetch('https://julias-photo-app.herokuapp.com/api/posts', {
                // authentication headers added using 
                // getHeaders() function from src/utils.js
                headers: getHeaders()
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ posts: data });
            })
    }

    render () {
        if (!this.state.posts) {
            return (
                <div id="posts"></div>
            )
        }
        console.log('Posts rendering...', this.state)
        return (
            <div id="posts">
                {
                    this.state.posts.map(post => {
                        return (<Post model={post} key={'post-' + post.id} />)
                    })
                }
            </div>
        )
    }
}

export default Posts;
