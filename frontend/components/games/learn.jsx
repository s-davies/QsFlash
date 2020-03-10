import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';

class Learn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cards: Object.assign([], this.props.cards)
    };
  }

  componentDidMount() {
    this.props.fetchCards().then(() => this.props.fetchCardStudies());
    
  }

  handleRedirect(deckId) {
    return e => {
      this.setState({ redirect: `/${deckId}/flash-cards` })
    }
  }

  render() {

    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />
    }


    return (
      <div className="learn">
        
      </div>
    )
  }
}

export default Learn;