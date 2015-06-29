define("ember-cli-app-version", ["ember-cli-app-version/index", "ember", "exports"], function(__index__, __Ember__, __exports__) {
  "use strict";
  __Ember__["default"].keys(__index__).forEach(function(key){
    __exports__[key] = __index__[key];
  });
});

define("ember-cli-content-security-policy", ["ember-cli-content-security-policy/index", "ember", "exports"], function(__index__, __Ember__, __exports__) {
  "use strict";
  __Ember__["default"].keys(__index__).forEach(function(key){
    __exports__[key] = __index__[key];
  });
});

define("ember-highcharts", ["ember-highcharts/index", "ember", "exports"], function(__index__, __Ember__, __exports__) {
  "use strict";
  __Ember__["default"].keys(__index__).forEach(function(key){
    __exports__[key] = __index__[key];
  });
});

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
define('ember-highcharts/utils/option-loader', ['exports'], function (exports) {

  'use strict';

  exports.setDefaultHighChartOptions = setDefaultHighChartOptions;

  var localConfig = null;
  function setDefaultHighChartOptions(container) {
    if (!localConfig) {
      // use options defined in highcharts-config if they exist in the container
      var localConfigBuilder = container.lookup("highcharts-config:application");
      if (localConfigBuilder) {
        localConfig = localConfigBuilder(defaultOptions);
      } else {
        localConfig = defaultOptions;
      }
    }

    Highcharts.setOptions(localConfig);
  }

  var defaultOptions = {
    plotOptions: {
      series: {
        shadow: false
      }
    },

    global: {
      timezoneOffset: new Date().getTimezoneOffset()
    },

    credits: {
      enabled: false
    }
  };

});//# sourceMappingURL=addons.map