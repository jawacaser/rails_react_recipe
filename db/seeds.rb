# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

1.times do |i|
  User.create(email: "user-1@example.com", password: "password", password_confirmation: "password", username: "user1", role: 0)
end

1.times do |i|
  User.create(email: "user-2@example.com", password: "password", password_confirmation: "password", username: "ADMINuser2", role: 1)
end

User.all.each do |u|
  6.times do |i|
    u.recipes.create(
      name: "Recipe #{i + 1} #{u.username} #{u.role}",
      ingredients: '227g tub clotted cream, 25g butter, 1 tsp cornflour,100g parmesan, grated nutmeg, 250g fresh fettuccine or tagliatelle, snipped chives or chopped parsley to serve (optional)',
      instruction: 'In a medium saucepan, stir the clotted cream, butter, and cornflour over a low-ish heat and bring to a low simmer. Turn off the heat and keep warm.',
      shared: true,
      likes: 0
    )
  end
end