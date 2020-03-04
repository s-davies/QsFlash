import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

class DeckForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: this.props.deck,
            cards: this.props.cards
        }
    }

    componentDidMount() {
        if (this.props.formType === "Update Deck") {
            this.props.fetchCards(this.props.deck.id).then(cards => {
                let newCards = Object.values(cards.cards);
                let sortedCards = newCards.sort((a, b) => (a.order > b.order) ? 1 : -1)
                this.setState({ cards: sortedCards })
            })
        }
    }

    handleTitleChange(e) {
        let newDeck = Object.assign({}, this.state.deck);
        newDeck.title = e.currentTarget.value;
        this.setState({ deck: newDeck });
    }

    handleDescriptionChange(e) {
        let newDeck = Object.assign({}, this.state.deck);
        newDeck.description = e.currentTarget.value;
        this.setState({ deck: newDeck });
    }

    handleTermChange(index) {
        return e => {
            let newCardsArr = Object.assign([], this.state.cards);
            newCardsArr[index].term = e.currentTarget.value;
            this.setState({ cards: newCardsArr })
        };
    }

    handleDefinitionChange(index) {
        return e => {
            let newCardsArr = Object.assign([], this.state.cards);
            newCardsArr[index].definition = e.currentTarget.value;
            this.setState({ cards: newCardsArr })
        };
    }

    insertCard(index) {
        return e => {
            let leftCardsArr = Object.assign(
                [], 
                this.state.cards.slice(0, index + 1))
            let rightCardsArr = Object.assign(
                [],
                this.state.cards.slice(index + 1))
            leftCardsArr.push({ term: "", description: "", order: "", deckId: "" })
            let newCardsArr = leftCardsArr.concat(rightCardsArr)
            this.setState({ cards: newCardsArr })
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        let that = this;
        this.props.deckAction(this.state.deck).then(deck => {
            for (let i = 0; i < this.state.cards.length; i++) {
                const card = this.state.cards[i];
                let isOldCard = !!card.deckId
                card.deckId = deck.deck.id
                card.order = i + 1;
                if (!isOldCard) {
                    that.props.createCard(card);
                } else {
                    that.props.updateCard(card);
                }
                
            }
        });
        <Redirect to="/latest"/>
    }

    render() {
        return (
            <div className="create-forms">
                <div className="deck-form">
                    <header>
                        <h1>{this.props.formType === "Create Deck" ? "Create a new study deck" : "Edit study deck"}</h1>
                        <button className="teal" onClick={this.handleSubmit.bind(this)}>{this.props.formType === "Create Deck" ? "Create" : "Done"}</button>
                    </header>
                    <form className="deck-form-deck">
                        <input className="create-form-input" onChange={this.handleTitleChange.bind(this)} type="text" value={this.state.deck.title} placeholder="Enter a title, like “Ruby on Rails”"/>
                        <label className="create-form-label" >TITLE</label>
                        <input className="create-form-input" onChange={this.handleDescriptionChange.bind(this)} type="text" value={this.state.deck.description} placeholder="Add a description..."/> 
                        <label className="create-form-label">DESCRIPTION</label>
                    </form>
                    <div className="deck-form-options">
                        <div>
                            <label>{this.state.deck.visibility === "Everyone" ? "Visibile to everyone" : "Visible only to me"}</label>
                            <button className="deck-accessibility-button">Change</button>
                        </div>
                        {this.state.deck.visibility === "Everyone" || this.state.deck.visibility === "Certain classes" ?
                            <div>
                                <label>{this.state.deck.editability === "Certain classes" ? "Editable by certain classes" : "Only editable by me"}</label>
                                <button className="deck-accessibility-button">Change</button>
                            </div>
                            :
                            ""
                        }
                        <div className="tooltip">
                            <button className="deck-switch-button" ><i className="fas fa-sync-alt"></i></button>
                            <span className="tooltiptext">Flip terms and definitions</span>
                        </div>
                    </div>
                </div>

                <div className="card-forms">
                    {this.state.cards.map((card, index) => (
                        <div key={index} className="cards-wrapper">
                            <div className="card-form" key={index}>
                                <form>
                                    <div className="card-header">
                                        <h3>{index + 1}</h3>
                                        <div className="tooltip-trash">
                                            <button className="delete-card-button"><i className="fas fa-trash-alt"></i></button>
                                            <span className="tooltiptext-trash">Delete this card</span>
                                        </div>
                                        
                                    </div>
                                    <div className="card-form-fields">
                                        <div className="card-form-field">
                                            <input className="create-form-input" onChange={this.handleTermChange(index).bind(this)} type="text" value={this.state.cards[index].term || ""} placeholder="Enter term" />
                                            <label className="create-form-label" >TERM</label>
                                        </div>
                                        <div className="card-form-field">
                                            <input className="create-form-input" onChange={this.handleDefinitionChange(index).bind(this)} type="text" value={this.state.cards[index].definition || ""} placeholder="Enter definition" />
                                            <label className="create-form-label" >DEFINITION</label>
                                        </div>
                                    </div>
                                </form>
                                
                            </div>
                            <div className="visibility-div">
                                <button className="add-card-button" onClick={this.insertCard(index)}>+</button>
                            </div>
                        </div>
                    ))}
                    <div className="final-add-card">
                        <h3>{this.state.cards.length + 1}</h3>
                        <button  onClick={this.insertCard(this.state.cards.length - 1).bind(this)}>+ ADD CARD</button>
                        <h3></h3>
                    </div>
                    <button className="large-create-card teal" onClick={this.handleSubmit.bind(this)}>{this.props.formType === "Create Deck" ? "Create" : "Done"}</button>
                </div>
            </div>
        )
    }
}

export default DeckForm;