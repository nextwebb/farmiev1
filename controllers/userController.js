
const User = require('../models/User');

exports.login = function() {
    res.send('login successful!');
}

exports.logout = function() {
    res.send('logout successful!');
}

exports.home = function(req, res) {
    //calls the appropriate view template
    res.render('home-guest');
}
exports.about = function(req, res) {
    //calls the appropriate view template
    res.render('about');
}
exports.products = function(req, res) {
    //calls the appropriate view template
    res.render('products');
}
exports.farmingPractice = function(req, res) {
    //calls the appropriate view template
    res.render('farming-practice');
}
exports.contact = function(req, res) {
    //calls the appropriate view template
    res.render('contact');
}