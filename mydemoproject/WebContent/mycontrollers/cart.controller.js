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
		var oModel = this.getView().getModel("myModel");
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
		let oDeleteRecord = oEvent.getSource().getBindingContext("myModel").getObject();
		let oModel = this.getView().getModel("myModel");
		let aCart = oModel.getProperty("/cart");
		for (var i = 0; i < aCart.length; i++) {
			if (aCart[i] == oDeleteRecord) {
				aCart.splice(i, 1);
				oModel.setProperty("/cart", aCart);
				let oOldPrice = oModel.getProperty("/cartvalue");
				let nOldPrice = parseInt(oOldPrice);
				let nNewPrice = parseInt(oDeleteRecord.ProductPrice);
				let nUpdatePrice = nOldPrice - nNewPrice;
				oModel.setProperty("/cartvalue", nUpdatePrice);
				oModel.getProperty("/noitems");
				let nLen = aCart.length;
				oModel.setProperty("/noitems", nLen);
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