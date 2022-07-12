module ControllerMacros
    def login_user
        before(:each) do
            @request.env["devise.mapping"] = Devise.mappings[:user]
            user = FactoryBot.create(:user)
            sign_in user
        end
    end

    Available when needed
    def login_admin
        before(:each) do
            @request.env["devise.mapping"] = Devise.mappings[:user]
            admin = FactoryBot.create(:user, role: 1)
            sign_in admin
        end
    end

    # Define users as needed through devise mapping
    def devise_user
        before(:each) do
            @request.env["devise.mapping"] = Devise.mappings[:user]
        end
    end
end