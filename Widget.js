define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'jimu/BaseWidget',
    'dojo/on',
	'esri/map'

],
  function(declare, lang, BaseWidget, on,Map) {
  //To create a widget, you need to derive from BaseWidget.
	return declare([BaseWidget], {

		baseClass: 'jimu-widget-zoomlevelinfo',

		postCreate: function() {
			this.inherited(arguments);
			console.log('postCreate');
			this.own(on(this.map, 'extent-change', lang.hitch(this, this._zoomInfo)));
			this._zoomInfo();
		},

		startup: function() {
			this.inherited(arguments);
		},
		_zoomInfo: function(){
			scale = esri.geometry.getScale(this.map); 
				console.log(scale);
			var map = this.map;
			console.log(map);
			var json = this.config;
			if (json.settings.ZoomSetCheckbox){
				this.MapZoomInfo.innerHTML = this.map.getZoom();
			} else {
				dojo.destroy(this.zoomInfoDiv);
			}
			if (json.settings.ScaleSetCheckbox){
				this.scaleInfo.innerHTML = "1:" + Math.round(this.map.getScale()/1000)*1000 ;
			} else {
				dojo.destroy(this.scaleInfoDiv);
			}
		}
	});
});