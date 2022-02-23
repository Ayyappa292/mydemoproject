sap.ui.controller("mydemoproject.mycontrollers.payment", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf mydemoproject.payment
	 */
	// onInit: function() {
	//
	// },
	gotoapp : function() {
		debugger;
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("cartview");
		this.getView().byId("cartvalue");
	},
	onsubmitpayment : function() {
		alert("your order is placed successfully");
	}
/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf mydemoproject.payment
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf mydemoproject.payment
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf mydemoproject.payment
 */
// onExit: function() {
//
// }
});