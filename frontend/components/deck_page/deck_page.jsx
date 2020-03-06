import React from 'react'
import { Link } from 'react-router-dom';

class DeckPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flipped: false,
            progress: null,
            deckStudy: null,
            setProgress: false
        }
        this.componentCleanup = this.componentCleanup.bind(this);
    }

    componentDidMount() {
        this.props.fetchDeck(this.props.match.params.deckId)
        this.props.fetchCards(this.props.match.params.deckId)
        if (this.state.setProgress === false) {
            this.props.fetchDeckStudy(this.props.match.params.deckId).then(() => this.setState({ progress: this.props.deckStudies[0].progress, deckStudy: this.props.deckStudies[0], setProgress: true }))
        } else {
            this.props.fetchDeckStudies(this.props.match.params.deckId)
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


    handleProgress(num) {
        return e => {
            let prg = this.state.progress + num
            if (prg === 0) {
                prg = this.props.cards.length;
            } else if (prg === this.props.cards.length + 1) {
                prg = 1;
            }
            this.setState({ progress: prg, flipped: false })
        }
        
    }

    handleFlip(e) {
        // debugger
        if (e.currentTarget.style.transform === "rotateX(180deg)") {
            e.currentTarget.style.transform = "rotateX(0deg)"
        } else {
            e.currentTarget.style.transform = "rotateX(180deg)";
        }
    }

    render() {
        if (this.props.cards.length === 0 || !this.props.deck || this.state.setProgress === false) return null;
        return (
            <div className="deck-page">
                <h1>{this.props.deck.title}</h1>
                <div className="deck-page-top">
                    <div className="deck-page-learn">
                        <h3>STUDY</h3>
                        <Link to="/" >
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
                                    <p>{this.props.cards[this.state.progress - 1].term}</p>
                                </div>
                                <div className="flip-card-back">
                                    <p>{this.props.cards[this.state.progress - 1].definition}</p>
                                </div>
                            </div>
                        </div>
                            
                        <div className="deck-page-card-next">
                            <div className="deck-page-card-switch">
                                <button onClick={this.handleProgress(-1).bind(this)} ><i className="fas fa-arrow-left"></i></button>
                                <label>{this.state.progress}/{this.props.cards.length}</label>
                                <button onClick={this.handleProgress(1).bind(this)}><i className="fas fa-arrow-right"></i></button>
                            </div>
                            <div className="tooltip-fullscreen">
                                <button className="fullscreen-button"><i className="fas fa-expand"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="deck-page-deck-options">
                    
                </div>
                <div className="deck-page-bottom">

                </div>
            </div>
            
        );
    }
}

export default DeckPage;