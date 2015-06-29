import Ember from 'ember';

export default Ember.Controller.extend({
  isValid: Ember.computed(
    'model.name',
    'model.url',
    function() {
      return !Ember.isEmpty(this.get('model.name')) &&
        !Ember.isEmpty(this.get('model.url'));
    }
  ),
  actions: {
    save: function() {
      if (this.get('isValid')) {
        var _this = this;
        this.get('model').save().then(function() {
          _this.transitionToRoute('domains');
        });
      } else {
        this.set('errorMessage', 'You have to fill all the fields');
      }

      return false;
    },
    cancel: function() {
      this.transitionToRoute('domains');
      return false;
    }
  }
});