sap.ui.controller("mydemoproject.mycontrollers.cart", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf mydemoproject.cart
	 */
	// onInit: function() {
	//
	// },
	/**
	Back Navigation From Cart Page to Main Page
	**/
	onGoToApp : function() {
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("mainview");
		this.getView().byId("cartvalue");
	},
	
	/**
	 To Navigate to Payment Page
	 **/
	onPayment : function() {
		var oModel = this.getView().getModel("mymodel");
		let oData = oModel.getProperty("/cart");
		if (oData.length) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("paymentview");
		} else {
			alert("add products to cart to proceed");
		}
	},
	/**
	 * For Deletion or Cancelation of an Item from the Cart
	 */
	onCancelItem : function(oEvent) {
		let nPrice = oEvent.getSource().getBindingContext("mymodel").getObject("price");
		let oDeleteRecord = oEvent.getSource().getBindingContext("mymodel").getObject();
		let oModel = this.getView().getModel("mymodel");
		let oData = oModel.getProperty("/cart");
		for (var i = 0; i < oData.length; i++) {
			if (oData[i] == oDeleteRecord) {
				oData.splice(i, 1);
				oModel.setProperty("/cart", oData);
				let oOldPrice = oModel.getProperty("/cartvalue");
				let nParse1 = parseInt(oOldPrice);
				let nParse2 = parseInt(nPrice);
				let nNewPrice = nParse1 - nParse2;
				oModel.setProperty("/cartvalue", nNewPrice);
				oModel.getProperty("/noitems");
				let oLen = oData.length;
				oModel.setProperty("/noitems", oLen);
				sap.m.MessageToast.show("ItemRemoved");
			}
		}
	}
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf mydemoproject.cart
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf mydemoproject.cart
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf mydemoproject.cart
 */
// onExit: function() {
//
// }
});