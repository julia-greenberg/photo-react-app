import React from 'react';
import {getHeaders} from './utils';

class AddComment extends React.Component {  

    constructor(props) {
        super(props);
        this.postComment = this.postComment.bind(this);
        this.requeryPost = this.props.requeryPost.bind(this);
    }

    postComment (ev) {
        // had to include next line because page was refreshing when clicked
        ev.preventDefault();
        const postId = this.props.postId;
        const newComment = document.querySelector(`#addcomment-${postId}`).value;
        if (newComment){
            fetch(`/api/comments`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify({"post_id": postId, "text": newComment})
            })
            .then(response => response.json())
            .then(data => {
                console.log("Posting comment...");
                console.log(data)
                this.requeryPost();
                let inputBox = document.querySelector(`#inputholder-${postId}`);
                inputBox.innerHTML = `<input type="text" id="addcomment-${postId}" aria-label="Add a comment" placeholder="Add a comment...">`;
                document.querySelector(`#addcomment-${postId}`).focus();
            });
        };
    }


    render () {
        return (
            <form className="add-comment">
                <div className="input-holder" id={"inputholder-"+this.props.postId}>
                    {/* had to change value to defaultValue */}
                    <input type="comment-textbox" aria-label="Add a comment" placeholder="Add a comment..." id={"addcomment-"+this.props.postId}/>
                </div>
                <button 
                    className="link"
                    onClick={this.postComment}
                    data-post-id={this.props.postId}>
                    Post
                </button>
            </form>
        ) 
    }
}

export default AddComment;