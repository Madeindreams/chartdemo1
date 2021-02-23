import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";



export const graphWorld = () =>{

    am4core.useTheme(am4themes_animated);
 
    // Create map instance
    let chart = am4core.create("chartdiv", am4maps.MapChart);

    
    try {
        chart.geodata = am4geodata_worldLow;
    }
    catch (e) {
        chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
    }
    
    // The data source
    let label = chart.createChild(am4core.Label)
    label.text = "Bitcoin trading volume on online exchanges in various countries worldwide in 2020\n(in million U.S. dollars)";
    label.fontSize = 12;
    label.align = "left";
    label.valign = "bottom"
    label.fill = am4core.color("#927459");
    label.background = new am4core.RoundedRectangle()
    label.background.cornerRadius(10,10,10,10);
    label.padding(10,10,10,10);
    label.marginLeft = 30;
    label.marginBottom = 30;
    label.background.strokeOpacity = 0.3;
    label.background.stroke =am4core.color("#927459");
    label.background.fill = am4core.color("#f9e3ce");
    label.background.fillOpacity = 0.0;
    

    // the graph name element
    let dataSource = chart.createChild(am4core.TextLink)
    dataSource.text = "Source : Statista";
    dataSource.fontSize = 12;
    dataSource.align = "left";
    dataSource.valign = "top"
    dataSource.url = "https://www.statista.com/statistics/1195753/bitcoin-trading-selected-countries/"
    dataSource.urlTarget = "_blank";
    dataSource.fill = am4core.color("#927459");
    dataSource.padding(10,10,10,10);
    dataSource.marginLeft = 30;
    dataSource.marginTop = 30;
    
    // Set projection
    chart.projection = new am4maps.projections.Orthographic();
    chart.panBehavior = "rotateLongLat";
    chart.padding(20,20,20,20);
    
    // Add zoom control
    chart.zoomControl = new am4maps.ZoomControl();
    
    let homeButton = new am4core.Button();
    homeButton.events.on("hit", function(){
      chart.goHome();
    });
    
    homeButton.icon = new am4core.Sprite();
    homeButton.padding(7, 5, 7, 5);
    homeButton.width = 30;
    homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
    homeButton.marginBottom = 10;
    homeButton.parent = chart.zoomControl;
    homeButton.insertBefore(chart.zoomControl.plusButton);
    // The background, sea
    chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#2c85ab");
    chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.2;
    chart.deltaLongitude = 20;
    chart.deltaLatitude = -20;
    
    // limits vertical rotation
    chart.adapter.add("deltaLatitude", function(delatLatitude){
        return am4core.math.fitToRange(delatLatitude, -90, 90);
    })
    
    // Create map polygon series
    
    let shadowPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    shadowPolygonSeries.geodata = am4geodata_continentsLow;
    
    try {
        shadowPolygonSeries.geodata = am4geodata_continentsLow;
    }
    catch (e) {
        shadowPolygonSeries.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
    }
    
    shadowPolygonSeries.useGeodata = true;
    shadowPolygonSeries.dx = 2;
    shadowPolygonSeries.dy = 2;
    shadowPolygonSeries.mapPolygons.template.fill = am4core.color("#000");
    shadowPolygonSeries.mapPolygons.template.fillOpacity = 0.2;
    shadowPolygonSeries.mapPolygons.template.strokeOpacity = 0;
    shadowPolygonSeries.fillOpacity = 0.1;
    shadowPolygonSeries.fill = am4core.color("#000");
    
    
    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    
    polygonSeries.calculateVisualCenter = true;
    polygonSeries.tooltip.background.fillOpacity = 0.2;
    polygonSeries.tooltip.background.cornerRadius = 20;

    // continent
    let template = polygonSeries.mapPolygons.template;
    template.nonScalingStroke = true;
    template.fill = am4core.color("#4f8c3e");
    template.stroke = am4core.color("#e2c9b0");
    
    polygonSeries.calculateVisualCenter = true;
    template.propertyFields.id = "id";
    template.tooltipPosition = "fixed";
    template.fillOpacity = 1;
    
    template.events.on("over", function (event) {
      if (event.target.dummyData) {
        event.target.dummyData.isHover = true;
      }
    })
    template.events.on("out", function (event) {
      if (event.target.dummyData) {
        event.target.dummyData.isHover = false;
      }
    })
    
    let hs = polygonSeries.mapPolygons.template.states.create("hover");
    hs.properties.fillOpacity = 1;
    hs.properties.fill = am4core.color("#deb7ad");
    
    
    let graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.mapLines.template.stroke = am4core.color("#fff");
    graticuleSeries.fitExtent = false;
    graticuleSeries.mapLines.template.strokeOpacity = 0.2;
    graticuleSeries.mapLines.template.stroke = am4core.color("#fff");
    
    
    let measelsSeries = chart.series.push(new am4maps.MapPolygonSeries())
    measelsSeries.tooltip.background.fillOpacity = 0;
    measelsSeries.tooltip.background.cornerRadius = 20;
    measelsSeries.tooltip.autoTextColor = false;
    measelsSeries.tooltip.label.fill = am4core.color("#fff");
    measelsSeries.tooltip.dy = -5;
    // Data representation
    let measelTemplate = measelsSeries.mapPolygons.template;
    measelTemplate.fill = am4core.color("#e6cf3c");
    measelTemplate.strokeOpacity = 0;
    measelTemplate.fillOpacity = 0.75;
    measelTemplate.tooltipPosition = "fixed";
    
    
    
    let hs2 = measelsSeries.mapPolygons.template.states.create("hover");
    hs2.properties.fillOpacity = 1;
    hs2.properties.fill = am4core.color("#86240c");
    
    polygonSeries.events.on("inited", function () {
      polygonSeries.mapPolygons.each(function (mapPolygon) {
        let count = data[mapPolygon.id];
    
        if (count > 0) {
          let polygon = measelsSeries.mapPolygons.create();
          polygon.multiPolygon = am4maps.getCircle(mapPolygon.visualLongitude, mapPolygon.visualLatitude, Math.max(0.2, Math.log(count) * Math.LN10 / 10));
          polygon.tooltipText = mapPolygon.dataItem.dataContext.name + ": " + count;
          mapPolygon.dummyData = polygon;
          polygon.events.on("over", function () {
            mapPolygon.isHover = true;
          })
          polygon.events.on("out", function () {
            mapPolygon.isHover = false;
          })
        }
        else {
          mapPolygon.tooltipText = mapPolygon.dataItem.dataContext.name + ": no data";
          mapPolygon.fillOpacity = 0.9;
        }
    
      })
    })
    
    
    let data = {
//      "AL": 504.38,
//      "AM": 6.5,
//      "AO": 2.98,
      "AR": 47.85,// Argentina
//      "AT": 10.9,
      "AU": 54.78,// Australia
 //     "AZ": 17.38,
 //     "BA": 24.45,
//      "BD": 13.4,
//      "BE": 12.06,
//      "BF": 93.37,
//      "BG": 1.68,
//      "BI": 0.95,
 //     "BJ": 93.36,
      "BR": 25.22,// Brazil
//      "BT": 10.03,
//      "BY": 26.16,
      "CA": 65.56, // Canada
 //     "CD": 69.71,
 //     "CF": 4.57,
 //     "CG": 19.7,
      "CH": 7.86, //Switzerland
 //     "CI": 14.1,
      "CL": 23.81,//Chile
//      "CM": 41.26,
      "CN": 218.26,// China
      "CO": 147.50,// Colombia
 //     "CY": 7.69,
      "CZ": 1.1,// Check Republic
      "DK": 1.46, // Danemark
      "DO": 7.52, //Dominc Republica
  //    "EE": 9.91,
 //     "EG": 0.63,
 //     "ES": 4.96,
 //     "FI": 3.27,
 //     "FR": 43.26,
 //     "GA": 3.03,
      "GB": 193,// United Kingdom
 //     "GE": 809.09,
  //    "GH": 39.78,
  //    "GM": 2.45,
  //    "GN": 45.98,
  //    "GQ": 23.74,
  //    "GR": 154.42,
      "HR": 0.18, // Croatia
      "HU": 0.17, // hungary
      "ID": 8.84,//indonesia
  //    "IE": 17.56,
  //    "IL": 412.24,
      "IN": 63.62,// India
  //    "IQ": 12.96,
  //    "IR": 1.13,
  //    "IT": 44.29,
      "JP": 6.66,//Japan
      "KE": 91.96,// Kenya
 //     "KG": 253.37,
 //     "KH": 0.44,
 //     "KM": 1.26,
      "KZ": 4.3,//Kazakhstan
 //     "LA": 1.33,
 //     "LK": 0.53,
 //     "LR": 692.27,
 //     "LS": 5.9,
//      "LT": 14.44,
//      "LU": 6.95,
 //     "LV": 6.09,
      "MA": 8.28, // moroco
 //     "MD": 83.75,
 //     "ME": 319.75,
  //    "MG": 2386.35,
  //    "MK": 28.83,
  //    "ML": 48.68,
  //    "MM": 40.31,
  //    "MN": 0.66,
 //     "MR": 14.65,
 //     "MT": 11.65,
  //    "MV": 9.35,
      "MX": 23.47,//Mexico
      "MY": 17.04,//malaysia
  //    "MZ": 13.49,
 //     "NA": 12.9,
      "NE": 400.08,// Niger
 //     "NG": 31.44,
  //    "NL": 1.47,
      "NO": 4.5,//Norway
   //   "NP": 10.8,
      "NZ": 9.92,// New zealand
      "PE": 44.69,// Perou
      "PH": 30.77,// Philipine
   //   "PK": 12.4,// Pakistan
      "PL": 4.08,//Poland
   //   "PT": 16.68,
      "RO": 4.79,//romania
    //  "RS": 473.46,
      "RU": 421.38,// Russia
  //    "RW": 5.45,
      "SA": 7.51, //Saoudi Arabia
      "SE": 23.38,//Sweden
      "SG": 10.64,// singapour
   //   "SI": 3.37,
   //   "SK": 112.78,
    //  "SN": 3.37,
   //   "SO": 8.03,
    //  "SS": 19.3,
    //  "TD": 75.63,
     // "TG": 34.84,
      "TH": 27.23,//Tailand
     // "TL": 9.46,
     // "TN": 7.8,
      "TR": 5, //Turkey
      "TZ": 3.72, //Tanzania
      "UA": 18.02,// Ukraine
     // "UG": 62.55,
      "US": 1523.6,// United State
     // "UZ": 0.99,
     // "VE": 179.55,
   //   "VN":12.12,
      "ZA": 87,// South Africa
 //     "ZM": 9.82,
//      "ZW": 0.06
    }



 }