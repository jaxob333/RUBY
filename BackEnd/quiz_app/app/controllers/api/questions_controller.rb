class Api::QuestionsController < ApplicationController
    before_action :authenticate_user!
  
    def index
      questions = Question.all
      render json: questions
    end
  end
  