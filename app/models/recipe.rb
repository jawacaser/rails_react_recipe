class Recipe < ApplicationRecord
    validates :name, presence: true
    validates :ingredients, presence: true
    valides :instruction, presence: true
end
