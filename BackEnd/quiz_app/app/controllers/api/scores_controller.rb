class Api::ScoresController < ApplicationController
  before_action :authenticate_user!, only: :create

  def create
    # Find or initialize a single score entry for the current quiz attempt
    score = current_user.scores.find_or_initialize_by(quiz_attempt_id: params[:score][:quiz_attempt_id])
    score.points ||= 0
    score.points += params[:score][:points].to_i # Increment points

    if score.save
      # Broadcast updated leaderboard
      ActionCable.server.broadcast "leaderboard_channel", {
        leaderboard: Score.joins(:user)
                          .select('scores.points, users.username')
                          .order(points: :desc)
                          .limit(10)
      }
      render json: { message: "Score updated successfully", score: score.points }, status: :ok
    else
      render json: { errors: score.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def leaderboard
    leaderboard = Score.joins(:user)
                       .select('scores.points, users.username')
                       .order(points: :desc)
                       .limit(10)
    render json: leaderboard
  end
end
