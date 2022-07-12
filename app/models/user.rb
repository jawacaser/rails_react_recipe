class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: [:user, :admin]

  after_initialize :set_default_role, :if => :new_record?

  # Destroy all recipes belonging to user upon Destroying user
  has_many :recipes, dependent: :destroy
  has_many :likes

  # New users set to 'user' by default
  def set_default_role
    self.role ||= :user
  end

end
