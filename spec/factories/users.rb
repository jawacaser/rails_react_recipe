FactoryBot.define do
  factory :user do
    username { "MyUsername" }
    email { "test@example.com" }
    password { "password" }
    password_confirmation { 'password' }
    role { 0 }
  end
end
