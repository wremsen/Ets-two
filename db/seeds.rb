# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"

# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Review.destroy_all
    Product.destroy_all
    User.destroy_all

  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('products')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      email: 'kaladin@stormblessed.io', 
      password: 'sylphrena'
    )

  
    # More users
    10.times do 
      User.create!({
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    puts "Creating products..."

    pint_glass = Product.create!(
      name: 'pint glass',
      description: 'This is a glass that is exactly one pint in size.',
      price: 25
    )

    23.times do
      Product.create!(
        {name: Faker::Commerce.product_name,
        description: Faker::Lorem.sentence,
        price: Faker::Commerce.price(range: 7..350)}
      )

    end

    Product.all.each do |product|
      pic = URI.open("https://picsum.photos/256")
      product.photos.attach(io: pic, filename: "product#{product.id}_thumbnail.jpg")
    end

    puts "creating reviews..."

    215.times do |i|
      Review.create!(
        body: Faker::Lorem.paragraph,
        rating: rand(1..5),
        product_id: (i + 1) % 24 + 1,
        user_id: rand(1..11)
      )
    end
  
    puts "Done!"
  # end
