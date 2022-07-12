require "rails_helper"

class UserTest < ActiveSupport::TestCase
  RSpec.describe "User" do
    let(:user) { build(:user) }

    it "exists" do
      expect(user).to be_an_instance_of User
    end

    it "is valid" do
      expect(user).to be_valid
    end
    
    it "has a username" do
      expect(user.username).to match(/Username-\d+/)
    end

    it "has an email" do
      expect(user.email).to match(/test-\d+@example.com/)
    end

    it "has matching passwords" do
      expect(user.password).to eq("password")
      expect(user.password).to eq(user.password_confirmation)
    end

    it "has a 'role' of 'user'" do
      expect(user.role).to eq("user")
    end
  end
end
