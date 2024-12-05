class AddQuizSessionToScores < ActiveRecord::Migration[7.2]
  def change
    add_column :scores, :quiz_session, :string
  end
end
