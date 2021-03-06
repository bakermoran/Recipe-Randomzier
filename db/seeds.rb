# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

40.times do |i|
    Recipe.create(
        name: "Recipe #{i + 1}",
        description: "this is a delicious and easy recipe for any home cook",
        servings: 2,
        ingredients: [
            {
                :name => "oil",
                :amount => 2,
                :measure => "tbsp"
            },
            {
                :name => "chicken",
                :amount => 2,
                :measure => "lbs"
            },
            {
                :name => "salt and pepper",
                :amount => 1,
                :measure => "tsp"
            }
        ],
        instructions: ["put the oil in the pan",
            "heat the pan until smoking",
            "place the chicken breast in and season it",
            "cook to an internal temperature of 165, flipping half way through"
        ]
    )
end