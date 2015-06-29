import Highcharts from 'ember-highcharts/addon/components/high-charts';

export default Highcharts.extend({
  chartMode: '', // empty, 'StockChart', or 'Map'
  chartOptions: { type: 'pie'},
  chartData: [],
  theme: defaultTheme
});
