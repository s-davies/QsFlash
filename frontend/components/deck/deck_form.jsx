// import React from 'react';

// class DeckForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = this.props.deck
//     }

//     handleTitleChange(e) {
//         this.setState({ title: e.currentTarget.value })
//     }

//     handleDescriptionChange(e) {
//         this.setState({ body: e.currentTarget.value })
//     }

//     handleSubmit(e) {
//         e.preventDefault();
//         this.props.action(this.state);
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit.bind(this)}>
//                 <h1>{this.props.formType}</h1>
//                 <input type="submit" value="Create" className="deck-form-submit-small"/>
//                 <input onChange={this.handleTitleChange.bind(this)} type="text" value={this.state.title} />
//                 <input onChange={this.handleDescriptionChange.bind(this)} type="text" value={this.state.description} />
//                 <input type="submit" value="Create" />
//             </form>
//         )
//     }
// }

// export default DeckForm;

import React from 'react';

class DeckForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: this.props.deck,
            cards: this.props.cards
        }
    }

    handleTitleChange(e) {
        this.setState({ title: e.currentTarget.value })
    }

    handleDescriptionChange(e) {
        this.setState({ body: e.currentTarget.value })
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
            debugger
            this.setState({ cards: newCardsArr })
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        let that = this;
        this.props.deckAction(this.state.deck).then(deck => {
            for (let i = 0; i < this.state.cards.length; i++) {
                const card = this.state.cards[i];
                card.deck_id = deck.id
                card.ord = i;
                if (card.title = "") {
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
                    <button value={this.formType === "Create Deck" ? "Create" : "Done"} />
                </header>
                <form>
                    <input onChange={this.handleTitleChange.bind(this)} type="text" value={this.state.deck.title} />
                    <input onChange={this.handleDescriptionChange.bind(this)} type="text" value={this.state.deck.description} /> 
                </form>
                {this.state.cards.map((card, index) => (
                    <div key={index}>
                        <form>
                            <h3>{index + 1}</h3>
                            <input onChange={this.handleTermChange(index).bind(this)} type="text" value={card.term} placeholder="Enter term" />
                            <input onChange={this.handleDefinitionChange(index).bind(this)} type="text" value={card.definition} placeholder="Enter definition" />
                        </form>
                        <button onClick={this.insertCard(index)}>+</button>
                    </div>
                ))}
                <button onClick={this.insertCard(this.state.cards.length - 1).bind(this)}>+ Add Card</button>
                <button onClick={this.handleSubmit.bind(this)} value={this.formType === "Create Deck" ? "Create" : "Done"} />
            </div>
        )
    }
}

export default DeckForm;