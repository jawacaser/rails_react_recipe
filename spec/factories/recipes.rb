FactoryBot.define do
  factory :recipe do
    name { "Recipe name" }
    ingredients { "List, of required, ingredients" }
    instruction { "Block of instructions text" }
    image { "www.image.com" }
    shared { false }
    user { FactoryBot.create(:user) }
  end
end
