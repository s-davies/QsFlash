import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import Say from 'react-say';
import { SayButton } from 'react-say';
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

class Learn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      allCards: [],
      remainingAndFamiliar: [],
      remainingCards: [],
      familiarCards: [],
      masteredCards: [],
      twoArr: this.shuffle([0, 1]),
      threeArr: this.shuffle([0, 1, 2]),
      fourArr: this.shuffle([0, 1, 2, 3]),
      optionsCls: "options-modal",
      optStarred: false,
      allCls: "options-selected",
      starredCls: "options-unselected",
      optAnsType: "Term",
      optQType: ["flash", "written", "choice"],
      optAudio: false,
      offCls: "options-selected",
      onCls: "options-unselected",
      mc1Correct: null,
      mc2Correct: null,
      mc3Correct: null,
      mc4Correct: null,
      lastAnswer: null,
      lastQuestion: null,
      loading: true
    };

  }

  componentDidMount() {
    let that = this;
    this.props.fetchCards(this.props.match.params.deckId)
      .then(() => this.props.fetchCardStudies(this.props.match.params.deckId))
      .then(() => {
        const rem = [];
        const fam = [];
        const mast = [];
        const allCards = that.shuffle(Object.assign([], that.props.cards));
        for (let i = 0; i < allCards.length; i++) {
          const card = allCards[i];
          if (card.learnCount === 0) rem.push(card);
          if (card.learnCount === 1) fam.push(card);
          if (card.learnCount === 2) mast.push(card);
        }
        const remAndFam = rem.concat(fam);
        this.setState({ allCards: allCards, remainingAndFamiliar: remAndFam, remainingCards: rem, familiarCards: fam, masteredCards: mast})});
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
        this.componentDidMount();
        this.setState({ allCls: "options-selected", starredCls: "options-unselected"});
      } else {
        const allCards = [];
        const remainingAndFamiliar = [];
        const remainingCards = [];
        const familiarCards = [];
        const masteredCards = [];
        for (let i = 0; i < this.state.allCards.length; i++) {
          const card = this.state.allCards[i];
          if (card.starred) allCards.push(card);
        }
        for (let i = 0; i < this.state.remainingAndFamiliar.length; i++) {
          const card = this.state.remainingAndFamiliar[i];
          if (card.starred) remainingAndFamiliar.push(card);
        }
        for (let i = 0; i < this.state.remainingCards.length; i++) {
          const card = this.state.remainingCards[i];
          if (card.starred) remainingCards.push(card);
        }
        for (let i = 0; i < this.state.familiarCards.length; i++) {
          const card = this.state.familiarCards[i];
          if (card.starred) familiarCards.push(card);
        }
        for (let i = 0; i < this.state.masteredCards.length; i++) {
          const card = this.state.masteredCards[i];
          if (card.starred) masteredCards.push(card);
        }
        this.setState({ 
          starredCls: "options-selected", 
          allCls: "options-unselected",
          allCards: allCards,
          remainingAndFamiliar: remainingAndFamiliar,
          remainingCards: remainingCards,
          familiarCards: familiarCards,
          masteredCards: masteredCards 
        });
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
      const card = Object.assign({}, this.state.remainingAndFamiliar[0]);
      if (answer.term === card.term && answer.definition === card.definition) {
        card.learnCount += 1;
        card.correctnessCount += 1;
        this.props.updateCardStudy({ id: card.cardStudyId, correctnessCount: card.correctnessCount, learnCount: card.learnCount }).then(() => this.props.fetchCardStudies(this.props.match.params.deckId));
        let remCards = Object.assign([], this.state.remainingCards);
        let famCards = Object.assign([], this.state.familiarCards);
        let mastCards = Object.assign([], this.state.masteredCards);
        if (card.learnCount === 1) {
          remCards = this.state.remainingCards.filter(cd => cd.cardStudyId !== card.cardStudyId );
          famCards.push(card);
          this.setState({ 
            remainingCards: remCards,
            familiarCards: famCards
          });
        }
        if (card.learnCount === 2) {
          famCards = this.state.familiarCards.filter(cd => cd.cardStudyId !== card.cardStudyId);
          mastCards.push(card)
          this.setState({
            familiarCards: famCards,
            masteredCards: mastCards
          });
        }
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
        if (remCards.concat(famCards).length !== 0) {
        setTimeout(() => {
          this.setState({ 
          twoArr: this.shuffle(this.state.twoArr),
          threeArr: this.shuffle(this.state.threeArr),
          fourArr: this.shuffle(this.state.fourArr),
          remainingAndFamiliar: this.shuffle(remCards.concat(famCards)),
          allCards: this.shuffle(this.state.allCards)
        })
          switch (answerNum) {
            case 1:
              this.setState({ mc1Correct: null });
              break;
            case 2:
              this.setState({ mc2Correct: null });
              break;
            case 3:
              this.setState({ mc3Correct: null });
              break;
            case 4:
              this.setState({ mc4Correct: null });
              break;
            default:
              break;
          }
      },
        1000
        ); }
      } else {
        this.props.updateCardStudy({ id: card.cardStudyId, correctnessCount: card.correctnessCount - 1}).then(() => this.props.fetchCardStudies(this.props.match.params.deckId));
        this.setState({lastAnswer: answer, lastQuestion: card});
      }
      
    };
  }

  resetDecks() {
    this.setState({ 
      lastAnswer: null, 
      lastQuestion: null,
      twoArr: this.shuffle(this.state.twoArr),
      threeArr: this.shuffle(this.state.threeArr),
      fourArr: this.shuffle(this.state.fourArr),
      remainingAndFamiliar: this.shuffle(this.state.remainingAndFamiliar),
      allCards: this.shuffle(this.state.allCards)
     });
  }

  resetProgress() {
    for (let i = 0; i < this.state.allCards.length; i++) {
      const card = this.state.allCards[i];
      this.props.updateCardStudy({ id: card.cardStudyId, learnCount: 0 }).then(() => this.props.fetchCardStudies(this.props.match.params.deckId));
    }
    this.setState({
      lastAnswer: null,
      lastQuestion: null,
      twoArr: this.shuffle(this.state.twoArr),
      threeArr: this.shuffle(this.state.threeArr),
      fourArr: this.shuffle(this.state.fourArr),
      remainingCards: this.shuffle(this.state.allCards),
      familiarCards: [],
      masteredCards: [],
      remainingAndFamiliar: this.shuffle(this.state.allCards),
      allCards: this.shuffle(this.state.allCards),
      mc1Correct: null,
      mc2Correct: null,
      mc3Correct: null,
      mc4Correct: null
    });
  }

  shuffle(array) {
    let shuffled = Object.assign([], array);
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  starCard(card) {
    return e => {
      card.starred = true; //need this so star appearance changes immediately
      this.props.updateCardStudy({ id: card.cardStudyId, starred: true }).then(() => this.props.fetchCardStudies(card.deckId))
    };
  }

  unstarCard(card) {
    return e => {
      if (this.state.starredCls === "options-selected") {
        card.starred = false; //need this so star appearance changes immediately
        const allCards = [];
        const remainingAndFamiliar = [];
        const remainingCards = [];
        const familiarCards = [];
        const masteredCards = [];
        for (let i = 0; i < this.state.allCards.length; i++) {
          const crd = this.state.allCards[i];
          if (crd.id !== card.id) allCards.push(crd);
        }
        for (let i = 0; i < this.state.remainingAndFamiliar.length; i++) {
          const crd = this.state.remainingAndFamiliar[i];
          if (crd.id !== card.id) remainingAndFamiliar.push(crd);
        }
        for (let i = 0; i < this.state.remainingCards.length; i++) {
          const crd = this.state.remainingCards[i];
          if (crd.id !== card.id) remainingCards.push(crd);
        }
        for (let i = 0; i < this.state.familiarCards.length; i++) {
          const crd = this.state.familiarCards[i];
          if (crd.id !== card.id) familiarCards.push(crd);
        }
        for (let i = 0; i < this.state.masteredCards.length; i++) {
          const crd = this.state.masteredCards[i];
          if (crd.id !== card.id) masteredCards.push(crd);
        }
        this.setState({
          allCards: allCards,
          remainingAndFamiliar: remainingAndFamiliar,
          remainingCards: remainingCards,
          familiarCards: familiarCards,
          masteredCards: masteredCards
        });
      }
      this.props.updateCardStudy({ id: card.cardStudyId, starred: false }).then(() => this.props.fetchCardStudies(card.deckId))
    };
  }

  render() {

    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />
    }

    if (this.state.allCards.length === 0) {
      return <div className="gray-spinner">
        <ClipLoader
          css={override}
          size={150}
          loading={this.state.loading}
        />
      </div>
    };
    const mcAns = [this.state.remainingAndFamiliar[0]];
    let i = 0;
    if (this.state.starredCls === "options-selected") {
        //may want to fix the randomization on this.props.cards
        //because it is currently picking from the same answers every time
        let starAnswers = Object.assign([], this.state.allCards.concat(this.props.cards));
        while (i < starAnswers.length) {
          if (starAnswers[i].term !== mcAns[0].term && starAnswers[i].definition !== mcAns[0].definition) mcAns.push(starAnswers[i]);
          i += 1;
          if (mcAns.length === 4) break;
        }

    } else {
      if (this.state.remainingAndFamiliar.length > 0) {
        while (i < this.state.allCards.length) {
          if (this.state.allCards[i].term !== mcAns[0].term && this.state.allCards[i].definition !== mcAns[0].definition) mcAns.push(this.state.allCards[i]);
          i += 1;
          if (mcAns.length === 4) break;
        }
      }
    }

    let starredCount = 0;
    for (let i = 0; i < this.props.cards.length; i++) {
      const card = this.props.cards[i];
      if (card.starred) starredCount += 1;
    }

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
                <span>{this.state.remainingCards.length}</span>
                <p>REMAINING</p>
                <i className="fas fa-long-arrow-alt-down"></i>
              </div>
              <div className="learn-mastery">
                <span id={`learn-familiar-${this.state.familiarCards.length}`}>{this.state.familiarCards.length}</span>
                <div><p>FAMILIAR</p><i className="fas fa-check"></i></div>
                <i className="fas fa-long-arrow-alt-down"></i>
              </div>
              <div className="learn-mastery">
                <span id={`learn-mastery-${this.state.masteredCards.length}`}>{this.state.masteredCards.length}</span>
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
                      {starredCount > 0 ?
                        <>
                          <button onClick={this.handleStudyStarredChange("All").bind(this)} className={this.state.allCls} >All</button>
                          <button onClick={this.handleStudyStarredChange("Starred").bind(this)} className={this.state.starredCls}>Starred</button>
                        </>
                        :
                        <>
                          <button className="study-starred-disabled study-starred-disabled-left">All</button>
                          <button className="study-starred-disabled">Starred</button>
                        </>
                      }
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
                        <p onClick={this.resetProgress.bind(this)} >START OVER</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="learn-card">
          <div className="learn-card-inner">
            {this.state.allCards.length === this.state.masteredCards.length ? 
              <div className="learn-finished">
                <span>🏆</span>
                <h1>Congratulations, you've learned everything!</h1>
                <p>Keep reviewing your terms to make sure they stick</p>
                <button onClick={this.resetProgress.bind(this)} >Review</button>
                <Link to={`/${this.state.allCards[0].deckId}/flash-cards`}>Finish</Link>
              </div>
              :
            <>
            {/* for wrong answer */}
            {this.state.lastAnswer ?
              <div className="learn-wrong-answer">
                <div className="learn-wrong-answer-top">
                  <span>😕 Study this one!</span>
                  {this.state.lastQuestion.starred ?
                    <i onClick={this.unstarCard(this.state.lastQuestion).bind(this)} className="fas fa-star solid-star"></i> 
                      : <i onClick={this.starCard(this.state.lastQuestion).bind(this)} className="far fa-star hollow-star"></i>}
                </div>
                <div className="learn-wrong-answer-mid">
                  {this.state.optAnsType === "Term" ?
                  <>
                  {this.state.onCls === "options-selected" ?
                    <Say key={mcAns[0].id + 2000000} text={`${mcAns[0].definition}. ${mcAns[0].term}`} /> : ""}
                    <span>DEFINTION</span>
                    <div>
                      <p>{this.state.lastQuestion.definition}</p>
                      <SayButton
                        onClick={event => console.log(event)}
                        text={`${this.state.lastQuestion.definition}`}
                      >
                        <i className="fas fa-volume-up"></i>
                      </SayButton>
                    </div>
                    <span>CORRECT ANSWER</span>
                    <div>
                      <p>{this.state.lastQuestion.term}</p>
                      <SayButton
                        onClick={event => console.log(event)}
                        text={`${this.state.lastQuestion.term}`}
                      >
                        <i className="fas fa-volume-up"></i>
                      </SayButton>
                    </div>
                  </>
                  :
                  <>
                  {this.state.onCls === "options-selected" ?
                    <Say key={mcAns[0].id + 3000000} text={`${mcAns[0].term}. ${mcAns[0].definition}`} /> : ""}
                    <span>TERM</span>
                    <div>
                      <p>{this.state.lastQuestion.term}</p>
                      <SayButton
                        onClick={event => console.log(event)}
                        text={`${this.state.lastQuestion.term}`}
                      >
                        <i className="fas fa-volume-up"></i>
                      </SayButton>
                    </div>
                    <span>CORRECT ANSWER</span>
                    <div>
                      <p>{this.state.lastQuestion.definition}</p>
                      <SayButton
                        onClick={event => console.log(event)}
                        text={`${this.state.lastQuestion.definition}`}
                      >
                        <i className="fas fa-volume-up"></i>
                      </SayButton>
                    </div>
                  </>}
                </div>
                <div className="learn-wrong-answer-bottom">
                  <span>YOU SAID</span>
                  {this.state.optAnsType === "Term" ?
                  <div>
                    <p>{this.state.lastAnswer.term}</p>
                    <SayButton
                      onClick={event => console.log(event)}
                      text={`${this.state.lastAnswer.term}`}
                    >
                      <i className="fas fa-volume-up"></i>
                    </SayButton>
                  </div>
                  :
                  <div>
                    <p>{this.state.lastAnswer.definition}</p>
                    <SayButton
                      onClick={event => console.log(event)}
                      text={`${this.state.lastAnswer.definition}`}
                    >
                      <i className="fas fa-volume-up"></i>
                    </SayButton>
                  </div>}
                  <button onClick={this.resetDecks.bind(this)} >Continue</button>
                </div>
              </div>
              :
              <>
            <div className="learn-card-question">
              {this.state.optAnsType === "Term" ?
              <>
              {this.state.onCls === "options-selected" ?
                <Say key={mcAns[0].id} text={`${mcAns[0].definition}`} /> : ""}
              <p>{mcAns[0].definition}</p>
              <SayButton
                onClick={event => console.log(event)}
                text={`${mcAns[0].definition}`}
              >
                <i className="fas fa-volume-up"></i>
              </SayButton>
              </>
              :
              <>
              {this.state.onCls === "options-selected" ?
                <Say key={mcAns[0].id + 100000000} text={`${mcAns[0].term}`} /> : ""}
                <p>{mcAns[0].term}</p>
                <SayButton
                  onClick={event => console.log(event)}
                  text={`${mcAns[0].term}`}
                >
                  <i className="fas fa-volume-up"></i>
                </SayButton>
              </>}
            </div>
            <div className="learn-card-answers">
            
              {mcAns.length === 2 ?
              <>
                {this.state.mc1Correct ? 
                  <div className="learn-card-correct">
                    <p>Correct! <span>😀</span></p>
                  </div>
                  :
                  <div className="learn-card-answer" onClick={this.answerMultipleChoice(mcAns[this.state.twoArr[0]], 1).bind(this)}>
                    <p>{this.state.optAnsType === "Term" ? mcAns[this.state.twoArr[0]].term : mcAns[this.state.twoArr[0]].definition}</p>
                    <span className="learn-answer-circle">1</span>
                  </div>}
                {this.state.mc2Correct ?
                  <div className="learn-card-correct">
                    <p>Correct! <span>😀</span></p>
                  </div>
                  :
                  <div className="learn-card-answer" onClick={this.answerMultipleChoice(mcAns[this.state.twoArr[1]], 2).bind(this)}>
                    <p>{this.state.optAnsType === "Term" ? mcAns[this.state.twoArr[1]].term : mcAns[this.state.twoArr[1]].definition}</p>
                    <span className="learn-answer-circle">2</span>
                  </div>}
                </>
                : ""}
                {mcAns.length === 3 ?
                <>
                  {this.state.mc1Correct ?
                    <div className="learn-card-correct" >
                      <p>Correct! <span>😀</span></p>
                    </div>
                    :
                    <div className="learn-card-answer" onClick={this.answerMultipleChoice(mcAns[this.state.threeArr[0]], 1).bind(this)}>
                      <p>{this.state.optAnsType === "Term" ? mcAns[this.state.threeArr[0]].term : mcAns[this.state.threeArr[0]].definition}</p>
                      <span className="learn-answer-circle">1</span>
                    </div>}
                  {this.state.mc2Correct ?
                    <div className="learn-card-correct">
                      <p>Correct! <span>😀</span></p>
                    </div>
                    :
                    <div className="learn-card-answer" onClick={this.answerMultipleChoice(mcAns[this.state.threeArr[1]], 2).bind(this)}>
                      <p>{this.state.optAnsType === "Term" ? mcAns[this.state.threeArr[1]].term : mcAns[this.state.threeArr[1]].definition}</p>
                      <span className="learn-answer-circle">2</span>
                    </div>}
                  {this.state.mc3Correct ?
                    <div className="learn-card-correct">
                      <p>Correct! <span>😀</span></p>
                    </div>
                    :
                    <div className="learn-card-answer" onClick={this.answerMultipleChoice(mcAns[this.state.threeArr[2]], 3).bind(this)}>
                      <p>{this.state.optAnsType === "Term" ? mcAns[this.state.threeArr[2]].term : mcAns[this.state.threeArr[2]].definition}</p>
                      <span className="learn-answer-circle">3</span>
                    </div>}
                </> 
                : ""}
                {mcAns.length > 3 ?
                <>
                  {this.state.mc1Correct ?
                    <div className="learn-card-correct">
                      <p>Correct! <span>😀</span></p>
                    </div>
                    :
                    <div className="learn-card-answer" onClick={this.answerMultipleChoice(mcAns[this.state.fourArr[0]], 1).bind(this)}>
                      <p>{this.state.optAnsType === "Term" ? mcAns[this.state.fourArr[0]].term : mcAns[this.state.fourArr[0]].definition}</p>
                      <span className="learn-answer-circle">1</span>
                    </div>}
                
                  {this.state.mc2Correct ?
                    <div className="learn-card-correct">
                      <p>Correct! <span>😀</span></p>
                    </div>
                    :
                    <div className="learn-card-answer" onClick={this.answerMultipleChoice(mcAns[this.state.fourArr[1]], 2).bind(this)}>
                      <p>{this.state.optAnsType === "Term" ? mcAns[this.state.fourArr[1]].term : mcAns[this.state.fourArr[1]].definition}</p>
                      <span className="learn-answer-circle">2</span>
                    </div>}
                  {this.state.mc3Correct ?
                    <div className="learn-card-correct">
                      <p>Correct! <span>😀</span></p>
                    </div>
                    :
                    <div className="learn-card-answer" onClick={this.answerMultipleChoice(mcAns[this.state.fourArr[2]], 3).bind(this)}>
                      <p>{this.state.optAnsType === "Term" ? mcAns[this.state.fourArr[2]].term : mcAns[this.state.fourArr[2]].definition}</p>
                      <span className="learn-answer-circle">3</span>
                    </div>}
                  {this.state.mc4Correct ?
                    <div className="learn-card-correct">
                      <p>Correct! <span>😀</span></p>
                    </div>
                    :
                    <div className="learn-card-answer" onClick={this.answerMultipleChoice(mcAns[this.state.fourArr[3]], 4).bind(this)}>
                      <p>{this.state.optAnsType === "Term" ? mcAns[this.state.fourArr[3]].term : mcAns[this.state.fourArr[3]].definition}</p>
                      <span className="learn-answer-circle">4</span>
                    </div>}
                </> 
                : ""}
                
                
            </div>
              </>
            }
              </>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Learn;