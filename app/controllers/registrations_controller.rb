class RegistrationsController < Devise::RegistrationsController

    private
  
      def sign_up_params
        params.require(:user).permit(:email, :password, :username)
      end

      def account_update_params
        params.require(:user).permit(:email, :password, :username)
      end
end