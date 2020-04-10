import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import Say from 'react-say';
import { SayButton } from 'react-say';
import { Textfit } from 'react-textfit';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 15%;
  border-top-color: rgb(66, 87, 178);
    border-top-style: solid;
    border-top-width: 4px;
    border-right-color: rgb(66, 87, 178);
    border-right-style: solid;
    border-right-width: 4px;
    border-bottom-color: transparent;
    border-bottom-style: solid;
    border-bottom-width: 4px;
    border-left-color: rgb(66, 87, 178);
    border-left-style: solid;
    border-left-width: 4px;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
`;

class FlashCards extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      allCards: [],
      flipped: false,
      progress: null,
      deckStudy: null,
      setProgress: false,
      curTar: null,
      optionsCls: "options-modal",
      optStarred: false,
      allCls: "options-selected",
      starredCls: "options-unselected",
      optAnsType: "Definition",
      optQType: ["flash", "written", "choice"],
      optAudio: false,
      offCls: "options-selected",
      onCls: "options-unselected",
      loading: true,
      shuffled: false,
      shuffleCls: "learn-options-button"
    };
    // this.componentCleanup = this.componentCleanup.bind(this);
  }

  componentDidMount() {
    let that = this;
    this.props.fetchCards(this.props.match.params.deckId)
      .then(() => this.props.fetchCardStudies(this.props.match.params.deckId)
      .then(() => this.props.fetchDeckStudy(this.props.match.params.deckId)
      .then(() => {
        this.setState({ allCards: that.props.cards, progress: this.props.deckStudies[0].progress, deckStudy: this.props.deckStudies[0], setProgress: true});
      })));

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
      this.setState({ optAnsType: "Definition" });
    } else {
      this.setState({ optAnsType: "Term" });
    }
  }

  handleStudyStarredChange(opt) {
    return e => {
      if (opt === "All") {
        this.setState({ allCls: "options-selected", starredCls: "options-unselected" });
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

  resetDecks() {
    // this.setState({

    // });
  }

  shuffle() {
    if (this.state.shuffled) {
      this.setState({ allCards: this.props.cards, shuffled: false, shuffleCls: "learn-options-button" });
    } else {
      let shuffled = Object.assign([], this.state.allCards);
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      this.setState({ allCards: shuffled, shuffled: true, shuffleCls: "learn-options-button fullscreen-highlighted-button"});
    }
  }

  handleFlip(e) {
    if (e.currentTarget.style.transform === "rotateX(180deg)") {
      e.currentTarget.style.transition = "transform 0.6s"
      e.currentTarget.style.transform = "rotateX(0deg)"
      //set timeout on flip so audio button flip looks natural
      setTimeout(() => {
        this.setState({ flipped: false })
      }, 300); 
    } else {
      e.currentTarget.style.transition = "transform 0.6s"
      e.currentTarget.style.transform = "rotateX(180deg)";
      //set flipped to true because audio button is rendering based on this
      this.setState({ flipped: true })
      if (this.state.curTar === null) {
        this.setState({ curTar: e.currentTarget })
      }
    }
  }

  handleProgress(num) {
    return e => {
      let prg = this.state.progress + num;
      if (prg === 0) {
        prg = this.state.allCards.length;
      } else if (prg === this.state.allCards.length + 1) {
        prg = 1;
      }
      if (this.state.curTar) {
        if (this.state.curTar.style.transform === "rotateX(180deg)") {

          this.state.curTar.style.transition = "transform 0s";
          this.state.curTar.style.transform = "rotateX(0deg)"
        }
      } else {
        const ele = document.getElementsByClassName("flip-card-inner")[0]
        this.setState({ curTar: ele });
      }
      //only persist progress if cards are in original order
      // if (!this.state.shuffled) {
        let newDeckStudy = this.state.deckStudy;
        newDeckStudy.progress = prg;
        this.props.updateDeckStudy(newDeckStudy);
      // }
      this.setState({ progress: prg, flipped: false });

    }

  }

  starCard(card) {
    return e => {
      this.props.updateCardStudy({ id: card.cardStudyId, starred: true }).then(() => this.props.fetchCardStudies(card.deckId))
    }
  }

  unstarCard(card) {
    return e => {
      this.props.updateCardStudy({ id: card.cardStudyId, starred: false }).then(() => this.props.fetchCardStudies(card.deckId))
    }
  }


  render() {

    if (this.state.allCards.length === 0) {
      return <div className="gray-spinner">
        <ClipLoader
          css={override}
          size={150}
          loading={this.state.loading}
        />
      </div>
    };

    let cardStyles = {
      height: '250px',
      width: '410px',
    };

    let progressBarStyles = {
      width: `${(this.state.progress / this.state.allCards.length) * 100}%`,
    };

    return (
      <div className="learn">
        <div className="game-sidebar">
          <div className="game-sidebar-back">
            <div onClick={this.goBackPage.bind(this)} className="go-back">
              <i className="fas fa-caret-left"></i>
              <p>Back</p>
            </div>
            <span className="game-sidebar-header">
              <i className="fab fa-buffer"></i>
              <p>CARDS</p>
            </span>
            <div className="progress-underneath">
              <div className="progress-above" style={progressBarStyles}></div>
            </div>
            <div className="progress-bar-text">
              <p>PROGRESS</p>
              <label>{this.state.progress}/{this.state.allCards.length}</label>
            </div>
          </div>
          <div>
            <div onClick={this.shuffle.bind(this)} className={this.state.shuffleCls}>
              <i className="fas fa-random"></i>
              <span>Shuffle</span>
            </div>
            <div onClick={this.showModal.bind(this)} className="learn-options-button">
              <i className="fas fa-sliders-h"></i>
              <span>Options</span>
            </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="big-flashcard-container">
          <div className="deck-page-flip">
            <div className="flip-card">
              <div onClick={this.handleFlip.bind(this)} className="flip-card-inner">
                {this.state.optAnsType === "Definition" ? 
                <>
                  <div className="flip-card-front">
                    <Textfit mode="multi" style={cardStyles}>
                      <p>{this.state.allCards[this.state.progress - 1].term}</p>
                    </Textfit>
                  </div>
                  <div className="flip-card-back" >
                    <Textfit mode="multi" style={cardStyles}>
                      <p>{this.state.allCards[this.state.progress - 1].definition}</p>
                    </Textfit>
                  </div>
                </>
                :
                <>
                  <div className="flip-card-front">
                    <Textfit mode="multi" style={cardStyles}>
                      <p>{this.state.allCards[this.state.progress - 1].definition}</p>
                    </Textfit>
                  </div>
                  <div className="flip-card-back" >
                    <Textfit mode="multi" style={cardStyles}>
                      <p>{this.state.allCards[this.state.progress - 1].term}</p>
                    </Textfit>
                  </div>
                </>
              }
              </div>
            </div>

            <div className="big-flashcard-next">
              <div className="big-flashcard-next-options"></div>
              <div className="deck-page-card-switch">
                <button className="progress-button" onClick={this.handleProgress(-1).bind(this)} ><i className="fas fa-arrow-left"></i></button>
                <button className="progress-button" onClick={this.handleProgress(1).bind(this)}><i className="fas fa-arrow-right"></i></button>
              </div>
              <div className="big-flashcard-next-options">
                {this.state.flipped ? 
                  <SayButton
                    text={`${this.state.allCards[this.state.progress - 1].definition}`}
                  >
                    <i className="fas fa-volume-up"></i>
                  </SayButton>
                    
                : 
                    <SayButton
                      text={`${this.state.allCards[this.state.progress - 1].term}`}
                    >
                      <i className="fas fa-volume-up"></i>
                    </SayButton>
                }
                {this.state.allCards[this.state.progress - 1].starred ? <i onClick={this.unstarCard(this.state.allCards[this.state.progress - 1]).bind(this)} className="fas fa-star solid-star"></i> : <i onClick={this.starCard(this.state.allCards[this.state.progress - 1]).bind(this)} className="far fa-star hollow-star"></i>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FlashCards;