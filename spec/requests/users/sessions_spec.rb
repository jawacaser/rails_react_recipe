require 'rails_helper'

RSpec.describe Users::SessionsController, type: :controller do

  describe "#create" do
    context "Valid user provides credentials" do
      login_user

      it "and is authenticated" do
        expect(response).to be_successful
      end

      it "#show returns a user object" do
        get :show
        expect(JSON.parse(response.body)).to include("id", "username", "email", "role")
      end
    end

    context "Invalid user provides bad credentials" do
      devise_user

      it "and is denied authentication" do
        user = create(:user)
        post :create, params: {
          "user": {
            "email": user.email,
            "password": "WRONG"
          },
          "session": {
            "email": user.email,
            "password": "WRONG",
            "commit": "Log in"
          }
        }

        expect(response).to_not be_successful
      end

      it "#show returns nil" do
        get :show
        expect(JSON.parse(response.body)).to be_nil
      end
    end
  end

  describe "#destroy" do
    context "Session user" do
      login_user

      it "is first confirmed present" do
        expect(subject.current_user).to be_present
      end

      it "logs out" do
        delete :destroy
        expect(subject.current_user).to be_nil
      end
    end

    context "Non-session user" do
      devise_user

      it "is not present" do
        expect(subject.current_user).to_not be_present
      end

      it "remains nil" do
        delete :destroy
        expect(subject.current_user).to be_nil
      end
    end
  end

end
