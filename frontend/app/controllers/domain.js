import Ember from 'ember';

export default Ember.Controller.extend({
  chartOptions: {
    chart: {
        type: 'pie'
    },
    title: {
      text: 'Pages Visited'
    }
  },

  chartData: 
    { 
      data: { 
        table: 'datatable' 
      } 
    }
});
