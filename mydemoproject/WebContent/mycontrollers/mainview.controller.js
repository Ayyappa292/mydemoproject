sap.ui.define([
        "sap/ui/core/mvc/Controller",
    	"sap/ui/model/Filter",
    	"sap/ui/model/FilterOperator",
    	"sap/m/MessageToast",
    	"sap/ui/core/Fragment",
              ],function(Controller,Filter,FilterOperator,MessageToast){
	              "use strict";
	  return Controller.extend("mydemoproject.mycontrollers.mainview",{

/*
 * onInit: function() { var nOldValue =
 * this.getView().byId("CurrentValue").getValue(); },
 */
 
// //
// onInit(){
// },
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
		debugger;
		let list = this.getView().byId("listid").getSelectedItem();
		let oObj = list.getBindingContext("myModel").getObject();
		let aProductData = oObj.to_product.results;
		this.getView().getModel("myModel").setProperty("/productdata",aProductData);
		/*let oName = this.getView().getModel("myModel").getProperty("/categorydata");
		let oItem = oName[oObj.CategoryName];
		let aEmpty = this.getView().getModel("myModel").getProperty("/productdata");
		aEmpty=[...oItem];
		this.getView().getModel("myModel").setProperty("/adetails",aEmpty);*/
		var sToPageId = oEvent.getParameter("listItem")
		.getCustomData()[0].getValue();
		this.getSplitAppObj()
		.toDetail(this.createId(sToPageId));
			},
		
		/**
		 * On Item Add to cart Function
		 */
		onAddToCart: function(oEvent){
			let oModel = this.getView().getModel("myModel");
			let oSelectedProduct = oEvent.getSource().getBindingContext("myModel").getObject()
			let aCart = oModel.getProperty("/cart");
			aCart.push({
				ProductName:oSelectedProduct.ProductName,
				ProductImage:oSelectedProduct.ProductImage,
				ProductPrice:oSelectedProduct.ProductPrice,
				ProductSupplier:oSelectedProduct.ProductSupplier,
				ProductId:oSelectedProduct.ProductId
			});
			oModel.setProperty("/cart",aCart);
			MessageToast.show("Item Added Successfully");
			let oOldPrice=oModel.getProperty("/cartvalue");
			 let nOldPrice=parseInt(oOldPrice);
			 let nNewPrice=parseInt(oSelectedProduct.ProductPrice);
			 let nUpdatePrice = nOldPrice+nNewPrice;
			 oModel.setProperty("/cartvalue",nUpdatePrice);
			 oModel.getProperty("/noitems");
			 let nLen=aCart.length;
			 oModel.setProperty("/noitems",nLen);	
		},
		/**
		 * This Function Navigates to The Cart Page
		 */
		onCart : function(){
			let oModel = this.getView().getModel("myModel");
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
			let oModel = this.getView().getModel("myModel");
			let oObj = oEvent.getSource().getSelectedItem().getBindingContext("myModel").getObject();
			let aArray =  oModel.getProperty("/productdetails");
			aArray=[];
			aArray.push(oObj);
			oModel.setProperty("/productdetails",aArray);
			oModel.getProperty("/flexcolumnlayout");
			let oLayout = "TwoColumnsMidExpanded";
			oModel.setProperty("/flexcolumnlayout",oLayout);
			
		},
		/**
		 * Handling close mid column
		 */
		
		onHandleClose : function(){
			let oModel = this.getView().getModel("myModel");
			oModel.getProperty("/flexcolumnlayout");
			let oLayout = "OneColumn";
			oModel.setProperty("/flexcolumnlayout",oLayout);
		},
		
		/*
		 * onWriteReview : function(){ if (!this.newdialog) { this.newdialog =
		 * sap.ui.xmlfragment("mydemoproject.myfragments.review", this); }
		 * this.newdialog.open();
		 * 
		 *  }, onPostReview : function(oEvent){ debugger; let sReview =
		 * sap.ui.getCore().byId("review").getValue(); let oModel =
		 * this.getView().getModel("myModel"); let oData =
		 * oModel.getProperty("/productreview3")
		 * oModel.setProperty("/productreview3",sReview);
		 * this.newdialog.close(); },
		 * 
		 *//**
			 * Closes the Dialog
			 *//*
			 * onCancelReview : function() { this.newdialog.close(); },
			 */
			
		
 /**
	 * for popover
	 */
		onAvatarPressed: function(oEvent) {
		     if (!this.oPopover) {
		    	    this._oPopover = sap.ui.xmlfragment("mydemoproject.myfragments.view",this);
		    	    this.getView().addDependent(this._oPopover);
		    	   }  
		    	   this._oPopover.openBy(oEvent.getSource());
		 },
		
		/**
		 * logout
		 */
		handlelogoutPress : function ( oEvent){
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			 oRouter.navTo("firstview");
		},
		onMyOrders : function (){
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("myorders");
		},
		/*
		 * Show Notifications
		 */
		onNotificationPress : function(oEvent){
			debugger;
		     if (!this.oPopoverNotification) {
		    	    this._oPopoverNotification = sap.ui.xmlfragment("mydemoproject.myfragments.notification",this);
		    	    this.getView().addDependent(this._oPopoverNotification);
		    	   }  
		    	   this._oPopoverNotification.openBy(oEvent.getSource());
			
		}
		
		
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the
		 * controller's View is re-rendered (NOT before the first rendering!
		 * onInit() is used for that one!).
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