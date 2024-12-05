# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
Question.create([
  { content: "What is the capital of France?", correct_answer: "Paris" },
  { content: "What is 2 + 2?", correct_answer: "4" },
  { content: "What is the color of the sky?", correct_answer: "Blue" },
  { content: "How many continents are there on Earth??", correct_answer: "7" },
  { content: "How many pints of blood are in a human body?", correct_answer: "10" },
  { content: "Who was the 16th president of the United States?", correct_answer: "Abraham Lincoln" },
  { content: "How many legs does a crab have?", correct_answer: "10" },
  { content: "How many states are in the United States of America?", correct_answer: "50" },
  { content: "Whats the largest land animal alive today?", correct_answer: "Elephant" },
  { content: "What is stored in camels back?", correct_answer: "Fats" },4



  
])

questions_data.each do |question|
  Question.find_or_create_by(content: question[:content]) do |q|
    q.correct_answer = question[:correct_answer]
  end
end