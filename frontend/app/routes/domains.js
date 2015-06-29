import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    delete: function(domain) {
      var _this = this;

      domain.destroyRecord().then(function() {
        _this.transitionTo('domains');
      });
    }
  }
});