import React from 'react'
import { Link } from 'react-router-dom';
import { Textfit } from 'react-textfit';

class DeckPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flipped: false,
            progress: null,
            deckStudy: null,
            setProgress: false,
            curTar: null
        };
        this.componentCleanup = this.componentCleanup.bind(this);
    }

    componentDidMount() {
        const dId = this.props.match.params.deckId;
        this.props.fetchDeck(dId).then(() => this.props.fetchUsers());
        this.props.fetchCards(dId);
        if (this.state.setProgress === false) {
            this.props.fetchDeckStudy(dId).then(() => this.setState({ progress: this.props.deckStudies[0].progress, deckStudy: this.props.deckStudies[0], setProgress: true }))
        } else {
            this.props.fetchDeckStudies(dId)
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
            let prg = this.state.progress + num;
            if (prg === 0) {
                prg = this.props.cards.length;
            } else if (prg === this.props.cards.length + 1) {
                prg = 1;
            }
            if (this.state.curTar.style.transform === "rotateX(180deg)") {
                this.state.curTar.style.transition = "transform 0s";
                this.state.curTar.style.transform = "rotateX(0deg)"
            }
            this.setState({ progress: prg, flipped: false });
            
        }
        
    }

    handleFlip(e) {
        // debugger
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

    render() {
        if (this.props.cards.length === 0 || !this.props.deck || this.props.creator === undefined || this.state.setProgress === false) return null;
        let cardStyles = {
            height: '250px',
            width: '410px',
        };
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
                            <div className="tooltip-fullscreen">
                                <button className="fullscreen-button"><i className="fas fa-expand"></i></button>
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
                        <div className="tooltip-options">
                            <i className="fas fa-pen"></i>
                            <span className="tooltiptext-pen">Edit</span>
                        </div>
                        <div className="tooltip-options">
                            <i className="fas fa-info"></i>
                            <span className="tooltiptext-info">Info</span>
                        </div>
                       
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                <div className="deck-page-bottom">

                </div>
            </div>
            
        );
    }
}

export default DeckPage;