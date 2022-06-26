// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// if using importmap INSTEAD of webpacker, you would import bootstrap here:
// import "bootstrap"

// Added
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap'
require("stylesheets/application.scss")