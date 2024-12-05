class AddQuizAttemptIdToScores < ActiveRecord::Migration[7.2]
  def change
    add_column :scores, :quiz_attempt_id, :string
  end
end
