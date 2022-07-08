class Recipe < ApplicationRecord
    belongs_to :user
    has_many :likes
    validates :name, presence: true
    validates :ingredients, presence: true
    validates :instruction, presence: true
    validates :image, presence: true
    validates :shared, inclusion: [true, false]
end
