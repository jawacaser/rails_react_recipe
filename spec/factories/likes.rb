FactoryBot.define do
  factory :like do
    recipe { FactoryBot.create(:recipe) }
    user { User.find_by_email("test@example.com") }
  end
end
