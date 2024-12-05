# app/channels/leaderboard_channel.rb
class LeaderboardChannel < ApplicationCable::Channel
  def subscribed
    stream_from "leaderboard_channel"
  end
end
