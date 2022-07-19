class RegistrationsController < Devise::RegistrationsController

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      render json: @user
    else
      warden.custom_failure!
      render json: { error: 'signup error' }, status: :unprocessable_entity
    end
  end

  def update
    # @user = User.find_by_email(user_params[:email])
    @user = current_user

    if @user.update(user_params)
      bypass_sign_in(current_user)
      render json: @user
    else
      warden.custom_failure!
      render :json=> @user.errors, :status=>422
    end
 end

  def destroy
    @user = User.find_by_email(user_params[:email])
    if @user.destroy
      render :json=> { success: 'user was successfully deleted' }, :status=>201
    else
      render :json=> { error: 'user could not be deleted' }, :status=>422
    end
  end

  private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :username)
    end

    # def after_update_path_for(resource)
    #   user_path(current_user)
    # end

    def after_sign_up_path_for(resource)
      "/my-recipes"
    end

    def after_inactive_sign_up_path_for(resource)
      "/my-recipes"
    end

end