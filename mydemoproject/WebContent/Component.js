sap.ui.define([ "sap/ui/core/UIComponent" ], function(UIComponent) {
	"use strict";
	return UIComponent.extend("mydemoproject.Component", {
		metadata : {
			manifest : "json"
		},
		init : function() {
			// call the init function of the parent
			const oDataModel = new sap.ui.model.odata.v2.ODataModel(
			"proxy/sap/opu/odata/sap/ZAR_SB_CATEGORY");
			this.setModel(oDataModel, "oDataModel");
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		},
		createContent : function() {
			var app = new sap.m.App("App");

			return app;
		}
	});
});