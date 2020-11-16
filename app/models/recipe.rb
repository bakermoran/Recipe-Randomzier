class Recipe < ApplicationRecord
    serialize :ingredients, Array
    serialize :instructions, Array
    validates :name, presence: true
    validates :ingredients, presence: true
    validates :instructions, presence: true
end
