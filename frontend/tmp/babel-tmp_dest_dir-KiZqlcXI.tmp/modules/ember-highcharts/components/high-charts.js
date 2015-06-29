import Ember from "ember";
import { setDefaultHighChartOptions } from "../utils/option-loader";

var computed = Ember.computed;
var get = Ember.get;
var set = Ember.set;
var merge = Ember.merge;
var on = Ember.on;
var observer = Ember.observer;
var run = Ember.run;

export default Ember.Component.extend({
  classNames: ["highcharts-wrapper"],
  content: undefined,
  mode: undefined,
  chartOptions: undefined,
  chart: null,
  theme: undefined,
  callback: undefined,

  buildOptions: computed("chartOptions", "content.@each.isLoaded", function () {
    var chartOptions = Ember.$.extend(true, {}, get(this, "theme"), get(this, "chartOptions"));
    var chartContent = get(this, "content.length") ? get(this, "content") : [{
      id: "noData",
      data: 0,
      color: "#aaaaaa"
    }];

    var defaults = { series: chartContent };

    return merge(defaults, chartOptions);
  }),

  contentDidChange: observer("content.@each.isLoaded", function () {
    if (!(get(this, "content") && get(this, "chart"))) {
      return;
    }

    var chart = get(this, "chart");
    var noData = chart.get("noData");

    if (noData != null) {
      noData.remove();
    }

    return get(this, "content").forEach(function (series, idx) {
      if (chart.series[idx]) {
        return chart.series[idx].setData(series.data);
      } else {
        return chart.addSeries(series);
      }
    });
  }),

  drawAfterRender: function drawAfterRender() {
    run.scheduleOnce("afterRender", this, "draw");
  },

  draw: function draw() {
    var completeChartOptions = [get(this, "buildOptions"), get(this, "callback")];
    var mode = get(this, "mode");

    if (typeof mode === "string" && !!mode) {
      completeChartOptions.unshift(mode);
    }

    var $element = this.$();
    var chart = $element.highcharts.apply($element, completeChartOptions).highcharts();

    set(this, "chart", chart);
  },

  _renderChart: on("didInsertElement", function () {
    this.drawAfterRender();
    setDefaultHighChartOptions(this.container);
  }),

  _destroyChart: on("willDestroyElement", function () {
    this._super();
    get(this, "chart").destroy();
  })
});