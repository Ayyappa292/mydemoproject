sap.ui.define([
        "sap/ui/core/mvc/Controller",
    	"sap/ui/model/Filter",
    	"sap/ui/model/FilterOperator",
    	"sap/m/MessageToast",
              ],function(Controller,Filter,FilterOperator,MessageToast){
	              "use strict";
	  return Controller.extend("mydemoproject.mycontrollers.mainview",{
/*
 * onInit: function() { },
 */  
	onSearch: function (oEvent) {
		debugger;
		var aFilters = [];
		var sQuery = oEvent.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new Filter("name", FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		var oList = this.byId("listid");
		var oBinding = oList.getBinding("items");
		oBinding.filter(aFilters, "categories");
	},
	getSplitAppObj : function() {
		var result = this.byId("splitapp");
		if (!result) {
			Log.info("SplitApp object can't be found");
		}
		return result;
	},
	onselectChange : function(oEvent) {
		debugger;
		let list = this.getView().byId("listid").getSelectedItem();
		let oobj = list.getBindingContext("mymodel").getObject();
		let selected = {};
		let oname = this.getView().getModel("mymodel").getProperty("/details");
		let otile = oname[oobj.name];
		let xy = this.getView().getModel("mymodel").getProperty("/adetails");
		xy = [];
		this.getView().getModel("mymodel").setProperty("/adetails",xy);
		xy=[...otile];
		this.getView().getModel("mymodel").setProperty("/adetails",xy);
		var sToPageId = oEvent.getParameter("listItem")
		.getCustomData()[0].getValue();
		this.getSplitAppObj()
		.toDetail(this.createId(sToPageId));
		},
		onaddtocart: function(oEvent){
			debugger;
			var omodel = this.getView().getModel("mymodel");
			let odata = omodel.getProperty("/cart");
			let sname =oEvent.getSource().getBindingContext("mymodel").getObject("productname");
			let simg =oEvent.getSource().getBindingContext("mymodel").getObject("productimage");
			let np =oEvent.getSource().getBindingContext("mymodel").getObject("price");
			odata.push({
				productname:sname,
				productimage:simg,
				price:np
			});
			omodel.setProperty("/cart",odata);
			MessageToast.show("Item Added Successfully");
			let oldprice=omodel.getProperty("/cartvalue");
			 let na=parseInt(oldprice);
			 let nb=parseInt(np);
			 let newprice = na+nb;
			 omodel.setProperty("/cartvalue",newprice);
			 omodel.getProperty("/noitems");
			 let olen=odata.length;
			 omodel.setProperty("/noitems",olen);
			
		},
		oncart : function(){
			debugger;
			var omodel = this.getView().getModel("mymodel");
			let odata = omodel.getProperty("/cart");
			if(odata.length)
				{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			 oRouter.navTo("cartview");
				}
			else
				{
				alert("Add at least one Product to View Cart");
				}
		},
		onitempress : function(oEvent){
			debugger;
			// let list = this.getView().byId("id2").getSelectedItem();
			var sToPageId = oEvent.getParameter("id2")
			.getCustomData()[0].getValue();
			this.getSplitAppObj()
			.toDetail(this.createId(sToPageId));
		},
		
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf mydemoproject.mainview
 */
// onBeforeRendering: function() {
//
// },

/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf mydemoproject.mainview
 */
// onAfterRendering: function() {
//
// },

/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf mydemoproject.mainview
 */
// onExit: function() {
//
// }

	  });

});