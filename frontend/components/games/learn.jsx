import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';

class Learn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      remaining: 0,
      familiar: 1,
      mastered: 0,

    };
  }

  componentDidMount() {
    let that = this;
    this.props.fetchCards(this.props.match.params.deckId)
      .then(() => this.props.fetchCardStudies(this.props.match.params.deckId))
      .then(() => {
        this.setState({ cards: Object.assign([], that.props.cards), remaining: that.props.cards.length})});
  }

  handleRedirect(deckId) {
    return e => {
      this.setState({ redirect: `/${deckId}/flash-cards` })
    }
  }

  goBackPage() {
    this.props.history.goBack();
  }

  render() {

    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />
    }
    // debugger
    if (this.props.cards.length === 0) return null;

    return (
      <div className="learn">
        <div className="game-sidebar">
          <div className="game-sidebar-back">
            <div onClick={this.goBackPage.bind(this)} className="go-back">
              <i className="fas fa-caret-left"></i>
              <p>Back</p>
            </div>
            <span className="game-sidebar-header">
              <i className="fas fa-brain"></i>
              <p>LEARN</p>
            </span>
            <div className="learn-mastery-counts">
              <div className="learn-mastery-remaining">
                <span>{this.state.remaining}</span>
                <p>REMAINING</p>
                <i class="fas fa-long-arrow-alt-down"></i>
              </div>
              <div className="learn-mastery">
                <span id={`learn-familiar-${this.state.familiar}`}>{this.state.familiar}</span>
                <div><p>FAMILIAR</p><i className="fas fa-check"></i></div>
                <i class="fas fa-long-arrow-alt-down"></i>
              </div>
              <div className="learn-mastery">
                <span id={`learn-mastery-${this.state.mastered}`}>{this.state.mastered}</span>
                <div><p>MASTERED</p><i className="fas fa-check-double"></i></div>
              </div>
            </div>
          </div>
        </div>
        <div className="learn-card">
          <div className="learn-card-inner">
            <div className="learn-card-question">
              <p>{this.props.cards[0].term}</p>
            </div>
            <div className="learn-card-answers">
              <div className="learn-card-answer">
                <p>{this.props.cards[0].definition}</p>
                <span className="learn-answer-circle">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Learn;