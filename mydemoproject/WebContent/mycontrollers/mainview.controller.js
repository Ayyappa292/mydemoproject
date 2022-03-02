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
		  
		  onInit(){
			debugger;  
		  },
		  /**
			 * For Searching a Category
			 */
	onSearch: function (oEvent) {
		let aFilters = [];
		let sQuery = oEvent.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			let filter = new Filter("name", FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		var oList = this.byId("listid");
		var oBinding = oList.getBinding("items");
		oBinding.filter(aFilters, "categories");
	},
	getSplitAppObj : function() {
		var result = this.byId("splitapp");
		if (!result) 
		{
			Log.info("SplitApp object can't be found");
		}
		return result;
	},
	
	/**
	 * Category Selection change Function
	 */
	onSelectChange : function(oEvent) {
		let list = this.getView().byId("listid").getSelectedItem();
		let oObj = list.getBindingContext("mymodel").getObject();
		let oName = this.getView().getModel("mymodel").getProperty("/details");
		let oItem = oName[oObj.name];
		let aEmpty = this.getView().getModel("mymodel").getProperty("/adetails");
		aEmpty=[...oItem];
		this.getView().getModel("mymodel").setProperty("/adetails",aEmpty);
		var sToPageId = oEvent.getParameter("listItem")
		.getCustomData()[0].getValue();
		this.getSplitAppObj()
		.toDetail(this.createId(sToPageId));
			},
		
		/**
		 * On Item Add to cart Function
		 */
		onAddToCart: function(oEvent){
			let oModel = this.getView().getModel("mymodel");
			let oData = oModel.getProperty("/productdetails");// [cart]
			let sName =oEvent.getSource().getBindingContext("mymodel").getObject("productname");
			let sImg =oEvent.getSource().getBindingContext("mymodel").getObject("productimage");
			let nPrice =oEvent.getSource().getBindingContext("mymodel").getObject("price");
			oData.push({
				productname:sName,
				productimage:sImg,
				price:nPrice
			});
			oModel.setProperty("/cart",oData);
			MessageToast.show("Item Added Successfully");
			let oOldPrice=oModel.getProperty("/cartvalue");
			 let nParse1=parseInt(oOldPrice);
			 let nParse2=parseInt(nPrice);
			 let nNewprice = nParse1+nParse2;
			 oModel.setProperty("/cartvalue",nNewprice);
			 oModel.getProperty("/noitems");
			 let oLen=oData.length;
			 oModel.setProperty("/noitems",oLen);
			
		},
		/**
		 * This Function Navigates to The Cart Page
		 */
		onCart : function(){
			let oModel = this.getView().getModel("mymodel");
			let oData = oModel.getProperty("/cart");
			if(oData.length)
				{
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			 oRouter.navTo("mycart");
				}
			else
				{
				alert("Add at least one Product to View Cart");
				}
		},
		/**
		 * For Item Details
		 */
		onItemPress: function(oEvent){
			debugger;
			let oModel = this.getView().getModel("mymodel");
			let oData = oModel.getProperty("/details");
			let oName = oEvent.getSource().getSelectedItem().getBindingContext("mymodel").getObject();
			// let oDetails= oData.find(element=>element.productname == oName);
			let aArray =  oModel.getProperty("/productdetails");
			aArray=[];
			aArray.push(oName);
			oModel.setProperty("/productdetails",aArray);
			oModel.getProperty("/flexcolumnlayout");
			let oLayout = "TwoColumnsMidExpanded";
			oModel.setProperty("/flexcolumnlayout",oLayout);
			console.log(oModel.getProperty("/productdetails"));
		},
		/**
		 * Handling close mid column
		 */
		
		onHandleClose : function(){
			let oModel = this.getView().getModel("mymodel");
			oModel.getProperty("/flexcolumnlayout");
			let oLayout = "OneColumn";
			oModel.setProperty("/flexcolumnlayout",oLayout);
		}
		
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