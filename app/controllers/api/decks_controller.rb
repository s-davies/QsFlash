class Api::DecksController < ApplicationController
    def index
        # if an optional user idea param is included, find that user's decks
        @decks = nil
        if params["opt_user_id"]
            @decks = User.find_by(id: params["opt_user_id"]).decks_studied
        elsif params["opt_folder_id"]
            @decks = Folder.find_by(id: params["opt_folder_id"]).decks
        else
            @decks = current_user.decks_studied
        end
        
        render :index
    end

    def search
        searchTerm = params["searchTerm"].split("%20").join(" ")
        @decks = Deck.where("upper(title) LIKE ?", "%#{params['searchTerm'].upcase}%")
        
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
        if @deck.owner_id == current_user.id #make sure only owner can update
            if @deck && @deck.update(deck_params)
                render :show
            else
                render json: @deck.errors.full_messages, status: 422
            end
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
