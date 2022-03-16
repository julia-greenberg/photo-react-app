import React from 'react';
import LikeButton from './LikeButton';
import { getHeaders } from './utils';
import BookmarkButton from './BookmarkButton';
import AddComment from './AddComment';

class Post extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            post: this.props.model
        }
        this.requeryPost = this.requeryPost.bind(this);
        this.viewAll = this.viewAll.bind(this);
        this.displayComment = this.displayComment.bind(this);
        this.showPostDetail = this.showPostDetail.bind(this);
    }

    requeryPost () {
        console.log("Requerying post...");
        fetch(`/api/posts/${this.props.model.id}/`, {
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                post: data,
                isModalShowing: false
            });
        })
    }

    showPostDetail (ev) {
        console.log("clicked view more");
    }

    viewAll () {
        const comments = this.state.post.comments;
        if (comments.length > 1) {
            return (
                    <button 
                        className="link" 
                        data-post-id={this.state.post.id} 
                        id={"viewmore-"+this.state.post.id}
                        onClick={this.showPostDetail}>
                View all {comments.length} comments
                </button>);
        };
    }

    displayComment () {
        const comments = this.state.post.comments;
        if (comments && comments.length > 0) {
            const lastComment = comments[comments.length - 1];
            return (<div className="comments">
                        <div>
                            <p><strong>{lastComment.user.username}</strong>{lastComment.text}</p>
                            <p className="timestamp">{lastComment.display_time}</p>
                        </div>
                    </div>);
        };
    }
    
    render () {
        const post = this.state.post;
        if (!post) {
            return (
                <div></div>  
            );
        }
        return (
            <section className="card">
                <div className="header">
                    <h3>{ post.user.username }</h3>
                    <i className="fa fa-dots"></i>
                </div>
                
                <img 
                    src={ post.image_url } 
                    alt={'Image posted by ' +  post.user.username } 
                    width="300" 
                    height="300" />
                
                <div className="info">
                    <div className="buttons">
                        <div>
                            <LikeButton 
                                likeId = {post.current_user_like_id}
                                postId = {post.id}
                                requeryPost={this.requeryPost}/>
                            <i className="far fa-comment"></i>
                            <i className="far fa-paper-plane"></i>
                        </div>
                        <div>
                            <BookmarkButton
                                bookmarkId = {post.current_user_bookmark_id}
                                postId = {post.id}
                                requeryPost={this.requeryPost}/>
                        </div>
                    </div>
                    <p className="likes">
                            <strong>{post.likes.length} like{post.likes.length !== 1 ? 's' :''}</strong>
                    </p>
                    <div className="caption">
                        <p>
                            <strong>{post.user.username}</strong>{post.caption}
                        </p>
                        <p className="timestamp">{post.display_time}</p>
                    </div>
                    {this.viewAll()}
                    {this.displayComment()}
                </div>
                <AddComment 
                    postId= {post.id} 
                    requeryPost={this.requeryPost}/>
            </section> 
        );     
    }
}

export default Post;