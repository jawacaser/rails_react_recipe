require "rails_helper"

class RecipeTest < ActiveSupport::TestCase
  RSpec.describe "Recipe" do
    before { @recipe = FactoryBot.create(:recipe) }
    
    it "exists" do
      expect(@recipe).to be_an_instance_of(Recipe)
    end

    it "belongs to user" do
      @user = User.find_by_email("test@example.com")
      expect(@recipe.user_id).to eq(@user.id)
    end
  end
end
