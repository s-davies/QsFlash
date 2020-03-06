class Api::DeckStudiesController < ApplicationController
    def index
        @deck_studies = DeckStudy.where(deck_id: params[:deck_id])
        render :index
    end

    def show
        @deck_study = DeckStudy.find_by(studier_id: current_user.id)
        #create a new deck study if none exists
        if !@deck_study
            @deck_study = DeckStudy.create(progress: 1, deck_id: params[:deck_id], studier_id: current_user.id)
            # @deck_study.save
        end
        render :show
    end

    # def create
    #     @deck_study = DeckStudy.new(deck_study_params)
    #     @deck_study.progress = 1
    #     @deck_study.studier = current_user.id
    #     if @deck_study.save
    #         render :show
    #     else
    #         render json: @deck_study.errors.full_messages, status: 422
    #     end
    # end

    def update
        @deck_study = DeckStudy.find_by(id: params[:id])
        if @deck_study && @deck_study.update(deck_study_params)
            render :show
        else
            render json: @deck_study.errors.full_messages, status: 422
        end
    end

    private

    def deck_study_params
        params.require(:deck_study).permit(:progress, :deck_id, :studier_id)
    end


end
