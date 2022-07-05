# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /users/login === React Component
  # def new
  #   super
  # end

  # POST /users/login
  # def create
  #   super
  # end
  def create
    @user = User.find_by_email(user_params[:email])
    return invalid_login_attempt unless @user

    if @user.valid_password?(user_params[:password])
        sign_in :user, @user
        set_flash_message!(:notice, :signed_in)
        render json: @user
    else
        invalid_login_attempt
    end
end

  # DELETE /users/logout
  # def destroy
  #   super
  # end
  def destroy
    signed_out = sign_out(current_user) if current_user.present?
    # (Devise.sign_out_all_scopes ? sign_out : sign_out(current_user))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?
    respond_to_on_destroy
  end
  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  private

  def invalid_login_attempt
    warden.custom_failure!
    render json: {error: 'invalid login attempt'}, status: :unprocessable_entity
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

  # Check if there is no signed in user before doing the sign out.
  #
  # If there is no signed in user, it will set the flash message and redirect
  # to the after_sign_out path.
  def verify_signed_out_user
    if all_signed_out?
      set_flash_message! :notice, :already_signed_out

      respond_to_on_destroy
    end
  end

  def all_signed_out?
    users = Devise.mappings.keys.map { |s| warden.user(scope: s, run_callbacks: false) }

    users.all?(&:blank?)
  end

  def respond_to_on_destroy
    # We actually need to hardcode this as Rails default responder doesn't
    # support returning empty response on GET request
    respond_to do |format|
      format.all { head :no_content }
      format.any(*navigational_formats) { redirect_to after_sign_out_path_for(resource_name) }
    end
  end
end
