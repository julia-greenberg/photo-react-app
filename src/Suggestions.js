import React from 'react';
import {getHeaders} from './utils';
import Suggestion from './Suggestion';

class Suggestions extends React.Component {  
    constructor(props) {
        super(props);
        // constructor logic
        this.state = {
            suggestions: null
        }
        console.log('Suggestions component created');
        this.fetchSuggestions = this.fetchSuggestions.bind(this);
    }

    componentDidMount() {
        // fetch posts
        this.fetchSuggestions();
        console.log('Suggestions component mounted');
    }

    fetchSuggestions() {
        fetch('/api/suggestions/', {
            // authentication headers added using 
            // getHeaders() function from src/utils.js
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ suggestions: data });
        })
    }

    render () {
        if (!this.state.suggestions) {
            return (
                <div className="suggestions">
                    <p className="suggestion-text">Suggestions for you</p>
                </div>
            )
        }
        console.log('Suggestions rendering...', this.state)
        return (
            <div className="suggestions">
                <p className="suggestion-text">Suggestions for you</p>
                <div>
                {
                    this.state.suggestions.map(suggestion => {
                        return (<Suggestion model={suggestion} key={'suggestion-' + suggestion.id} />)
                    })
                }
                </div>
            </div>
        )     
    }
}

export default Suggestions;