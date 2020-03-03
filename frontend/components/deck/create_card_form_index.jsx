import React from 'react'

import CreatCardFormContainer from './create_card_form_container'

class CreateCardFormWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [
            <CreateCardFormContainer />,
            <CreateCardFormContainer />,
        ]
        }
    }

    addCard() {
        this.setState({ cards: Object.assign([], this.state.cards, [<CreateCardFormContainer />])})
    }

    render() {
        return (
            <div className="card-form-index">
                <CreateCardFormContainer />
                {this.state.cards}
                <button onClick={this.addCard.bind(this)}>+ Add Card</button>
            </div>
        )
    }
}

export default CreateCardFormWrapper;