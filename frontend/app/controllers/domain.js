import Ember from 'ember';

export default Ember.Controller.extend({
  // you basically need to write a computed property that takes your model and returns the highcharts format
  chartData: function () {
      let model = this.get('model');
      return // highcharts fomat data here
  // .property('model.events.@each')
 }
});