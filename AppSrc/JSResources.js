
/dummyImage
{}// dummy code to enable JS syntax highlighting
/*

/loadChart // */
(function(sObj){
  var oObj = oWebApp.findObj(sObj);
  
  oObj.onClientFillData = function(){
    var tActionDataFormat = {
      domId :  df.tString,
      attributes : {
        sAttributes : [{sName:df.tString,sValue:df.tString}],
        nAttributes : [{sName:df.tString,sValue:df.tNumber}],
        bAttributes : [{sName:df.tString,sValue:df.tBool}]
      },
      entries : [{
        sAttributes : [{sName:df.tString,sValue:df.tString}],
        nAttributes : [{sName:df.tString,sValue:df.tNumber}],
        bAttributes : [{sName:df.tString,sValue:df.tBool}]
      }],
      graphs : [{
        sAttributes : [{sName:df.tString,sValue:df.tString}],
        nAttributes : [{sName:df.tString,sValue:df.tNumber}],
        bAttributes : [{sName:df.tString,sValue:df.tBool}]
      }],
      valueAxes : [{
        sAttributes : [{sName:df.tString,sValue:df.tString}],
        nAttributes : [{sName:df.tString,sValue:df.tNumber}],
        bAttributes : [{sName:df.tString,sValue:df.tBool}]
      }],
      chartScrollbar_pbEnabled: df.tBool,
      chartScrollbar : {
        sAttributes : [{sName:df.tString,sValue:df.tString}],
        nAttributes : [{sName:df.tString,sValue:df.tNumber}],
        bAttributes : [{sName:df.tString,sValue:df.tBool}]
      },
      categoryAxis_pbEnabled: df.tBool,
      categoryAxis : {
        sAttributes : [{sName:df.tString,sValue:df.tString}],
        nAttributes : [{sName:df.tString,sValue:df.tNumber}],
        bAttributes : [{sName:df.tString,sValue:df.tBool}]
      },
      balloon_pbEnabled: df.tBool,
      balloon : {
        sAttributes : [{sName:df.tString,sValue:df.tString}],
        nAttributes : [{sName:df.tString,sValue:df.tNumber}],
        bAttributes : [{sName:df.tString,sValue:df.tBool}]
      },
      chartCursor_pbEnabled: df.tBool,
      chartCursor : {
        sAttributes : [{sName:df.tString,sValue:df.tString}],
        nAttributes : [{sName:df.tString,sValue:df.tNumber}],
        bAttributes : [{sName:df.tString,sValue:df.tBool}]
      },
      titles : [{
        sAttributes : [{sName:df.tString,sValue:df.tString}],
        nAttributes : [{sName:df.tString,sValue:df.tNumber}],
        bAttributes : [{sName:df.tString,sValue:df.tBool}]
      }],
      guides : [{
        sAttributes : [{sName:df.tString,sValue:df.tString}],
        nAttributes : [{sName:df.tString,sValue:df.tNumber}],
        bAttributes : [{sName:df.tString,sValue:df.tBool}]
      }]
    };
    var tData, tVT;
    // Retrieve value tree and deserialize
    tVT = this._tActionData;
    tData = df.sys.vt.deserialize(tVT, tActionDataFormat);
    oObj.zoomChart(tData);
  };
  oObj.generateAttributes = function(source,target){
    source.sAttributes.forEach(function(attr){
      target[attr.sName] = attr.sValue;
    });
    source.nAttributes.forEach(function(attr){
      target[attr.sName] = parseFloat(attr.sValue);
    });
    source.bAttributes.forEach(function(attr){
      target[attr.sName] = attr.sValue;
    });
  };

  oObj.zoomedEvent = function(oEvent){
    oObj.serverAction("onZoomed",[oEvent.endDate, oEvent.endIndex,oEvent.endValue, oEvent.startDate, oEvent.startIndex, oEvent.startValue]);
  }

    // Events / functions triggered by the DataFlex classes:
  oObj.zoomOut = function(){
    oObj.chart.zoomOut();
  };
  oObj.zoomToCategoryValues = function(start, End){
    oObj.chart.zoomToCategoryValues(start, End);
  };
  oObj.zoomToDates = function(start, End){
    oObj.chart.zoomToDates(start, End);
  };
  oObj.zoomToIndexes = function(start, End){
    oObj.chart.zoomToIndexes(start, End);
  };
  oObj.showGraph = function(id){
    var graph = oObj.chart.getGraphById(id);
    oObj.chart.showGraph(graph);
  };
  oObj.hideGraph = function(id){
    var graph = oObj.chart.getGraphById(id);
    oObj.chart.hideGraph(graph);
  };
  oObj.highlightGraph = function(id){
    var graph = oObj.chart.getGraphById(id);
    oObj.chart.highlightGraph(graph);
  };
  oObj.unhighlightGraph = function(id){
    var graph = oObj.chart.getGraphById(id);
    oObj.chart.unhighlightGraph(graph);
  };

    // render the chart
  oObj.zoomChart = function(chartData){
    // create chart object
    var chartConfig = {};

    //add attributes
    oObj.generateAttributes(chartData.attributes,chartConfig);

    if(chartData.chartScrollbar_pbEnabled){
      var csb = {};
      oObj.generateAttributes(chartData.chartScrollbar,csb);
      chartConfig.chartScrollbar = csb;
    }
    if(chartData.categoryAxis_pbEnabled){
      var ca = {};
      oObj.generateAttributes(chartData.categoryAxis,ca);
      chartConfig.categoryAxis = ca;
    }
    if(chartData.balloon_pbEnabled){
      var ba = {};
      oObj.generateAttributes(chartData.balloon,ba);
      chartConfig.balloon = ba;
    }
    if(chartData.chartCursor_pbEnabled){
      var cc = {};
      oObj.generateAttributes(chartData.chartCursor,cc);
      chartConfig.chartCursor = cc;
    }


    // fill dataprovider and att it to the chart
    var dataProvider = [];
    chartData.entries.forEach(function(e){
      var entry = {};
      oObj.generateAttributes(e,entry);
      dataProvider.push(entry);
    });
    chartConfig.dataProvider = dataProvider;

    // add graphs
    var graphs = [];
    chartData.graphs.forEach(function(g){
      var graph={};
      oObj.generateAttributes(g,graph);
      graphs.push(graph);
    });
    chartConfig.graphs = graphs;


    // add valueAxes
    var axis = [];
    chartData.valueAxes.forEach(function(g){
      var ax={};
      oObj.generateAttributes(g,ax);
      axis.push(ax);
    });
    chartConfig.valueAxes = axis;

    // add titles
    var titles = [];
    chartData.titles.forEach(function(g){
      var ax={};
      oObj.generateAttributes(g,ax);
      titles.push(ax);
    });
    chartConfig.titles = titles;

    // add guides
    var guides = [];
    chartData.guides.forEach(function(g){
      var ax={};
      oObj.generateAttributes(g,ax);
      guides.push(ax);
    });
    chartConfig.guides = guides;
    oObj.chartConfig = chartConfig;

    var chart = AmCharts.makeChart(chartData.domId, chartConfig);
    if (chartConfig.type =="serial"){
      if(chartConfig.pbServerOnZoomed){
        chart.addListener("zoomed", oObj.zoomedEvent);
      }
    }
    oObj.chart = chart;

  };

  oObj.serverAction("AccessData");
    
})
/*

/scriptLoader // */
    function load(file,callback){
    var head=document.getElementsByTagName("head")[0];
    var script=document.createElement('script');
    script.src=file;
    //real browsers
    script.onload=callback;
    //Internet explorer
    script.onreadystatechange = function() {
        if (this.readyState == 'complete') {
            callback();
        }
    }
    head.appendChild(script);
  }
      var chalk = function(){
        load("https://www.amcharts.com/lib/3/themes/chalk.js",func);
      };
      var dark = function(){
        load("https://www.amcharts.com/lib/3/themes/dark.js",chalk);
      };
      var light = function(){
        load("https://www.amcharts.com/lib/3/themes/light.js",dark);
      };
      var pie = function(){
        load("https://www.amcharts.com/lib/3/pie.js",light);
      };
      var xy = function(){
        load("https://www.amcharts.com/lib/3/xy.js",pie);
      };
      var serial = function(){
        load("https://www.amcharts.com/lib/3/serial.js",xy);
      };
      load("https://www.amcharts.com/lib/3/amcharts.js",serial);
/*