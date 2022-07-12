require "rails_helper"

class RecipeTest < ActiveSupport::TestCase
  RSpec.describe "Recipe" do
    let(:user) { build(:user) }
    let(:recipe) { create(:recipe, user: user) }
    
    it "exists" do
      expect(recipe).to be_an_instance_of(Recipe)
    end

    it "is valid" do
      expect(recipe).to be_valid
    end

    it "belongs to user" do
      expect(recipe.user_id).to eq(user.id)
    end
  end
end
