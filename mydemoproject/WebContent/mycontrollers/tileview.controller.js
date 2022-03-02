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
	/**
	 * This Function open dialog to take inital user details
	 */
	onPress : function() {
		if (!this.newdialog) {
			this.newdialog = sap.ui.xmlfragment("mydemoproject.myfragments.register", this);
		}
		this.newdialog.open();
	},
	
	/**
	 * Closes the Dialog
	 */
	onCancleDetails : function() {
		this.newdialog.close();
	},
	/**
	 * Validation of User Details in the Dialog
	 */
	onSubmitDetails : function() {
	
		let oModel = this.getView().getModel("mymodel");
		oModel.getProperty("/username");
		let sName = sap.ui.getCore().byId("username").getValue();
		let nNumber = sap.ui.getCore().byId("mobile").getValue();
		let sEmail = sap.ui.getCore().byId("emailid").getValue();
		let sNamePattern = /^[a-zA-Z\s]{3,15}$/; // start of patterns
		let sEmailPattern = /^([A-Za-z0-9_\-\.])+\@([gmail|GMAIL])+\.(com)$/;
		let nNumberPattern = /^[0-9]{10}$/;
		if (sNamePattern.test(sName)) // start of pattern checking
		{
			sap.ui.getCore().byId("username").setValueState(sap.ui.core.ValueState.None);
		} else {
			sap.ui.getCore().byId("username").setValueState(sap.ui.core.ValueState.Error);
		}
		if (sEmailPattern.test(sEmail)) 
		{
			sap.ui.getCore().byId("emailid").setValueState(sap.ui.core.ValueState.None);
		} else {
			sap.ui.getCore().byId("emailid").setValueState(sap.ui.core.ValueState.Error);
		}
		if (nNumberPattern.test(nNumber))
		{
			sap.ui.getCore().byId("mobile").setValueState(sap.ui.core.ValueState.None);
			oModel.setProperty("/username", sName);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("mainview");
		} else 
		{
			sap.ui.getCore().byId("mobile").setValueState(sap.ui.core.ValueState.Error);
		}
	},
	/**
	 * navigates to Admin tile
	 */
	onAdmin : function(){
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		 oRouter.navTo("myadmin");
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