class Api::DecksController < ApplicationController
    def index
        @decks = Deck.where(owner_id: current_user.id)
        render :index
    end

    def create
        @deck = Deck.new(deck_params)
        @deck.owner_id = current_user.id
        if @deck.save
            render :show
        else
            render json: @deck.errors.full_messages, status: 422
        end
    end

    def show
        @deck = Deck.find_by(id: params[:id])
        render :show
    end

    def update
        @deck = Deck.find_by(id: params[:id])
        if @deck && @deck.update(deck_params)
            render :show
        else
            render json: @deck.errors.full_messages, status: 422
        end
    end

    def destroy
        @deck = Deck.find_by(id: params[:id])
        @deck.destroy
        render :show
    end

    private

    def deck_params
        params.require(:deck).permit(:title, :description, :visibility, :editability, :card_count)
    end
end
