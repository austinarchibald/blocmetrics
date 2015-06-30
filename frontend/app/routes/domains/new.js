import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('domain');
  },
  deactivate: function() {
    var model  = this.modelFor('domains/new');
    if (model.get('isNew')) {
      model.destroyRecord();
    }
  }
});