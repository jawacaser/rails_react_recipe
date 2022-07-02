// Support component names relative to this directory:
require("../bootstrap/bootstrap_js")
require("./application.scss")
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
