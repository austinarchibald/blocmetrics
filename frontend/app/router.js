import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('domains', { path: '/ember' }, function() {
  	this.route('new');
  });
  this.route('domain', { path: '/ember/domains/:id' });
});

export default Router;
