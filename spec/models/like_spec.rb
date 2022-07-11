require "rails_helper"

class LikeTest < ActiveSupport::TestCase
  RSpec.describe "Like" do
    before { @like = FactoryBot.create(:like) }

    it "exists" do
      expect(@like).to be_an_instance_of(Like)
    end

    it "is valid" do
      expect(@like).to be_valid
    end
  end
end
