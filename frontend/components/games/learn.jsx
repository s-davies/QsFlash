import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';

class Learn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      allCards: [],
      remainingCards: [],
      masteredCards: [],
      twoArr: this.shuffle([0, 1]),
      threeArr: this.shuffle([0, 1, 2]),
      fourArr: this.shuffle([0, 1, 2, 3]),
      remaining: 0,
      familiar: 0,
      mastered: 0,
      optionsCls: "options-modal",
      optStarred: false,
      allCls: "options-selected",
      starredCls: "options-unselected",
      optAnsType: "Term",
      optQType: ["flash", "written", "choice"],
      optAudio: false,
      offCls: "options-selected",
      onCls: "options-unselected",
      mc1Correct: false,
      mc2Correct: false,
      mc3Correct: false,
      mc4Correct: false
    };
  }

  componentDidMount() {
    let that = this;
    this.props.fetchCards(this.props.match.params.deckId)
      .then(() => this.props.fetchCardStudies(this.props.match.params.deckId))
      .then(() => {
        this.setState({ allCards: Object.assign([], that.props.cards), remainingCards: Object.assign([], that.props.cards), remaining: that.props.cards.length})});
  }

  handleRedirect(deckId) {
    return e => {
      this.setState({ redirect: `/${deckId}/flash-cards` })
    }
  }

  goBackPage() {
    this.props.history.goBack();
  }

  showModal() {
    if (this.state.optionsCls === "options-modal") {
      this.setState({ optionsCls: "options-modal show-modal" })
    }
  }

  hideModal(e) {
    if (e.target.className === "options-modal show-modal" ||
      e.target.className === "options-close-form") {
      this.setState({ optionsCls: "options-modal" })
    }
  }

  handleAnswerTypeChange() {
    if (this.state.optAnsType === "Term") {
      this.setState({optAnsType: "Definition"});
    } else {
      this.setState({ optAnsType: "Term" });
    }
  }

  handleStudyStarredChange(opt) {
    return e => {
      if (opt === "All") {
        this.setState({ allCls: "options-selected", starredCls: "options-unselected"});
      } else {
        this.setState({ starredCls: "options-selected", allCls: "options-unselected" });
      }
    }
  }

  handleAudioChange(opt) {
    return e => {
      if (opt === "Off") {
        this.setState({ offCls: "options-selected", onCls: "options-unselected" });
      } else {
        this.setState({ onCls: "options-selected", offCls: "options-unselected" });
      }
    }
  }

  answerMultipleChoice(answer, answerNum) {
    return e => {

      if (answer.term === this.state.allCards[0].term && answer.definition === this.state.allCards[0].definition) {
        console.log("hi there");
        
        switch (answerNum) {
          case 1:
            this.setState({mc1Correct: true});
            break;
          case 2:
            this.setState({ mc2Correct: true });
            break;
          case 3:
            this.setState({ mc3Correct: true });
            break;
          case 4:
            this.setState({ mc4Correct: true });
            break;
          default:
            break;
        }
        setTimeout(() => {
          this.setState({ 
          twoArr: this.shuffle(this.state.twoArr),
          threeArr: this.shuffle(this.state.threeArr),
          fourArr: this.shuffle(this.state.fourArr),
          allCards: this.shuffle(this.state.allCards)
        })
          switch (answerNum) {
            case 1:
              this.setState({ mc1Correct: false });
              break;
            case 2:
              this.setState({ mc2Correct: false });
              break;
            case 3:
              this.setState({ mc3Correct: false });
              break;
            case 4:
              this.setState({ mc4Correct: false });
              break;
            default:
              break;
          }
      },
        2000
        );
      }
      
    }
  }

  shuffle(array) {
    let shuffled = Object.assign([], array);
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  render() {

    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />
    }
    // debugger
    if (this.state.allCards.length === 0) return null;

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
                <i className="fas fa-long-arrow-alt-down"></i>
              </div>
              <div className="learn-mastery">
                <span id={`learn-familiar-${this.state.familiar}`}>{this.state.familiar}</span>
                <div><p>FAMILIAR</p><i className="fas fa-check"></i></div>
                <i className="fas fa-long-arrow-alt-down"></i>
              </div>
              <div className="learn-mastery">
                <span id={`learn-mastery-${this.state.mastered}`}>{this.state.mastered}</span>
                <div><p>MASTERED</p><i className="fas fa-check-double"></i></div>
              </div>
            </div>
          </div>
          <div onClick={this.showModal.bind(this)} className="learn-options-button">
            <i className="fas fa-sliders-h"></i>
            <span>Options</span>
          </div>
          <div onClick={this.hideModal.bind(this)} className={this.state.optionsCls}>
            <div className='options-div-box'>
              <div className="options-banner">
                <h1 className="form-title">Options</h1>
                <div onClick={this.hideModal.bind(this)} className="options-close-form">X</div>
              </div>
              <div className="options-content">
                <div className="options-top">
                <div className="options-radio-div">
                  <span>STUDY STARRED</span>
                  <div>
                      <button onClick={this.handleStudyStarredChange("All").bind(this)} className={this.state.allCls} >All</button>
                      <button onClick={this.handleStudyStarredChange("Starred").bind(this)} className={this.state.starredCls}>Starred</button>
                  </div>
                </div>
                  {/* <span>ANSWER WITH</span>
                  <label>Term
                    <input type="checkbox" checked="checked"/>
                    <span className="checkmark"></span>
                  </label>
                  <label>Definition
                    <input type="checkbox" checked="checked"/>
                    <span className="checkmark"></span>
                  </label>
                    */}
                  <div className="options-audio-div options-field">
                      <span>ANSWER WITH</span>
                      <select value={this.state.optAnsType} onChange={this.handleAnswerTypeChange.bind(this)}>
                        <option value="Term">
                          Term
                        </option>
                        <option value="Definition">Definition</option>
                      </select>
                    </div>
              </div>
                <div className="options-middle">

                </div>
                <div className="options-bottom">
                    <div className="options-radio-div">
                      <span>AUDIO</span>
                      <div>
                        <button onClick={this.handleAudioChange("Off").bind(this)} className={this.state.offCls}>Off</button>
                        <button onClick={this.handleAudioChange("On").bind(this)} className={this.state.onCls}>On</button>

                      </div>
                    </div>
                    <div className="options-reset-div">
                      <span>RESET PROGRESS</span>
                      <div>
                        <p>START OVER</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="learn-card">
          <div className="learn-card-inner">
            <div className="learn-card-question">
              <p>{this.state.allCards[0].term}</p>
            </div>
            <div className="learn-card-answers">
                {this.state.allCards.length === 2 ?
                <>
                {this.state.mc1Correct ? 
                    <div className="learn-card-correct">
                      <p>Correct! 😀</p>
                    </div>
                    :
                    <div className="learn-card-answer" onClick={this.answerMultipleChoice(this.state.allCards[this.state.twoArr[0]], 1).bind(this)}>
                      <p>{this.state.allCards[this.state.twoArr[0]].definition}</p>
                      <span className="learn-answer-circle">1</span>
                    </div>}
                  {this.state.mc2Correct ?
                    <div className="learn-card-correct">
                      <p>Correct! 😀</p>
                    </div>
                    :
                    <div className="learn-card-answer" onClick={this.answerMultipleChoice(this.state.allCards[this.state.twoArr[1]], 2).bind(this)}>
                      <p>{this.state.allCards[this.state.twoArr[1]].definition}</p>
                      <span className="learn-answer-circle">2</span>
                    </div>}
                </>
                : ""
                }
                {this.state.allCards.length === 3 ?
                <>
                  {this.state.mc1Correct ?
                    <div className="learn-card-correct" >
                      <p>Correct! 😀</p>
                    </div>
                    :
                    <div className="learn-card-answer" onClick={this.answerMultipleChoice(this.state.allCards[this.state.threeArr[0]], 1).bind(this)}>
                      <p>{this.state.allCards[this.state.threeArr[0]].definition}</p>
                      <span className="learn-answer-circle">1</span>
                    </div>}
                    {this.state.mc2Correct ?
                      <div className="learn-card-correct">
                        <p>Correct! 😀</p>
                      </div>
                      :
                      <div className="learn-card-answer" onClick={this.answerMultipleChoice(this.state.allCards[this.state.threeArr[1]], 2).bind(this)}>
                        <p>{this.state.allCards[this.state.threeArr[1]].definition}</p>
                        <span className="learn-answer-circle">2</span>
                      </div>}
                  {this.state.mc3Correct ?
                    <div className="learn-card-correct">
                      <p>Correct! 😀</p>
                    </div>
                    :
                    <div className="learn-card-answer" onClick={this.answerMultipleChoice(this.state.allCards[this.state.threeArr[2]], 3).bind(this)}>
                      <p>{this.state.allCards[this.state.threeArr[2]].definition}</p>
                      <span className="learn-answer-circle">3</span>
                    </div>}
                
                </> : ""}
                {this.state.allCards.length > 3 ?
                  <>
                {
                  this.state.mc1Correct ?
                    <div className="learn-card-correct">
                      <p>Correct! 😀</p>
                    </div>
                    :
                    <div className="learn-card-answer" onClick={this.answerMultipleChoice(this.state.allCards[this.state.fourArr[0]], 1).bind(this)}>
                      <p>{this.state.allCards[this.state.fourArr[0]].definition}</p>
                      <span className="learn-answer-circle">1</span>
                    </div>
                }
                    {this.state.mc2Correct ?
                      <div className="learn-card-correct">
                <p>Correct! 😀</p>
              </div>
              :
                      <div className="learn-card-answer" onClick={this.answerMultipleChoice(this.state.allCards[this.state.fourArr[1]], 2).bind(this)}>
                <p>{this.state.allCards[this.state.fourArr[1]].definition}</p>
                <span className="learn-answer-circle">2</span>
              </div>}
                  {this.state.mc3Correct ?
                <div className="learn-card-correct">
                  <p>Correct! 😀</p>
                </div>
                :
                <div className="learn-card-answer" onClick={this.answerMultipleChoice(this.state.allCards[this.state.fourArr[2]], 3).bind(this)}>
                  <p>{this.state.allCards[this.state.fourArr[2]].definition}</p>
                  <span className="learn-answer-circle">3</span>
                </div>}
                  {this.state.mc4Correct ?
                    <div className="learn-card-correct">
                      <p>Correct! 😀</p>
                    </div>
                    :
                    <div className="learn-card-answer" onClick={this.answerMultipleChoice(this.state.allCards[this.state.fourArr[3]], 4).bind(this)}>
                      <p>{this.state.allCards[this.state.fourArr[3]].definition}</p>
                      <span className="learn-answer-circle">4</span>
                    </div>}
                </> 
                  : ""
                }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Learn;