import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Textfit } from 'react-textfit';

class DeckPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flipped: false,
            progress: null,
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
            redirect: null
        };
        this.componentCleanup = this.componentCleanup.bind(this);
    }

    componentDidMount() {
        const dId = this.props.match.params.deckId;
        this.props.fetchDeck(dId).then(() => this.props.fetchUsers());
        this.props.fetchCards(dId);
        if (this.state.setProgress === false) {
            this.props.fetchDeckStudy(dId).then(() => this.setState({ progress: this.props.deckStudies[0].progress, deckStudy: this.props.deckStudies[0], setProgress: true }, () => this.props.fetchDeckStudies(dId)))
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
            if (this.props.currentUser.id !== this.state.deckStudy.studierId) {
                let newDeckStudy = this.state.deckStudy
                if (newDeckStudy) {
                    newDeckStudy.rating = num;
                    this.props.updateDeckStudy(newDeckStudy);
                }
            }
        }
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

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.redirect} />
        }
        if (this.props.cards.length === 0 || !this.props.deck || this.props.creator === undefined || this.state.setProgress === false) return null;
        let cardStyles = {
            height: '250px',
            width: '410px',
        };
        let stars;
        const showRating = this.state.deckStudy.rating ? (Math.round(this.state.deckStudy.rating * 10) / 10).toFixed(1) : this.props.avgRating;
        const classColorName = this.state.deckStudy.rating ? "rating-stars rating-purple" : "rating-stars rating-yellow";
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
                createdText = <p>Created {currentYear - createdYear} years ago</p>
            }
        } else if (currentMonth > createdMonth) {
            if (currentMonth - createdMonth === 1) {
                createdText = <p>Created a month ago</p>
            } else {
                createdText = <p>Created {currentMonth - createdMonth} months ago</p>
            }
        } else if (currentDay > createdDay) {
            if (currentDay - createdDay === 1) {
                createdText = <p>Created a day ago</p>
            } else {
                createdText = <p>Created {currentDay - createdDay} days ago</p>
            }
        } else {
            createdText = <p>Created today</p>
        }
        return (
            <div className="deck-page">
                <header className="deck-page-header">
                    <h1>{this.props.deck.title}</h1>
                    <div className="rating-div">
                        {this.props.avgRating !== 0 ? <span>{showRating}</span> : this.props.creator.id === this.props.currentUser.id ? "" : <span>Leave the first rating</span> }
                        {stars}
                        <p>{this.props.numRatings === 0 ? this.props.currentUser.id === this.props.creator.id ? "No Reviews" : "" : this.props.numRatings === 1 ? "1 Review" : `${this.props.numRatings} Reviews`}</p>
                    </div>
                </header>
                <div className="deck-page-top">
                    <div className="deck-page-learn">
                        <h3>STUDY</h3>
                        <Link to={`/${this.props.deck.id}/learn`} >
                            <i className="fab fa-buffer"></i>
                            <label>Flashcards</label>
                        </Link>
                        <Link to="/" >
                            <i className="fas fa-brain"></i>
                            <label>Learn</label>
                        </Link>
                        <Link to="/" >
                            <i className="fas fa-pencil-alt"></i>
                            <label>Write</label>
                        </Link>
                        <Link to="/" >
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
                            <h3>{this.props.creator.username}</h3>
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
                                <Link to="/">{this.props.creator.username}</Link>
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
                <div className="deck-page-bottom">

                </div>
            </div>
            
        );
    }
}

export default DeckPage;