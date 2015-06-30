import Ember from 'ember';

export default Ember.Route.extend({
  model: function() { return this.store.find("domain") },
  actions: {
    delete: function(domain) {
      var _this = this;

      domain.destroyRecord().then(function() {
        _this.transitionTo('domains');
      });
    }
  }
});