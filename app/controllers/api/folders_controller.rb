class Api::FoldersController < ApplicationController
  def index
        # if an optional user idea param is included, find that user's folders
        @folders = params["opt_user_id"] ? 
            User.find_by(id: params["opt_user_id"]).folders 
            : current_user.folders
        
        render :index
    end

    def create
        @folder = Folder.new(folder_params)
        @folder.owner_id = current_user.id
        if @folder.save
            render :show
        else
            render json: @folder.errors.full_messages, status: 422
        end
    end

    def show
        @folder = Folder.find_by(id: params[:id])
        render :show
    end

    def update
        @folder = Folder.find_by(id: params[:id])
        if @folder.owner_id == current_user.id #make sure only owner can update
            if @folder && @folder.update(folder_params)
                render :show
            else
                render json: @folder.errors.full_messages, status: 422
            end
        end
    end

    def destroy
        @folder = Folder.find_by(id: params[:id])
        @folder.destroy
        render :show
    end

    private

    def folder_params
        params.require(:folder).permit(:title, :description, :deck_count)
    end
end
