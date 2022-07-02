class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: [:user, :admin]

  after_initialize :set_default_role, :if => :new_record?

  # Method of terminating session while client cookie persists
  # https://makandracards.com/makandra/53562-devise-invalidating-all-sessions-for-a-user
  def authenticatable_salt
    "#{super}#{session_token}"
  end
  def invalidate_all_sessions!
    update_attribute(:session_token, SecureRandom.hex)
  end

  # New users set to 'user' by default
  def set_default_role
    self.role ||= :user
  end

  # Destroy all recipes belonging to user upon Destroying user
  has_many :recipes, dependent: :destroy
end
