sap.ui.define([ "sap/ui/core/UIComponent" ], function(UIComponent) {
	"use strict";
	return UIComponent.extend("mydemoproject.Component", {
		metadata : {
			manifest : "json"
		},
		init : function() {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		},
		createContent : function() {
			var app = new sap.m.App("App");
//			var SplitApp = new sap.m.SplitApp("splitappview");
//			 var page1 = sap.ui.view({id:"view1",
//			 viewName:"mydemoproject.myviews.tileview",
//			 type:sap.ui.core.mvc.ViewType.XML});
//			 var page2 = sap.ui.view({id:"view2",
//			 viewName:"mydemoproject.myviews.mainview",
//			 type:sap.ui.core.mvc.ViewType.XML});
//			 var page3 = sap.ui.view({id:"view3",
//			 viewName:"mydemoproject.myviews.cart",
//			 type:sap.ui.core.mvc.ViewType.XML});
//			 var page4 = sap.ui.view({id:"view4",
//			 viewName:"mydemoproject.myviews.payment",
//			 type:sap.ui.core.mvc.ViewType.XML});
//			var page5 = sap.ui.view({id:"view5",
//				 viewName:"mydemoproject.myviews.detail",
//				 type:sap.ui.core.mvc.ViewType.XML});
//			
//			app.addPage(page1).addPage(page2).addPage(page3).addPage(page4).addPage(page5);
			return app;
//			return SplitApp;
		}
	});
});