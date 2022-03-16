import React from 'react';
import { getHeaders } from './utils';

class Suggestion extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            suggestion: this.props.model
        }
        this.toggleFollow = this.toggleFollow.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        // this.requerySuggestion = this.requerySuggestion.bind(this);
    }

    toggleFollow(ev) {
        const elem = ev.currentTarget;
        if (elem.getAttribute('aria-checked').trim() === 'false') {
            console.log('follow');
            this.follow();
        } else {
            const followingId = elem.dataset.followingId;
            console.log('unfollow');
            this.unfollow(followingId);
        }
    }

    follow() {
        // issue fetch request and then afterwards requery for the post:
        // this.props.requeryPost();
        fetch(`https://julias-photo-app.herokuapp.com/api/following/`, {
            headers: getHeaders(),
            method: "POST",
            body: JSON.stringify({user_id: this.state.suggestion.id})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const elem = document.querySelector(`#button-${this.state.suggestion.id}`);
            elem.innerHTML = 'unfollow';
            elem.setAttribute('aria-checked', 'true');
            elem.setAttribute('aria-label', "Unfollow " + this.state.suggestion.username);
            elem.setAttribute('data-following-id', data.id);
        })
    }

    unfollow(followingId) {

        fetch(`https://julias-photo-app.herokuapp.com/api/following/${followingId}`, {
            headers: getHeaders(),
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const elem = document.querySelector(`#button-${this.state.suggestion.id}`);
            elem.innerHTML = 'follow';
            elem.setAttribute('aria-checked', 'false');
            elem.setAttribute('aria-label', "Follow " + this.state.suggestion.username);
            elem.removeAttribute('data-following-id');
        })
    }
    
    render () {
        const suggestion = this.state.suggestion;
        if (!suggestion) {
            return (
                <section></section> 
            );
        }
        return (
            <section id={"suggestion-"+suggestion.id}>
                <img src={suggestion.thumb_url} className="pic" alt={"Profile pic for "+suggestion.username}></img>
                <div>
                    <p>{suggestion.username}</p>
                    <p>suggested for you</p>
                </div>
                <div>
                    <button 
                        role="switch" 
                        className="link following" 
                        id={"button-"+suggestion.id}
                        aria-checked="false" 
                        aria-label={"Follow " + suggestion.username}
                        onClick={this.toggleFollow}>
                        follow
                    </button>
                </div>
            </section>
        );     
    }
}

export default Suggestion;
