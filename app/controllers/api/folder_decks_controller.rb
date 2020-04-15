class Api::FolderDecksController < ApplicationController

  def index
      @folder_decks = FolderDeck.where(folder_id: params[:folder_id])
      render :index
  end

  def create
      @folder_deck = FolderDeck.new(folder_deck_params)
      if @folder_deck.save
          render :show
      else
          render json: @folder_deck.errors.full_messages, status: 422
      end
      @folder_deck.save
  end

  def destroy
      @folder_deck = FolderDeck.find_by(id: params[:id])
      @folder_deck.destroy
  end

  private

  def folder_deck_params
      params.require(:folder_deck).permit(:deck_id, :folder_id)
  end
end
