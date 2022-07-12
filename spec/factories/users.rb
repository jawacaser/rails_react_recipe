FactoryBot.define do
  factory :user do
    sequence(:username) { |n| "Username-#{n}" }
    sequence(:email) { |n| "test-#{n}@example.com" }
    password { "password" }
    password_confirmation { 'password' }
    role { 0 }
  end
end
