sap.ui.controller("mydemoproject.mycontrollers.loginview", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf mydemoproject.loginview
	 */
	onInit : function() {
		var Component = this.getOwnerComponent();
		var oDataModel = Component.getModel("oDataModel");
		var oModel = Component.getModel("myModel");
		oDataModel.read('/customer', {
			urlParameters:{
				"$expand" : "to_orders/to_orderdetails"
			},
			success : function(oResponse) {
				oModel.setProperty("/customerdata", oResponse.results);
			},
			error : function(oResponse) {
			}
		})
			
	},

	onlogin : function() {
		let oModel = this.getView().getModel("myModel");
		let oData = oModel.getData();
		var sUserName = this.getView().byId("sUserName").getValue();
		var sPassword = this.getView().byId("sPassword").getValue();
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		var aUserDetails = jQuery.grep(oData.customerdata, function(e) {
			return e.CustName === sUserName;
		});
		oModel.setProperty("/currentUser", aUserDetails[0]);
		if (aUserDetails[0].CustName == sUserName
				&& aUserDetails[0].CustPassword == sPassword) {
			oRouter.navTo("mainview");
			var oDialog = sap.ui
					.xmlfragment("mydemoproject.myfragments.BusyDialog");
			oDialog.open();
			setTimeout(function() {
				oDialog.close();
			}, 3000);
			this.getView().byId("sUserName").setValue("");
			this.getView().byId("sPassword").setValue("");

		} else {
			alert("invalid details");
		}
	},
	onRegister : function() {
		if (!this.newdialog) {
			this.newdialog = sap.ui.xmlfragment(
					"mydemoproject.myfragments.register", this);
			this.getView().addDependent(this.newdialog);
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
		let oModel = this.getView().getModel("myModel");
		let sName = sap.ui.getCore().byId("username").getValue();
		let nNumber = sap.ui.getCore().byId("mobile").getValue();
		let sEmail = sap.ui.getCore().byId("emailid").getValue();
		let nCustId = sap.ui.getCore().byId("custno").getValue();
		let sPassword = sap.ui.getCore().byId("password").getValue();
		let sNamePattern = /^[a-zA-Z\s]{3,15}$/; // start of patterns
		let sEmailPattern = /^([A-Za-z0-9_\-\.])+\@([gmail|GMAIL])+\.(com)$/;
		let nNumberPattern = /^[0-9]{9}$/;
		if (sNamePattern.test(sName)) // start of pattern checking
		{
			sap.ui.getCore().byId("username").setValueState(
					sap.ui.core.ValueState.None);
		} else {
			sap.ui.getCore().byId("username").setValueState(
					sap.ui.core.ValueState.Error);
		}
		if (sEmailPattern.test(sEmail)) {
			sap.ui.getCore().byId("emailid").setValueState(
					sap.ui.core.ValueState.None);
		} else {
			sap.ui.getCore().byId("emailid").setValueState(
					sap.ui.core.ValueState.Error);
		}
		if (nNumberPattern.test(nNumber)) {
			sap.ui.getCore().byId("mobile").setValueState(
					sap.ui.core.ValueState.None);
			var Component = this.getOwnerComponent();
			var oDataModel = Component.getModel("oDataModel");
			var oNewUser = oModel.getProperty("/newUser");
			oNewUser = {
				"CustName" : sName,
				"CustPassword" : sPassword,
				"CustEmail" : sEmail,
				"CustId" : JSON.parse(nCustId),
				"CustPhoneNo" : JSON.parse(nNumber)
			}
			oModel.setProperty("/currentUser", oNewUser);
			oDataModel.create("/customer", oNewUser, {
				success : function(oResponse) {
					var oDialog = sap.ui
					.xmlfragment("mydemoproject.myfragments.BusyDialog");
			oDialog.open();
			setTimeout(function() {
				oDialog.close();
			}, 3000);
				},
				error : function(oResponse) {
				}
			})

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("mainview");
			var oDialog = sap.ui
					.xmlfragment("mydemoproject.myfragments.BusyDialog");
			oDialog.open();
			setTimeout(function() {
				oDialog.close();
			}, 3000);
			sap.ui.getCore().byId("username").setValue("");
			sap.ui.getCore().byId("mobile").setValue("");
			sap.ui.getCore().byId("emailid").setValue("");
			sap.ui.getCore().byId("custno").setValue("");
			sap.ui.getCore().byId("password").setValue("");
		} else {
			sap.ui.getCore().byId("mobile").setValueState(
					sap.ui.core.ValueState.Error);
		}
	},

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf mydemoproject.loginview
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf mydemoproject.loginview
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf mydemoproject.loginview
 */
// onExit: function() {
//
				// }
				});