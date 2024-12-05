# frozen_string_literal: true

Devise.setup do |config|
  # Use `username` instead of `email` for authentication
  config.authentication_keys = [:username]

  # Disables HTML navigational responses for API-only applications
  config.navigational_formats = []

  # Configure password length
  config.password_length = 6..128

  # Configure rememberable options
  config.rememberable_options = { secure: Rails.env.production? }

  # Define case-insensitive and whitespace-stripped authentication keys
  config.case_insensitive_keys = [:username]
  config.strip_whitespace_keys = [:username]

  # ORM configuration
  require 'devise/orm/active_record'

  # Configure Devise for API-only applications
  config.skip_session_storage = [:http_auth]

  # Set the default HTTP method for sign-out
  config.sign_out_via = :delete

  # Respond with proper HTTP status for API responses
  config.responder.error_status = :unprocessable_entity
  config.responder.redirect_status = :see_other

  # Secure cookie options
  # Adjust based on your application requirements for secure cookies
  config.rememberable_options = { secure: Rails.env.production? }

  # Hotwire/Turbo compatibility
  config.responder.redirect_status = :see_other
end
