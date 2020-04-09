import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Textfit } from 'react-textfit';
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

class DeckPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flipped: false,
            progress: null,
            rating: null,
            deckStudy: null,
            setProgress: false,
            curTar: null,
            cls: "info-modal",
            deleteCls: "delete-modal",
            star1cls: null,
            star2cls: null,
            star3cls: null,
            star4cls: null,
            star5cls: null,
            redirect: null,
            sortType: "Your stats",
            allCls: "options-selected",
            starredCls: "options-unselected",
            loading: true,
            fetchedCards: false
        };
        this.componentCleanup = this.componentCleanup.bind(this);
    }

    componentDidMount() {
        const dId = this.props.match.params.deckId;
        this.props.fetchDeck(dId).then(() => this.props.fetchUsers())
        .then(() => this.props.fetchCards(dId)).then(() => {
            this.props.fetchCardStudies(dId).then(() => this.setState({fetchedCards: true}));
        });
        if (this.state.setProgress === false) {
            this.props.fetchDeckStudy(dId).then(() => this.setState({ rating: this.props.deckStudies[0].rating,  progress: this.props.deckStudies[0].progress, deckStudy: this.props.deckStudies[0], setProgress: true}, () => this.props.fetchDeckStudies(dId)))
        } else {
            // this.props.fetchDeckStudies(dId)
        }
        window.addEventListener('beforeunload', this.componentCleanup);
        

    }

    componentCleanup() {
        // whatever you want to do when the component is unmounted or page refreshes
        let newDeckStudy = this.state.deckStudy
        if (newDeckStudy) {
            newDeckStudy.progress = this.state.progress;
            newDeckStudy.rating = this.state.rating;
            this.props.updateDeckStudy(newDeckStudy)
        }
    }

    componentWillUnmount() {
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup);
    }


    showDeleteModal() {
        if (this.state.deleteCls === "delete-modal") {
            this.setState({ deleteCls: "delete-modal show-modal" })
        }
    }

    showForm(e) {
        if (this.state.cls === "info-modal") {
            this.setState({ cls: "info-modal show-modal" })
        }
    }

    hideForm(e) {
        if (e.target.className === "info-modal show-modal" ||
            e.target.className === "close-form") {
            this.setState({ cls: "info-modal" })
        } else if (e.target.className === "delete-modal show-modal" ||
            e.target.className === "delete-close-form") {
            this.setState({ deleteCls: "delete-modal" })
        }
    }


    handleProgress(num) {
        return e => {
            let prg = this.state.progress + num;
            if (prg === 0) {
                prg = this.props.cards.length;
            } else if (prg === this.props.cards.length + 1) {
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
            
            this.setState({ progress: prg, flipped: false });
            
        }
        
    }

    handleFlip(e) {
        if (e.currentTarget.style.transform === "rotateX(180deg)") {
            e.currentTarget.style.transition = "transform 0.6s"
            e.currentTarget.style.transform = "rotateX(0deg)"
        } else {
            e.currentTarget.style.transition = "transform 0.6s"
            e.currentTarget.style.transform = "rotateX(180deg)";
            if (this.state.curTar === null) {
                this.setState({curTar: e.currentTarget})
            }
        }
    }

    handleRating(num) {
        return e => {
            if (this.props.currentUser.id !== this.props.deck.ownerId) {
                let newDeckStudy = this.state.deckStudy;
                if (newDeckStudy) {
                    newDeckStudy.rating = num;
                    this.props.updateDeckStudy(newDeckStudy)
                        .then(() => this.props.fetchDeckStudies(this.props.match.params.deckId)
                            .then(() => {
                                this.setState({ rating: this.props.deckStudies[0].rating, deckStudy: this.props.deckStudies[0] })
                            }));
                }
                
            }
        };
    }

    handleDelete() {
        this.props.deleteDeck(this.props.deck.id);
        this.setState({redirect: "/latest"});
    }

    unhighlightStars() {
        if (this.props.creator.id !== this.state.deckStudy.studierId) {
            this.setState({ star1cls: null, star2cls: null, star3cls: null, star4cls: null, star5cls: null })
        }
    }

    highlightStars(num) {
        return e => {
            if (this.props.creator.id !== this.state.deckStudy.studierId) {
                switch (num) {
                    case 1:
                        this.setState({ star1cls: "fas fa-star rating-purple", star2cls: "far fa-star rating-purple", star3cls: "far fa-star rating-purple", star4cls: "far fa-star rating-purple", star5cls: "far fa-star rating-purple" })
                        break;
                    case 2:
                        this.setState({ star1cls: "fas fa-star rating-purple", star2cls: "fas fa-star rating-purple", star3cls: "far fa-star rating-purple", star4cls: "far fa-star rating-purple", star5cls: "far fa-star rating-purple" })
                        break;
                    case 3:
                        this.setState({ star1cls: "fas fa-star rating-purple", star2cls: "fas fa-star rating-purple", star3cls: "fas fa-star rating-purple", star4cls: "far fa-star rating-purple", star5cls: "far fa-star rating-purple" })
                        break;
                    case 4:
                        this.setState({ star1cls: "fas fa-star rating-purple", star2cls: "fas fa-star rating-purple", star3cls: "fas fa-star rating-purple", star4cls: "fas fa-star rating-purple", star5cls: "far fa-star rating-purple" })
                        break;
                    case 5:
                        this.setState({ star1cls: "fas fa-star rating-purple", star2cls: "fas fa-star rating-purple", star3cls: "fas fa-star rating-purple", star4cls: "fas fa-star rating-purple", star5cls: "fas fa-star rating-purple" })
                        break;
                    default:
                        break;
                }
            }
        }
    }

    //card methods
    handleSortingChange(e) {
        this.setState({sortType: e.target.value})
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

    starAll(cards) {
        return e => {
            for (let i = 0; i < cards.length; i++) {
                const card = cards[i];
                this.props.updateCardStudy({ id: card.cardStudyId, starred: true }).then(() => this.props.fetchCardStudies(card.deckId))
            }
        }
    }

    unstarAll(cards) {
        return e => {
            for (let i = 0; i < cards.length; i++) {
                const card = cards[i];
                this.props.updateCardStudy({ id: card.cardStudyId, starred: false }).then(() => this.props.fetchCardStudies(card.deckId))
            }
        }
    }

    starCard(card) {
        return e => {
            this.props.updateCardStudy({id: card.cardStudyId, starred: true}).then(() => this.props.fetchCardStudies(card.deckId) )
        }
    }

    unstarCard(card) {
        return e => {
            this.props.updateCardStudy({ id: card.cardStudyId, starred: false }).then(() => this.props.fetchCardStudies(card.deckId))
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.redirect} />
        }
        
        if (this.props.cards.length === 0 || !this.props.deck || this.props.creator === undefined || this.state.setProgress === false || this.state.fetchedCards === false) {
            return <div className="deck-page-top-wrapper">
                <ClipLoader
                    css={override}
                    size={150}
                    loading={this.state.loading}
                />
                </div>
        };

        if (this.props.creator.id !== this.props.currentUser.id && this.props.deck.visibility === "Just me") {
            return <Redirect push to="/latest" />
        }
        let cardStyles = {
            height: '250px',
            width: '410px',
        };
        
        let stars;
        const showRating = this.state.rating ? (Math.round(this.state.rating * 10) / 10).toFixed(1) : this.props.avgRating;
        const classColorName = this.state.rating ? "rating-stars rating-purple" : "rating-stars rating-yellow";
        if (showRating < 1) {
            stars = <div className={classColorName}>
                <i onClick={this.handleRating(1).bind(this)} onMouseOver={this.highlightStars(1).bind(this)} 
                    onMouseOut={this.unhighlightStars.bind(this)} 
                className={this.state.star1cls ? this.state.star1cls : "far fa-star"}></i>
                <i onClick={this.handleRating(2).bind(this)} onMouseOver={this.highlightStars(2).bind(this)} 
                    onMouseOut={this.unhighlightStars.bind(this)} 
                className={this.state.star2cls ? this.state.star2cls : "far fa-star"}></i>
                <i onClick={this.handleRating(3).bind(this)} onMouseOver={this.highlightStars(3).bind(this)} 
                    onMouseOut={this.unhighlightStars.bind(this)} 
                className={this.state.star3cls ? this.state.star3cls : "far fa-star"}></i>
                <i onClick={this.handleRating(4).bind(this)} onMouseOver={this.highlightStars(4).bind(this)} 
                    onMouseOut={this.unhighlightStars.bind(this)} 
                className={this.state.star4cls ? this.state.star4cls : "far fa-star"}></i>
                <i onClick={this.handleRating(5).bind(this)} onMouseOver={this.highlightStars(5).bind(this)} 
                    onMouseOut={this.unhighlightStars.bind(this)} 
                className={this.state.star5cls ? this.state.star5cls : "far fa-star"}></i>
            </div>
        } else if (showRating >= 1 && showRating < 1.5) {
            stars = <div className={classColorName}>
                <i onClick={this.handleRating(1).bind(this)} onMouseOver={this.highlightStars(1).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star1cls ? this.state.star1cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(2).bind(this)} onMouseOver={this.highlightStars(2).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star2cls ? this.state.star2cls : "far fa-star"}></i>
                <i onClick={this.handleRating(3).bind(this)} onMouseOver={this.highlightStars(3).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star3cls ? this.state.star3cls : "far fa-star"}></i>
                <i onClick={this.handleRating(4).bind(this)} onMouseOver={this.highlightStars(4).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star4cls ? this.state.star4cls : "far fa-star"}></i>
                <i onClick={this.handleRating(5).bind(this)} onMouseOver={this.highlightStars(5).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star5cls ? this.state.star5cls : "far fa-star"}></i>
            </div>
        } else if (showRating >= 1.5 && showRating < 2) {
            stars = <div className={classColorName}>
                <i onClick={this.handleRating(1).bind(this)} onMouseOver={this.highlightStars(1).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star1cls ? this.state.star1cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(2).bind(this)} onMouseOver={this.highlightStars(2).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star2cls ? this.state.star2cls : "fas fa-star-half-alt"}></i>
                <i onClick={this.handleRating(3).bind(this)} onMouseOver={this.highlightStars(3).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star3cls ? this.state.star3cls : "far fa-star"}></i>
                <i onClick={this.handleRating(4).bind(this)} onMouseOver={this.highlightStars(4).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star4cls ? this.state.star4cls : "far fa-star"}></i>
                <i onClick={this.handleRating(5).bind(this)} onMouseOver={this.highlightStars(5).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star5cls ? this.state.star5cls : "far fa-star"}></i>
            </div>
        } else if (showRating >= 2 && showRating < 2.5) {
            stars = <div className={classColorName}>
                <i onClick={this.handleRating(1).bind(this)} onMouseOver={this.highlightStars(1).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star1cls ? this.state.star1cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(2).bind(this)} onMouseOver={this.highlightStars(2).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star2cls ? this.state.star2cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(3).bind(this)} onMouseOver={this.highlightStars(3).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star3cls ? this.state.star3cls : "far fa-star"}></i>
                <i onClick={this.handleRating(4).bind(this)} onMouseOver={this.highlightStars(4).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star4cls ? this.state.star4cls : "far fa-star"}></i>
                <i onClick={this.handleRating(5).bind(this)} onMouseOver={this.highlightStars(5).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star5cls ? this.state.star5cls : "far fa-star"}></i>
            </div>
        } else if (showRating >= 2.5 && showRating < 3) {
            stars = <div className={classColorName}>
                <i onClick={this.handleRating(1).bind(this)} onMouseOver={this.highlightStars(1).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star1cls ? this.state.star1cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(2).bind(this)} onMouseOver={this.highlightStars(2).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star2cls ? this.state.star2cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(3).bind(this)} onMouseOver={this.highlightStars(3).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star3cls ? this.state.star3cls : "fas fa-star-half-alt"}></i>
                <i onClick={this.handleRating(4).bind(this)} onMouseOver={this.highlightStars(4).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star4cls ? this.state.star4cls : "far fa-star"}></i>
                <i onClick={this.handleRating(5).bind(this)} onMouseOver={this.highlightStars(5).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star5cls ? this.state.star5cls : "far fa-star"}></i>
            </div>
        } else if (showRating >= 3 && showRating < 3.5) {
            stars = <div className={classColorName}>
                <i onClick={this.handleRating(1).bind(this)} onMouseOver={this.highlightStars(1).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star1cls ? this.state.star1cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(2).bind(this)} onMouseOver={this.highlightStars(2).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star2cls ? this.state.star2cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(3).bind(this)} onMouseOver={this.highlightStars(3).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star3cls ? this.state.star3cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(4).bind(this)} onMouseOver={this.highlightStars(4).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star4cls ? this.state.star4cls : "far fa-star"}></i>
                <i onClick={this.handleRating(5).bind(this)} onMouseOver={this.highlightStars(5).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star5cls ? this.state.star5cls : "far fa-star"}></i>
            </div>
        } else if (showRating >= 3.5 && showRating < 4) {
            stars = <div className={classColorName}>
                <i onClick={this.handleRating(1).bind(this)} onMouseOver={this.highlightStars(1).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star1cls ? this.state.star1cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(2).bind(this)} onMouseOver={this.highlightStars(2).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star2cls ? this.state.star2cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(3).bind(this)} onMouseOver={this.highlightStars(3).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star3cls ? this.state.star3cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(4).bind(this)} onMouseOver={this.highlightStars(4).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star4cls ? this.state.star4cls : "fas fa-star-half-alt"}></i>
                <i onClick={this.handleRating(5).bind(this)} onMouseOver={this.highlightStars(5).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star5cls ? this.state.star5cls : "far fa-star"}></i>
            </div>
        } else if (showRating >= 4 && showRating < 4.5) {
            stars = <div className={classColorName}>
                <i onClick={this.handleRating(1).bind(this)} onMouseOver={this.highlightStars(1).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star1cls ? this.state.star1cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(2).bind(this)} onMouseOver={this.highlightStars(2).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star2cls ? this.state.star2cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(3).bind(this)} onMouseOver={this.highlightStars(3).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star3cls ? this.state.star3cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(4).bind(this)} onMouseOver={this.highlightStars(4).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star4cls ? this.state.star4cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(5).bind(this)} onMouseOver={this.highlightStars(5).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star5cls ? this.state.star5cls : "far fa-star"}></i>
            </div>
        } else if (showRating >= 4.5 && showRating < 5) {
            stars = <div className={classColorName}>
                <i onClick={this.handleRating(1).bind(this)} onMouseOver={this.highlightStars(1).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star1cls ? this.state.star1cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(2).bind(this)} onMouseOver={this.highlightStars(2).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star2cls ? this.state.star2cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(3).bind(this)} onMouseOver={this.highlightStars(3).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star3cls ? this.state.star3cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(4).bind(this)} onMouseOver={this.highlightStars(4).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star4cls ? this.state.star4cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(5).bind(this)} onMouseOver={this.highlightStars(5).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star5cls ? this.state.star5cls : "fas fa-star-half-alt"}></i>
            </div>
        } else {
            stars = <div className={classColorName}>
                <i onClick={this.handleRating(1).bind(this)} onMouseOver={this.highlightStars(1).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star1cls ? this.state.star1cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(2).bind(this)} onMouseOver={this.highlightStars(2).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star2cls ? this.state.star2cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(3).bind(this)} onMouseOver={this.highlightStars(3).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star3cls ? this.state.star3cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(4).bind(this)} onMouseOver={this.highlightStars(4).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star4cls ? this.state.star4cls : "fas fa-star"}></i>
                <i onClick={this.handleRating(5).bind(this)} onMouseOver={this.highlightStars(5).bind(this)}
                    onMouseOut={this.unhighlightStars.bind(this)}
                    className={this.state.star5cls ? this.state.star5cls : "fas fa-star"}></i>
            </div>
        } 

        let currentTime = new Date();
        const createdYear = this.props.deck.createdAt.slice(0, 4);
        let createdMonth = this.props.deck.createdAt.slice(5, 7);
        if (createdMonth[0] === "0") createdMonth = createdMonth.slice(1);
        let createdDay = this.props.deck.createdAt.slice(8, 10);
        if (createdDay[0] === "0") createdDay = createdDay.slice(1);
        const currentYear = currentTime.getFullYear().toString();
        const currentMonth = currentTime.getMonth().toString();
        const currentDay = currentTime.getDate().toString();
        let createdText;
        if (currentYear > createdYear) {
            if (currentYear - createdYear === 1) {
                createdText = <p>Created a year ago</p>
            } else {
                createdText = <p>Created {createdYear - currentYear} years ago</p>
            }
        } else if (currentMonth > createdMonth) {
            if (currentMonth - createdMonth === 1) {
                createdText = <p>Created a month ago</p>
            } else {
                createdText = <p>Created {createdMonth - currentMonth} months ago</p>
            }
        } else if (currentDay > createdDay) {
            if (currentDay - createdDay === 1) {
                createdText = <p>Created a day ago</p>
            } else {
                createdText = <p>Created {createdDay - currentDay} days ago</p>
            }
        } else {
            createdText = <p>Created today</p>
        }

        //setting groups
        let starred = 0;
        const usuallyMissed = [];
        let usuallyMissedStarCount = 0;
        const sometimesMissed = [];
        let sometimesMissedStarCount = 0;
        const rarelyMissed = [];
        let rarelyMissedStarCount = 0;
        let cards;
        let starredCards = [];
        if (this.state.sortType === "Your stats") {
            
            

            for (let i = 0; i < this.props.cards.length; i++) {
                const card = this.props.cards[i];
                if (this.state.starredCls === "options-selected") {
                    if (card.starred && card.correctnessCount < -1) {
                        usuallyMissed.push(card);
                    } else if (card.starred && card.correctnessCount > 1) {
                        rarelyMissed.push(card);
                    } else if (card.starred) {
                        sometimesMissed.push(card);
                    }
                } else {
                    if (card.correctnessCount < -1) {
                        usuallyMissed.push(card);
                    } else if (card.correctnessCount > 1) {
                        rarelyMissed.push(card);
                    } else {
                        sometimesMissed.push(card);
                    }
                }
                if (card.starred && card.correctnessCount < -1) {
                    usuallyMissedStarCount += 1;
                    starred += 1;
                } else if (card.starred && card.correctnessCount > 1) {
                    rarelyMissedStarCount += 1;
                    starred += 1;
                } else if (card.starred) {
                    sometimesMissedStarCount += 1;
                    starred += 1;
                }
            }
        } else if (this.state.sortType === "Original") {
            cards = Object.assign([], this.props.cards);
            for (let i = 0; i < this.props.cards.length; i++) {
                const card = this.props.cards[i];
                if (card.starred) {
                    starredCards.push(card);
                    starred += 1;
                }
            }
        } else if (this.state.sortType === "Alphabetical") {
            cards = Object.assign([], this.props.cards);
            cards.sort((card1, card2) => {
                if (card1.term > card2.term) return 1;
                if (card1.term < card2.term) return -1;
            })
            for (let i = 0; i < this.props.cards.length; i++) {
                const card = this.props.cards[i];
                if (card.starred) {
                    starredCards.push(card);
                    starred += 1;
                }
            }
            starredCards.sort((card1, card2) => {
                if (card1.term > card2.term) return 1;
                if (card1.term < card2.term) return -1;
            })
        }
        
        return (
            <div className="deck-page">
                <div className="deck-page-top-wrapper">
                    <div className="deck-page-top-wrapper-inner">
                        <header className="deck-page-header">
                            <h1>{this.props.deck.title}</h1>
                            <div className="rating-div">
                                {this.props.avgRating !== 0 ? <span>{showRating}</span> : this.props.creator.id === this.props.currentUser.id ? "" : <span>Leave the first rating</span> }
                                {stars}
                                <p>{this.props.numRatings === 0 ? this.props.currentUser.id === this.props.creator.id ? "No Reviews" : "" : this.state.rating ? "Your Review" : this.props.numRatings === 1 ? "1 Review" : `${this.props.numRatings} Reviews`}</p>
                            </div>
                        </header>
                        <div className="deck-page-top">
                            <div className="deck-page-learn">
                                <h3>STUDY</h3>
                                <Link to={`/${this.props.deck.id}/study`} >
                                    <i className="fab fa-buffer"></i>
                                    <label>Flashcards</label>
                                </Link>
                                <Link to={`/${this.props.deck.id}/learn`} >
                                    <i className="fas fa-brain"></i>
                                    <label>Learn</label>
                                </Link>
                                <Link to="/" >
                                    <i className="fas fa-pencil-alt"></i>
                                    <label>Write</label>
                                </Link>
                                <Link to={`/${this.props.deck.id}/spell`} >
                                    <i className="fas fa-volume-up"></i>
                                    <label>Spell</label>
                                </Link>
                                <Link to="/" >
                                    <i className="far fa-file-alt"></i>
                                    <label>Test</label>
                                </Link>
                                <h3>PLAY</h3>
                                <Link to="/" >
                                    <i className="far fa-clone"></i>
                                    <label>Match</label>
                                </Link>
                                <Link to="/" >
                                    <i className="fas fa-meteor"></i>
                                    <label>Gravity</label>
                                </Link>
                            </div>
                            <div className="deck-page-flip">
                                
                                
                                <div className="flip-card">
                                    <div onClick={this.handleFlip.bind(this)} className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <Textfit mode="multi" style={cardStyles}>
                                            <p>{this.props.cards[this.state.progress - 1].term}</p>
                                            </Textfit>
                                        </div>
                                        <div className="flip-card-back" >
                                            <Textfit mode="multi" style={cardStyles}>
                                            <p>{this.props.cards[this.state.progress - 1].definition}</p>
                                            </Textfit>
                                        </div>
                                    </div>
                                </div>
                                    
                                <div className="deck-page-card-next">
                                    <div className="deck-page-card-empty"></div>
                                    <div className="deck-page-card-switch">
                                        <button onClick={this.handleProgress(-1).bind(this)} ><i className="fas fa-arrow-left"></i></button>
                                        <label>{this.state.progress}/{this.props.cards.length}</label>
                                        <button onClick={this.handleProgress(1).bind(this)}><i className="fas fa-arrow-right"></i></button>
                                    </div>
                                    <div className="tooltip-options">
                                        <button className="fullscreen-button"><i className="fas fa-expand"></i></button>
                                        <span className="tooltiptext-fullscreen">Fullscreen</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="deck-page-deck-options">
                            <div className="deck-options-left">
                                <div className="created-by">
                                    <h4>Created by</h4>
                                    <Link to={`/${this.props.creator.id}/created`}><h3>{this.props.creator.username}</h3></Link>
                                </div>
                                <p>{this.props.deck.description}</p>
                            </div>
                            <div className="deck-options-right">
                                <div className="tooltip-options">
                                    <i className="fas fa-plus"></i>
                                    <span className="tooltiptext-plus">Add set to class or folder</span>
                                </div>
                                {this.props.creator.id === this.props.currentUser.id ? 
                        
                                <Link to={`/${this.props.deck.id}/edit`}>
                                    <div className="tooltip-options">
                                        <i className="fas fa-pen"></i>
                                        <span className="tooltiptext-pen">Edit</span>
                                    </div>
                                </Link> : "" }
                                <div onClick={this.showForm.bind(this)} className="tooltip-options">
                                    <i className="fas fa-info"></i>
                                    <span className="tooltiptext-info">Info</span>
                                </div>
                                <div className="info-dropdown">
                                    <i className="fas fa-ellipsis-h info-dropbtn"></i>
                                    <div className="info-dropdown-content">
                                        <span className="copy-link"><i className="far fa-copy"></i><p>Customize</p></span>
                                        <span className="trophy-link"><i className="fas fa-trophy"></i><p>Scores</p></span>
                                        <span className="object-link"><i className="far fa-object-group"></i><p>Combine</p></span>
                                        {this.props.creator.id === this.props.currentUser.id ? 
                                        <span className="trash-link" onClick={this.showDeleteModal.bind(this)}><i className="fas fa-trash-alt"></i><p>Delete</p></span> : "" }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div onClick={this.hideForm.bind(this)} className={this.state.cls}>
                            <div className='info-div-box'>
                                <div className="info-banner">
                                    <h1 className="form-title">Info</h1>
                                    <div onClick={this.hideForm.bind(this)} className="close-form">X</div>
                                </div>
                                <div className="info-modal-top">
                                    <div className="info-modal-main">
                                        <Link to={`/${this.props.creator.id}/created`}>{this.props.creator.username}</Link>
                                        {createdText}
                                    </div>
                                    <div className="info-modal-description">
                                        <h2>DESCRIPTION</h2>
                                        <p>{this.props.deck.description}</p>
                                    </div>
                                    <div className="info-modal-boxes">
                                        <div className="info-modal-box">
                                            <h1>{this.props.deckStudies.length}</h1>
                                            <h3>{this.props.deckStudies.length === 1 ? "STUDIER" : "STUDIERS"}</h3>
                                        </div>
                                        <div className="info-modal-box">
                                            <h1>1</h1>
                                            <h3>CLASS</h3>
                                        </div>
                                        <div className="info-modal-box">
                                            <h1>1</h1>
                                            <h3>FOLDER</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="info-modal-bottom">
                                    <div className="info-modal-visibility">
                                        <p className="info-modal-vp">VIEWABLE BY</p>
                                        <p>{this.props.deck.visibility}</p>
                                    </div>
                                    <div className="info-modal-editability">
                                        <p className="info-modal-vp">EDITABLE BY</p>
                                        <p>{this.props.creator.username}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div onClick={this.hideForm.bind(this)} className={this.state.deleteCls}>
                            <div className='delete-div-box'>
                                <div className="delete-banner">
                                    <h1 className="form-title">Delete this deck?</h1>
                                    <div onClick={this.hideForm.bind(this)} className="delete-close-form">X</div>
                                </div>
                                <div className="delete-content">
                                    <h1>{this.props.deck.title}</h1>
                                    <p>You are about to delete this deck and all of its data. No one will be able to access this deck ever again.</p>
                                    <strong>Are you absolutely positive? There's no undo.</strong>
                                    <div className="delete-buttons">
                                        <button onClick={this.hideForm.bind(this)} className="cancel-button">Cancel</button>
                                        <button onClick={this.handleDelete.bind(this)} className="delete-deck-button">Yes, delete deck</button>
                                    </div>
                                </div>
                            </div> 
                        </div> 
                    </div>
                </div>
                <div className="deck-page-bottom-wrapper">
                    <div className="deck-page-bottom-wrapper-inner">

                            <div className="deck-page-bottom">
                                <header className="deck-page-cards-header">
                                    <span>Terms in this set ({this.props.cards.length})</span>
                                    <div>
                                        <div className="options-radio-div">
                                            <div>
                                                <button onClick={this.handleStudyStarredChange("All").bind(this)} className={this.state.allCls} >All</button>
                                                <button onClick={this.handleStudyStarredChange("Starred").bind(this)} className={this.state.starredCls}>Starred ({starred})</button>
                                            </div>
                                        </div>
                                        <div id="deck-page-select" className="options-audio-div options-field">
                                            <select value={this.state.sortType} onChange={this.handleSortingChange.bind(this)}>
                                                <option value="Your stats">
                                                    Your stats
                                                </option>
                                                <option value="Original">
                                                    Original
                                                </option>
                                                <option value="Alphabetical">
                                                    Alphabetical
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </header>
                                {this.state.sortType !== "Your stats" ?
                                <>
                                    {this.state.starredCls === "options-selected" ?
                                    starredCards.map(card => (
                                            <div key={card.id} className="deck-info-card">
                                                <label>{card.correctnessCount >= 0 ? `+${card.correctnessCount}` : card.correctnessCount}</label>
                                                <p>{card.term}</p>
                                                <section></section>
                                                <p>{card.definition}</p>
                                                <div>
                                                    {card.starred ? <i onClick={this.unstarCard(card).bind(this)} className="fas fa-star solid-star"></i> : <i onClick={this.starCard(card).bind(this)} className="far fa-star hollow-star"></i>}
                                                    <SayButton
                                                        onClick={event => console.log(event)}
                                                        text={`${card.term}`}
                                                    >
                                                        <i className="fas fa-volume-up"></i>
                                                    </SayButton>
                                                </div>
                                            </div>
                                        ))
                                    
                                    :
                                        
                                            cards.map(card => (
                                                <div key={card.id} className="deck-info-card">
                                                    <label>{card.correctnessCount >= 0 ? `+${card.correctnessCount}` : card.correctnessCount}</label>
                                                    <p>{card.term}</p>
                                                    <section></section>
                                                    <p>{card.definition}</p>
                                                    <div>
                                                        {card.starred ? <i onClick={this.unstarCard(card).bind(this)} className="fas fa-star solid-star"></i> : <i onClick={this.starCard(card).bind(this)} className="far fa-star hollow-star"></i>}
                                                        <SayButton
                                                            onClick={event => console.log(event)}
                                                            text={`${card.term}`}
                                                        >
                                                            <i className="fas fa-volume-up"></i>
                                                        </SayButton>
                                                    </div>
                                                </div>
                                            ))
                                        
                                    }
                                </>
                                    :
                                <>
                                {usuallyMissed.length > 0 ?
                                    <div className="usually-missed deck-page-missed">
                                        <header className="usually-missed-header">
                                            <div>
                                                <span>Usually Missed</span>
                                                <p>Your answers for these terms have usually been incorrect.</p>
                                            </div>
                                            {usuallyMissedStarCount === usuallyMissed.length ? 
                                            <button id="all-starred-1" onClick={this.unstarAll(usuallyMissed).bind(this)}><i className="fas fa-star"></i>Unstar All</button>
                                            :
                                            <button onClick={this.starAll(usuallyMissed).bind(this)}><i className="far fa-star" ></i>Star All</button>
                                            }
                                        </header>
                                        {usuallyMissed.map(card => (
                                            <div key={card.id} className="deck-info-card">
                                                <label>{card.correctnessCount >= 0 ? `+${card.correctnessCount}` : card.correctnessCount}</label>
                                                <p>{card.term}</p>
                                                <section></section>
                                                <p>{card.definition}</p>
                                                <div>
                                                    {card.starred ? <i onClick={this.unstarCard(card).bind(this)} className="fas fa-star solid-star"></i> : <i onClick={this.starCard(card).bind(this)} className="far fa-star hollow-star"></i>}
                                                    <SayButton
                                                        onClick={event => console.log(event)}
                                                        text={`${card.term}`}
                                                    >
                                                        <i className="fas fa-volume-up"></i>
                                                    </SayButton>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    : ""
                                }
                                {sometimesMissed.length > 0 ?
                                <div className="sometimes-missed deck-page-missed">
                                        <header className="sometimes-missed-header">
                                            <div>
                                                <span>Sometimes Missed</span>
                                                <p>Your answers for these terms have sometimes been correct.</p>
                                            </div>
                                        {sometimesMissedStarCount === sometimesMissed.length ?
                                            <button id="all-starred-2" onClick={this.unstarAll(sometimesMissed).bind(this)}><i className="fas fa-star"></i>Unstar All</button>
                                            :
                                            <button onClick={this.starAll(sometimesMissed).bind(this)}><i className="far fa-star" ></i>Star All</button>
                                        }
                                        </header>
                                        {sometimesMissed.map(card => (
                                            <div key={card.id} className="deck-info-card">
                                                <label>{card.correctnessCount >= 0 ? `+${card.correctnessCount}` : card.correctnessCount}</label>
                                                <p>{card.term}</p>
                                                <section></section>
                                                <p>{card.definition}</p>
                                                <div>
                                                    {card.starred ? <i onClick={this.unstarCard(card).bind(this)} className="fas fa-star solid-star"></i> : <i onClick={this.starCard(card).bind(this)} className="far fa-star hollow-star"></i>}
                                                    <SayButton
                                                        onClick={event => console.log(event)}
                                                        text={`${card.term}`}
                                                    >
                                                        <i className="fas fa-volume-up"></i>
                                                    </SayButton>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    : ""
                                }
                                {rarelyMissed.length > 0 ?
                                <div className="rarely-missed deck-page-missed">
                                        <header className="rarely-missed-header">
                                            <div>
                                                <span>Rarely Missed</span>
                                                <p>Your answers for these terms have usually been correct!</p>
                                            </div>
                                        {rarelyMissedStarCount === rarelyMissed.length ?
                                            <button id="all-starred-3" onClick={this.unstarAll(rarelyMissed).bind(this)}><i className="fas fa-star"></i>Unstar All</button>
                                            :
                                            <button onClick={this.starAll(rarelyMissed).bind(this)}><i className="far fa-star" ></i>Star All</button>
                                        }
                                        </header>
                                        {rarelyMissed.map(card => (
                                            <div key={card.id} className="deck-info-card">
                                                <label>{card.correctnessCount >= 0 ? `+${card.correctnessCount}` : card.correctnessCount}</label>
                                                <p>{card.term}</p>
                                                <section></section>
                                                <p>{card.definition}</p>
                                                <div>
                                                    {card.starred ? <i onClick={this.unstarCard(card).bind(this)} className="fas fa-star solid-star"></i> : <i onClick={this.starCard(card).bind(this)} className="far fa-star hollow-star"></i>}
                                                    <SayButton
                                                        onClick={event => console.log(event)}
                                                        text={`${card.term}`}
                                                    >
                                                        <i className="fas fa-volume-up"></i>
                                                    </SayButton>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    : ""
                                }
                                </>}
                                <Link to={`/${this.props.deck.id}/edit`}>Add or Remove Terms</Link>
                            </div>
                        </div>
                    </div>
                </div>
            
        );
    }
}

export default DeckPage;