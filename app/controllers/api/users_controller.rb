class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @user.account_type = "student"
    @user.night_mode = false
    if @user.save
      log_in!(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    @users = User.all
    render "api/users/index"
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
