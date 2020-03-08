import React from 'react';
import {
    Redirect,
} from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from 'react-uuid'
const { createRef, useState, useEffect } = React


function Header({ children, sticky = false, className, ...rest }) {
    const [isSticky, setIsSticky] = useState(false)
    const ref = React.createRef()

    // mount 
    useEffect(() => {
        const cachedRef = ref.current,
            observer = new IntersectionObserver(
                ([e]) => setIsSticky(e.intersectionRatio < 1),
                { threshold: [1] }
            )

        observer.observe(cachedRef)

        // unmount
        return function () {
            observer.unobserve(cachedRef)
        }
    }, [])

    return (
        <header className={className + (isSticky ? " isSticky" : "")} ref={ref} {...rest}>
            {children}
        </header>
    )
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

class DeckForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: this.props.deck,
            cards: this.props.cards,
            cls: "accessibility-modal",
            tempVis: this.props.deck.visibility,
            tempEdit: this.props.deck.editability,
            redirect: null,
            errors: [],
            removedCards: []
        }
    }

    componentDidMount() {
        if (this.props.formType === "Update Deck") {
            this.props.fetchCards(this.props.deck.id).then(cards => {
                let newCards = Object.values(cards.cards);
                let sortedCards = newCards.sort((a, b) => (a.order > b.order) ? 1 : -1)
                for (let i = 0; i < sortedCards.length; i++) {
                    const card = sortedCards[i];
                    card.uId = card.uId || uuid();
                }
                this.setState({ cards: sortedCards })
            })
        }
        window.addEventListener('beforeunload', this.componentCleanup);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const cards = reorder(
            this.state.cards,
            result.source.index,
            result.destination.index
        );
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            card.order = i + 1;
        }
        this.setState({
            cards
        });
    }

    showForm() {
        if (this.state.cls === "accessibility-modal") {
            this.setState({ cls: "accessibility-modal show-modal" })
        } else {
            this.setState({ cls: "accessibility-modal" })
        }
    }

    hideForm(e) {
        if (e.target.className === "accessibility-modal show-modal" ||
            e.target.className === "close-form") {
            this.setState({ tempVis: this.state.deck.visibility, tempEdit: this.state.deck.editability, cls: "accessibility-modal" })
        }
    }

    hideFormOnSave() {
        this.setState({ tempVis: this.state.deck.visibility, tempEdit: this.state.deck.editability, cls: "accessibility-modal" })
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

    handleVisibilityChange(e) {
        if (e.target.value === "Just me") {
            this.setState({ tempVis: e.target.value, tempEdit: e.target.value });
        } else {
            this.setState({ tempVis: e.target.value });
        }
    }

    handleEditabilityChange(e) {
        this.setState({ tempEdit: e.target.value });
    }

    handleAccessibilityChange() {
        let newDeck = Object.assign({}, this.state.deck);
        newDeck.visibility = this.state.tempVis;
        newDeck.editability = this.state.tempEdit;
        this.setState({ deck: newDeck }, this.hideFormOnSave.bind(this));
    }

    flipTermsAndDefs() {
        let newCards = [];
        for (let i = 0; i < this.state.cards.length; i++) {
            const card = this.state.cards[i];
            let dupCard = Object.assign({}, card);
            [dupCard.term, dupCard.definition] = [dupCard.definition, dupCard.term];
            newCards.push(dupCard);
        }
        this.setState({ cards: newCards });
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
            leftCardsArr.push({ term: "", definition: "", order: "", deckId: "" })
            let newCardsArr = leftCardsArr.concat(rightCardsArr)
            this.setState({ cards: newCardsArr })
        };
    }

    removeCard(index) {
        return e => {
            let leftCardsArr = Object.assign(
                [],
                this.state.cards.slice(0, index))
            let rightCardsArr = Object.assign(
                [],
                this.state.cards.slice(index + 1))
            let newCardsArr = leftCardsArr.concat(rightCardsArr)
            let remCards = Object.assign([], this.state.removedCards);
            if (this.state.cards[index].id) {
                remCards.push(this.state.cards[index]);
            }
            this.setState({ cards: newCardsArr, removedCards: remCards })
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        let allErrors = [];
        if (this.state.deck.title === "") {
            allErrors.push("A TITLE")
        }
        let filledInCards = [];
        for (let i = 0; i < this.state.cards.length; i++) {
            const card = this.state.cards[i];
            if (card.term.length > 0 || card.definition.length > 0) {
                filledInCards.push(card)
            }
        }
        if (filledInCards.length < 2) {
            allErrors.push("AT LEAST TWO CARDS")
        }
        if (allErrors.length === 0) {
            let that = this;
            this.state.deck.cardCount = filledInCards.length;
            this.props.deckAction(this.state.deck).then(deck => {
                for (let i = 0; i < filledInCards.length; i++) {
                    const card = filledInCards[i];
                    let isOldCard = !!card.deckId
                    card.deckId = deck.deck.id
                    card.order = i + 1;
                    if (!isOldCard) {
                        that.props.createCard(card);
                    } else {
                        that.props.updateCard(card);
                    }

                }
                this.setState({ redirect: `/${deck.deck.id}/flash-cards` })
            })
            for (let i = 0; i < this.state.removedCards.length; i++) {
                const card = this.state.removedCards[i];
                this.props.deleteCard(card.id);
            }
            
        } else {
            this.setState({errors: allErrors});
        }
    }

    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        
        
        return (
            <div className="create-forms">
                <Header className="deck-form-header">
                    <h1>{this.props.formType === "Create Deck" ? "Create a new study deck" : "Edit study deck"}</h1>
                    <button className="teal" onClick={this.handleSubmit.bind(this)}>{this.props.formType === "Create Deck" ? "Create" : "Done"}</button>
                </Header>
            <div className="deck-form">
                <div onClick={this.hideForm.bind(this)} className={this.state.cls}>
                    <form onSubmit={this.handleAccessibilityChange.bind(this)} className='accessibility-form-box'>
                        <div className="accessibility-banner">
                            <h1 className="form-title">Options</h1>
                            <div onClick={this.hideForm.bind(this)} className="close-form">X</div>
                        </div>
                        <div className="accessibility-form">
                            <div className="accessibility-fields">
                                <div className="accessibility-field">
                                    <label>VISIBLE TO</label>
                                    <select value={this.state.tempVis} onChange={this.handleVisibilityChange.bind(this)}>
                                        <option value="Everyone">
                                            Everyone
                                            </option>
                                        <option value="Certain classes">Certain classes</option>
                                        <option value="Just me">Just me</option>
                                    </select>
                                    <span>{this.state.tempVis === "Everyone" ? "All QsFlash! users can see this deck" : this.state.tempVis === "Certain classes" ? "Only members of these classes can use this deck" : "Only you can view this deck"}</span>
                                </div>
                                <div className="accessibility-field">
                                    <label>EDITABLE BY</label>
                                    <select value={this.state.tempEdit} onChange={this.handleEditabilityChange.bind(this)}>
                                        <option value="Certain classes">Certain classes</option>
                                        <option value="Just me">Just me</option>
                                    </select>
                                    <span>{this.state.tempEdit === "Certain classes" ? "Only members of these classes can edit this deck" : "Only you can edit this deck"}</span>
                                </div>
                            </div>
                            <input className="accessibility-submit" type="submit" value="Save" />
                        </div>
                    </form>
                </div>
                
                <form className="deck-form-deck">
                    <input className="create-form-input" onChange={this.handleTitleChange.bind(this)} type="text" value={this.state.deck.title} placeholder="Enter a title, like “Ruby on Rails”" />
                    {this.state.errors.includes("A TITLE") ?
                    <label className="create-form-label errors" >PLEASE ENTER A TITLE TO SUBMIT YOUR DECK</label>
                    : <label className="create-form-label" >TITLE</label>}
                    <input className="create-form-input" onChange={this.handleDescriptionChange.bind(this)} type="text" value={this.state.deck.description} placeholder="Add a description..." />
                    <label className="create-form-label">DESCRIPTION</label>
                </form>
                <div className="deck-form-options">
                    <div>
                        <label>{this.state.deck.visibility === "Everyone" ? "Visibile to everyone" : this.state.deck.visibility === "Certain classes" ? "Visible to certain classes" : "Visible only to me"}</label>
                        <button onClick={this.showForm.bind(this)} className="deck-accessibility-button">Change</button>
                    </div>
                    {this.state.deck.visibility === "Everyone" || this.state.deck.visibility === "Certain classes" ?
                        <div>
                            <label>{this.state.deck.editability === "Certain classes" ? "Editable by certain classes" : "Only editable by me"}</label>
                            <button onClick={this.showForm.bind(this)} className="deck-accessibility-button">Change</button>
                        </div>
                        :
                        ""
                    }
                    <div className="tooltip">
                        <button onClick={this.flipTermsAndDefs.bind(this)} className="deck-switch-button" ><i className="fas fa-sync-alt"></i></button>
                        <span className="tooltiptext">Flip terms and definitions</span>
                    </div>
                </div>
                {this.state.errors.length > 0 ? 
                <div className="deck-form-errors">
                    {`YOU NEED THE FOLLOWING TO SUBMIT A DECK: ${this.state.errors.join(", ")}`}
                </div>
                :
                ""
                }
            </div>

            <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                    <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div className="card-forms"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {this.state.cards.map((card, index) => (
                                <Draggable key={card.uid} draggableId={index.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <div key={index} className="cards-wrapper"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div className="card-form" key={index}>
                                                <form>
                                                    <div className="card-header">
                                                        <h3>{index + 1}</h3>
                                                        <div className="tooltip-trash">
                                                            <button onClick={this.removeCard(index).bind(this)} className="delete-card-button"><i className="fas fa-trash-alt"></i></button>
                                                            <span className="tooltiptext-trash">Delete this card</span>
                                                        </div>

                                                    </div>
                                                    <div className="card-form-fields">
                                                        <div className="card-form-field">
                                                            <input className="create-form-input" onChange={this.handleTermChange(index).bind(this)} type="text" value={this.state.cards[index].term || ""} placeholder="Enter term" />
                                                            {this.state.errors.includes("AT LEAST TWO CARDS") && index <= 1 ?
                                                            <label className="create-form-label errors" >YOU NEED TWO CARDS TO SUBMIT A DECK</label>
                                                            : <label className="create-form-label" >TERM</label>}
                                                        </div>
                                                        <div className="card-form-field">
                                                            <input className="create-form-input" onChange={this.handleDefinitionChange(index).bind(this)} type="text" value={this.state.cards[index].definition || ""} placeholder="Enter definition" />
                                                            {this.state.errors.includes("AT LEAST TWO CARDS") && index <= 1 ?
                                                            <label className="create-form-label errors" >YOU NEED TWO CARDS TO SUBMIT A DECK</label>
                                                            : <label className="create-form-label" >DEFINITION</label>}
                                                        </div>
                                                    </div>
                                                </form>

                                            </div>
                                            <div className="visibility-div">
                                                <button className="add-card-button" onClick={this.insertCard(index)}>+</button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                                <div className="final-add-card">
                                    <h3>{this.state.cards.length + 1}</h3>
                                    <button onClick={this.insertCard(this.state.cards.length - 1).bind(this)}>+ ADD CARD</button>
                                    <h3></h3>
                                </div>
                                <button className="large-create-card teal" onClick={this.handleSubmit.bind(this)}>{this.props.formType === "Create Deck" ? "Create" : "Done"}</button>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            </div>
        );
    }
}
export default DeckForm;

// class DeckForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             deck: this.props.deck,
//             cards: this.props.cards,
//             cls: "accessibility-modal",
//             tempVis: this.props.deck.visibility,
//             tempEdit: this.props.deck.editability,
//         }
//     }

//     componentDidMount() {
//         if (this.props.formType === "Update Deck") {
//             this.props.fetchCards(this.props.deck.id).then(cards => {
//                 let newCards = Object.values(cards.cards);
//                 let sortedCards = newCards.sort((a, b) => (a.order > b.order) ? 1 : -1)
//                 this.setState({ cards: sortedCards })
//             })
//         }
//     }

    // showForm() {
    //     if (this.state.cls === "accessibility-modal") {
    //         this.setState({ cls: "accessibility-modal show-modal" })
    //     } else {
    //         this.setState({ cls: "accessibility-modal" })
    //     }
    // }

    // hideForm(e) {
    //     if (e.target.className === "accessibility-modal show-modal" ||
    //         e.target.className === "close-form") {
    //         this.setState({ tempVis: this.state.deck.visibility, tempEdit: this.state.deck.editability, cls: "accessibility-modal" })
    //     }
    // }

    // hideFormOnSave() {
    //     this.setState({ tempVis: this.state.deck.visibility, tempEdit: this.state.deck.editability, cls: "accessibility-modal" })
    // }

    // handleTitleChange(e) {
    //     let newDeck = Object.assign({}, this.state.deck);
    //     newDeck.title = e.currentTarget.value;
    //     this.setState({ deck: newDeck });
    // }

    // handleDescriptionChange(e) {
    //     let newDeck = Object.assign({}, this.state.deck);
    //     newDeck.description = e.currentTarget.value;
    //     this.setState({ deck: newDeck });
    // }

    // handleVisibilityChange(e) {
    //     if (e.target.value === "Just me") {
    //         this.setState({ tempVis: e.target.value, tempEdit: e.target.value });
    //     } else {
    //         this.setState({ tempVis: e.target.value});
    //     }
    // }

    // handleEditabilityChange(e) {
    //     this.setState({ tempEdit: e.target.value });
    // }

    // handleAccessibilityChange() {
    //     let newDeck = Object.assign({}, this.state.deck);
    //     newDeck.visibility = this.state.tempVis;
    //     newDeck.editability = this.state.tempEdit;
    //     this.setState({deck: newDeck}, this.hideFormOnSave.bind(this));
    // }

    // flipTermsAndDefs() {
    //     let newCards = [];
    //     for (let i = 0; i < this.state.cards.length; i++) {
    //         const card = this.state.cards[i];
    //         let dupCard = Object.assign({}, card);
    //         [dupCard.term, dupCard.definition] = [dupCard.definition, dupCard.term];
    //         newCards.push(dupCard);
    //     }
    //     this.setState({cards: newCards});
    // }

    // handleTermChange(index) {
    //     return e => {
    //         let newCardsArr = Object.assign([], this.state.cards);
    //         newCardsArr[index].term = e.currentTarget.value;
    //         this.setState({ cards: newCardsArr })
    //     };
    // }

    // handleDefinitionChange(index) {
    //     return e => {
    //         let newCardsArr = Object.assign([], this.state.cards);
    //         newCardsArr[index].definition = e.currentTarget.value;
    //         this.setState({ cards: newCardsArr })
    //     };
    // }

    // insertCard(index) {
    //     return e => {
    //         let leftCardsArr = Object.assign(
    //             [], 
    //             this.state.cards.slice(0, index + 1))
    //         let rightCardsArr = Object.assign(
    //             [],
    //             this.state.cards.slice(index + 1))
    //         leftCardsArr.push({ term: "", description: "", order: "", deckId: "" })
    //         let newCardsArr = leftCardsArr.concat(rightCardsArr)
    //         this.setState({ cards: newCardsArr })
    //     };
    // }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     let that = this;
    //     this.props.deckAction(this.state.deck).then(deck => {
    //         for (let i = 0; i < this.state.cards.length; i++) {
    //             const card = this.state.cards[i];
    //             let isOldCard = !!card.deckId
    //             card.deckId = deck.deck.id
    //             card.order = i + 1;
    //             if (!isOldCard) {
    //                 that.props.createCard(card);
    //             } else {
    //                 that.props.updateCard(card);
    //             }
                
    //         }
    //     });
    //     <Redirect to="/latest"/>
    // }

//     render() {

//         return (
//             <div className="create-forms">
                // <div className="deck-form">
                //     <div onClick={this.hideForm.bind(this)} className={this.state.cls}>
                //         <form onSubmit={this.handleAccessibilityChange.bind(this)} className='accessibility-form-box'>
                //             <div className="accessibility-banner">
                //                 <h1 className="form-title">Options</h1>
                //                 <div onClick={this.hideForm.bind(this)} className="close-form">X</div>
                //             </div>
                //             <div className="accessibility-form">
                //                 <div className="accessibility-fields">
                //                     <div className="accessibility-field">
                //                         <label>VISIBLE TO</label>
                //                         <select value={this.state.tempVis} onChange={this.handleVisibilityChange.bind(this)}>
                //                             <option value="Everyone">
                //                                 Everyone
                //                             </option>
                //                             <option value="Certain classes">Certain classes</option>
                //                             <option value="Just me">Just me</option>
                //                         </select>
                //                         <span>{this.state.tempVis === "Everyone" ? "All QsFlash! users can see this deck" : this.state.tempVis === "Certain classes" ? "Only members of these classes can use this deck" : "Only you can view this deck"}</span>
                //                     </div>
                //                     <div className="accessibility-field">
                //                         <label>EDITABLE BY</label>
                //                         <select value={this.state.tempEdit} onChange={this.handleEditabilityChange.bind(this)}>
                //                             <option value="Certain classes">Certain classes</option>
                //                             <option value="Just me">Just me</option>
                //                         </select>
                //                         <span>{this.state.tempEdit === "Certain classes" ? "Only members of these classes can edit this deck" : "Only you can edit this deck"}</span>
                //                     </div>
                //                 </div>
                //                 <input className="accessibility-submit" type="submit" value="Save" />
                //             </div>
                //         </form>
                //     </div>
                //     <header>
                //         <h1>{this.props.formType === "Create Deck" ? "Create a new study deck" : "Edit study deck"}</h1>
                //         <button className="teal" onClick={this.handleSubmit.bind(this)}>{this.props.formType === "Create Deck" ? "Create" : "Done"}</button>
                //     </header>
                //     <form className="deck-form-deck">
                //         <input className="create-form-input" onChange={this.handleTitleChange.bind(this)} type="text" value={this.state.deck.title} placeholder="Enter a title, like “Ruby on Rails”"/>
                //         <label className="create-form-label" >TITLE</label>
                //         <input className="create-form-input" onChange={this.handleDescriptionChange.bind(this)} type="text" value={this.state.deck.description} placeholder="Add a description..."/> 
                //         <label className="create-form-label">DESCRIPTION</label>
                //     </form>
                //     <div className="deck-form-options">
                //         <div>
                //             <label>{this.state.deck.visibility === "Everyone" ? "Visibile to everyone" : this.state.deck.visibility === "Certain classes" ? "Visible to certain classes": "Visible only to me"}</label>
                //             <button onClick={this.showForm.bind(this)} className="deck-accessibility-button">Change</button>
                //         </div>
                //         {this.state.deck.visibility === "Everyone" || this.state.deck.visibility === "Certain classes" ?
                //             <div>
                //                 <label>{this.state.deck.editability === "Certain classes" ? "Editable by certain classes" : "Only editable by me"}</label>
                //                 <button onClick={this.showForm.bind(this)} className="deck-accessibility-button">Change</button>
                //             </div>
                //             :
                //             ""
                //         }
                //         <div className="tooltip">
                //             <button onClick={this.flipTermsAndDefs.bind(this)} className="deck-switch-button" ><i className="fas fa-sync-alt"></i></button>
                //             <span className="tooltiptext">Flip terms and definitions</span>
                //         </div>
                //     </div>
                // </div>

//                 <div className="card-forms">
//                     {this.state.cards.map((card, index) => (
//                         <div key={index} className="cards-wrapper">
                            // <div className="card-form" key={index}>
                            //     <form>
                            //         <div className="card-header">
                            //             <h3>{index + 1}</h3>
                            //             <div className="tooltip-trash">
                            //                 <button className="delete-card-button"><i className="fas fa-trash-alt"></i></button>
                            //                 <span className="tooltiptext-trash">Delete this card</span>
                            //             </div>
                                        
                            //         </div>
                            //         <div className="card-form-fields">
                            //             <div className="card-form-field">
                            //                 <input className="create-form-input" onChange={this.handleTermChange(index).bind(this)} type="text" value={this.state.cards[index].term || ""} placeholder="Enter term" />
                            //                 <label className="create-form-label" >TERM</label>
                            //             </div>
                            //             <div className="card-form-field">
                            //                 <input className="create-form-input" onChange={this.handleDefinitionChange(index).bind(this)} type="text" value={this.state.cards[index].definition || ""} placeholder="Enter definition" />
                            //                 <label className="create-form-label" >DEFINITION</label>
                            //             </div>
                            //         </div>
                            //     </form>
                                
                            // </div>
                            // <div className="visibility-div">
                            //     <button className="add-card-button" onClick={this.insertCard(index)}>+</button>
                            // </div>
//                         </div>
//                     ))}
                    // <div className="final-add-card">
                    //     <h3>{this.state.cards.length + 1}</h3>
                    //     <button  onClick={this.insertCard(this.state.cards.length - 1).bind(this)}>+ ADD CARD</button>
                    //     <h3></h3>
                    // </div>
                    // <button className="large-create-card teal" onClick={this.handleSubmit.bind(this)}>{this.props.formType === "Create Deck" ? "Create" : "Done"}</button>
//                 </div>
//             </div>
//         )
//     }
// }

// export default DeckForm;

