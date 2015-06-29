require 'faker'

me = User.new(
  name:     'Austin Peay',
  email:    'theaustinpeay@gmail.com',
  password: 'password'
)
me.skip_confirmation!
me.save!

users = User.all

# Create Domains
5.times do
  Domain.create!(
    name: Faker::App.name,
    user: users.sample,
    url:  Faker::Internet.url
  )
end
domains = Domain.all

# Create Events
500.times do
  event = Event.create!(
    name:        Faker::Hacker.ingverb,
    # user:        users.sample,
    domain: domains.sample
  )
end

puts "Seed finished"
puts "#{User.count} users created."
puts "#{Domain.count} domains registered."
puts "#{Event.count} events tracked."