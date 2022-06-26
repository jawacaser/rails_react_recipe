// Support component names relative to this directory:
require("bootstrap")
require("./application.scss")
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
