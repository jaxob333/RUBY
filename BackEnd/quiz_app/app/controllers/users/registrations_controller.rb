class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: { user: resource }, status: :created
  end

  def respond_to_on_destroy
    head :no_content
  end
end
