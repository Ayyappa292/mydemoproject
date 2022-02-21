sap.ui.controller("mydemoproject.mycontrollers.cart", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf mydemoproject.cart
*/
//	onInit: function() {
//
//	},
	gotoapp : function(){
		 debugger;
		 var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		 oRouter.navTo("secondview");
		 this.getView().byId("cartvalue");
	 },
onpayment : function(){
	debugger;
	var omodel = this.getView().getModel("mymodel");
	let odata = omodel.getProperty("/cart");
	if(odata.length)
		{
	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	 oRouter.navTo("paymentview");
		}
	else
		{
		alert("add products to cart to proceed");
		}
},
oncancelitem : function(oEvent){
	debugger;
	 var oTable = this.getView().byId("carttable");
	 var aSelectedItems = oTable.getSelectedItems();
	 let op =oEvent.getSource().getBindingContext("mymodel").getObject("price");
	 if(aSelectedItems.length==0)
		 {
		 alert("select a product to delete");
		 }
	 else
		 {
	 for(var i=0; i<aSelectedItems.length; i++){
	    oTable.removeItem(aSelectedItems[i])
	 }
	 let oldprice=this.getView().byId("cartvalue").getValue();
	 let na=parseInt(oldprice);
	 let nb=parseInt(op);
	 let newprice = na-nb;
	 this.getView().byId("cartvalue").setValue(newprice);
	 }
}
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf mydemoproject.cart
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf mydemoproject.cart
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf mydemoproject.cart
*/
//	onExit: function() {
//
//	}

});