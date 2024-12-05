class Score < ApplicationRecord
  # Associations
  belongs_to :user

  # Validations
  validates :points, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :user, presence: true
end

