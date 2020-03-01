class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?

    def current_user
        return nil unless session[:session_token]
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def require_logged_in!
        unless current_user
            render json: ['Invalid credentials'], status: 401
        end
    end

    def logged_in?
        !!current_user
    end

    def log_in!(user)
        session[:session_token] = user.reset_session_token!
        @current_user = user
    end

    def log_out!
        current_user.reset_session_token!
        session[:session_token] = nil
    end
end
