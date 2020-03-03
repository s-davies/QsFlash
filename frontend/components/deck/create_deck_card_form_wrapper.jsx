import React from 'react'

import CreateDeckFormContainer from './create_deck_form_container'
import CreateCardFormIndex from './create_card_form_index'

class CreateDeckCardFormWrapper extends React.Component {
    render() {
        return (
            <div className="deck-card-form-wrapper">
                <CreateDeckFormContainer />
                <CreateCardFormIndex />
            </div>
        )
    }
}

export default CreateDeckCardFormWrapper;