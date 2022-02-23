sap.ui.controller("mydemoproject.mycontrollers.tileview", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf mydemoproject.tileview
	 */
	// onInit: function() {
	//
	// },
	onpress : function() {
		debugger;
		if (!this.newdialog) {
			this.newdialog = sap.ui.xmlfragment(
					"mydemoproject.myfragments.register", this);
		}
		this.newdialog.open();
	},
	oncancledetails : function() {
		debugger;
		this.newdialog.close();
	},
	onsubmitdetails : function() {
		debugger;
		let omodel = this.getView().getModel("mymodel");
		omodel.getProperty("/username");
		let sname = sap.ui.getCore().byId("username").getValue();
		let nnumber = sap.ui.getCore().byId("mobile").getValue();
		let semail = sap.ui.getCore().byId("emailid").getValue();
		let snamepattern = /^[a-zA-Z\s]*$/; // start of patterns
		let semailpattern = /^([A-Za-z0-9_\-\.])+\@([gmail|GMAIL])+\.(com)$/;
		let nnumberpattern = /^[0-9]{10}$/;
		if (snamepattern.test(sname)) // start of pattern checking
		{
			sap.ui.getCore().byId("username").setValueState(
					sap.ui.core.ValueState.None);
		} else {
			sap.ui.getCore().byId("username").setValueState(
					sap.ui.core.ValueState.Error);
		}
		if (semailpattern.test(semail)) {
			sap.ui.getCore().byId("emailid").setValueState(
					sap.ui.core.ValueState.None);
		} else {
			sap.ui.getCore().byId("emailid").setValueState(
					sap.ui.core.ValueState.Error);
		}
		if (nnumberpattern.test(nnumber)) {
			sap.ui.getCore().byId("mobile").setValueState(
					sap.ui.core.ValueState.None);
			omodel.setProperty("/username", sname);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("secondview");
		} else {
			sap.ui.getCore().byId("mobile").setValueState(
					sap.ui.core.ValueState.Error);
		}
	}

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf mydemoproject.tileview
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf mydemoproject.tileview
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf mydemoproject.tileview
 */
// onExit: function() {
//
// }
});