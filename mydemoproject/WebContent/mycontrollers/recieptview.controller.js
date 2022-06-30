sap.ui.controller("mydemoproject.mycontrollers.recieptview", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf mydemoproject.recieptview
*/
	onInit: function() {
		var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var Minutes = today.getMinutes();
        var Seconds = today.getSeconds();
        var today1 = ( dd+'.'+mm+'.'+yyyy+' '+hour+':'+Minutes+':'+Seconds);
        this.getView().byId("date").setText(today1.valueOf(Text));


	},
/**
 * going back to shop function 
 */
	onGoToShop : function(){
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		 oRouter.navTo("mainview");
		let oModel = this.getView().getModel("myModel");
		let oData = oModel.getProperty("/cart");
		let oOldPrice = oModel.getProperty("/cartvalue");
		let aArray=[];
		oModel.setProperty("/cart",aArray);
		let nNewPrice = 0;
		oModel.setProperty("/cartvalue", nNewPrice);
		oModel.getProperty("/noitems");
		let oLen = 0
		oModel.setProperty("/noitems", oLen);
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf mydemoproject.recieptview
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf mydemoproject.recieptview
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf mydemoproject.recieptview
*/
//	onExit: function() {
//
//	}

});