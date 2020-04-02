class Api::CardsController < ApplicationController
    def index
        @cards = params[:deck_id] != "undefined" ? Card.where(deck_id: params[:deck_id]) : Card.where("cards.order < ?", 5)
        render :index
    end

    def create
        @card = Card.new(card_params)
        # @card.deck_id = current_user.decks.last.id #change this
        if @card.save
            render :show
        else
            render json: @card.errors.full_messages, status: 422
        end
    end

    def show
        @card = Card.find_by(id: params[:id])
        render :show
    end

    def update
        @card = Card.find_by(id: params[:id])
        if @card && @card.update(card_params)
            render :show
        else
            render json: @card.errors.full_messages, status: 422
        end
    end

    def destroy
        @card = Card.find_by(id: params[:id])
        @card.destroy
        render :show
    end

    private

    def card_params
        params.require(:card).permit(:term, :definition, :order, :deck_id)
    end
end
