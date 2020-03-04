import React from 'react';

class DeckForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: this.props.deck,
            cards: this.props.cards
        }
    }

    componentDidMount() {
        if (this.props.deckId) {
            this.props.fetchCards(this.props.deckId).then(cards => {
                this.setState({ cards: Object.values(cards.cards) })
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
    }

    render() {
        return (
            <div>
                <header>
                    <h1>{this.props.formType}</h1>
                    <button onClick={this.handleSubmit.bind(this)}>{this.props.formType === "Create Deck" ? "Create" : "Done"}</button>
                </header>
                <form>
                    <input onChange={this.handleTitleChange.bind(this)} type="text" value={this.state.deck.title} placeholder="Enter a title, like “Ruby on Rails”"/>
                    <input onChange={this.handleDescriptionChange.bind(this)} type="text" value={this.state.deck.description} placeholder="Add a description..."/> 
                </form>
                {this.state.cards.map((card, index) => (
                    <div key={index}>
                        <form>
                            <h3>{index + 1}</h3>
                            <input onChange={this.handleTermChange(index).bind(this)} type="text" value={this.state.cards[index].term || ""} placeholder="Enter term" />
                            <input onChange={this.handleDefinitionChange(index).bind(this)} type="text" value={this.state.cards[index].definition || ""} placeholder="Enter definition" />
                        </form>
                        <button onClick={this.insertCard(index)}>+</button>
                    </div>
                ))}
                <button onClick={this.insertCard(this.state.cards.length - 1).bind(this)}>+ Add Card</button>
                <button onClick={this.handleSubmit.bind(this)}>{this.props.formType === "Create Deck" ? "Create" : "Done"}</button>
            </div>
        )
    }
}

export default DeckForm;