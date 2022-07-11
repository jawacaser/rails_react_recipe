require "rails_helper"

class UserTest < ActiveSupport::TestCase
  RSpec.describe "User" do
    before { @user = FactoryBot.create :user }
    # Either syntax works. before block seems to be slightly faster.
    # let(:user) { FactoryBot.create :user }

    it "exists" do
      expect(@user).to be_an_instance_of User
      # expect(user).to be_an_instance_of User
    end

    it "is valid" do
      expect(@user).to be_valid
    end
    
    it "has a username" do
      expect(@user.username).to eq("MyUsername")
      # expect(user.username).to eq("MyUsername")
    end

    it "has an email" do
      expect(@user.email).to eq("test@example.com")
    end

    it "has matching passwords" do
      expect(@user.password).to eq("password")
      expect(@user.password).to eq(@user.password_confirmation)
    end

    it "has a 'role' of 'user'" do
      expect(@user.role).to eq("user")
    end
  end
end
