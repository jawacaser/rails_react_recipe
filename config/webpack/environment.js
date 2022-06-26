const { environment } = require('@rails/webpacker')
// ADDED THE FOLOWING
const webpack = require("webpack")
environment.plugins.append("Provide", new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default']
  }))
// END
module.exports = environment
