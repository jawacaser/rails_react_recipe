const { environment } = require('@rails/webpacker')
// ADDED THE FOLOWING
const webpack = require("webpack")
environment.plugins.append("Provide", new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    jquery: 'jquery',
    Popper: ['@popperjs/core', 'default']
  }))
// END
module.exports = environment
