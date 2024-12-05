require_relative "boot"

require "rails/all"

require 'rails_admin'


# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module QuizApp
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.2

    # Configuration for API-only apps
    config.api_only = true

    # Enable cookies and sessions for API-only mode
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore, key: '_quiz_app_session'
    config.middleware.use ActionDispatch::Flash
    config.middleware.use Rack::MethodOverride

    # Configure CORS to allow requests from the React frontend
    require 'rack/cors'
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:4000' # Replace with your React app's URL
        resource '*',
                 headers: :any,
                 methods: %i[get post put patch delete options head],
                 credentials: true # Enable cookies for cross-origin requests
      end
    end

    # Autoload lib folder (optional, depending on your application needs)
    config.autoload_lib(ignore: %w[assets tasks])

    # You can add additional configuration here if needed.
  end
end
