class Api::CardStudiesController < ApplicationController
  def index
      @card_studies = CardStudy.where(deck_id: params[:deck_id], studier_id: current_user.id)
      if !@card_studies[0]
        @cards = Card.where(deck_id: params[:deck_id])
        (0...@cards.length).each do |i|
            CardStudy.create({
                starred: false,
                correctness_count: 0,
                learn_count: 0,
                write_count: 0,
                spell_count: 0,
                test_count: 0,
                card_id: @cards[i].id,
                deck_id: params["deck_id"],
                studier_id: current_user.id
            })
        end
        @card_studies = CardStudy.where(deck_id: params[:deck_id], studier_id: current_user.id)
      end
      render :index
  end

  def create
      @card_study = CardStudy.new(card_study_params)
      @card_study.studier_id = current_user.id
      if @card_study.save
          render :show
      else
          render json: @card_study.errors.full_messages, status: 422
      end
  end

  def update
      @card_study = CardStudy.find_by(id: params[:id])
      if @card_study && @card_study.update(card_study_params)
          render :show
      else
          render json: @card_study.errors.full_messages, status: 422
      end
  end

  def destroy
      @card_study = CardStudy.find_by(id: params[:id])
      @card_study.destroy
  end

  private

  def card_study_params
      params.require(:card_study).permit(:starred, :correctness_count, :learn_count, :write_count, :spell_count, :test_count, :card_id, :deck_id)
  end
end
