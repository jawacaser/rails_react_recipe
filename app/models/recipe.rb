class Recipe < ApplicationRecord
    belongs_to :user
    validates :name, presence: true
    validates :ingredients, presence: true
    validates :instruction, presence: true
    validates :image, presence: true
    validates :shared, presence: true
    validates :likes, presence: true
end
