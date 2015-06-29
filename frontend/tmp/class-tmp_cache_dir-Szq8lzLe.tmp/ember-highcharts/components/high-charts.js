define('ember-highcharts/components/high-charts', ['exports', 'ember', 'ember-highcharts/utils/option-loader'], function (exports, Ember, option_loader) {

  'use strict';

  var computed = Ember['default'].computed;
  var get = Ember['default'].get;
  var set = Ember['default'].set;
  var merge = Ember['default'].merge;
  var on = Ember['default'].on;
  var observer = Ember['default'].observer;
  var run = Ember['default'].run;

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["highcharts-wrapper"],
    content: undefined,
    mode: undefined,
    chartOptions: undefined,
    chart: null,
    theme: undefined,
    callback: undefined,

    buildOptions: computed("chartOptions", "content.@each.isLoaded", function () {
      var chartOptions = Ember['default'].$.extend(true, {}, get(this, "theme"), get(this, "chartOptions"));
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
      option_loader.setDefaultHighChartOptions(this.container);
    }),

    _destroyChart: on("willDestroyElement", function () {
      this._super();
      get(this, "chart").destroy();
    })
  });

});