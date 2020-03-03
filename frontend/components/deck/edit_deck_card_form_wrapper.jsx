import React from 'react'

import EditDeckFormContainer from './create_deck_form_container'
import EditCardFormIndex from './create_card_form_index'

class EditDeckCardFormWrapper extends React.Component {
    render() {
        return (
            <div className="deck-card-form-wrapper">
                <EditDeckFormContainer />
                <EditCardFormIndex />
            </div>
        )
    }
}

export default EditDeckCardFormWrapper;