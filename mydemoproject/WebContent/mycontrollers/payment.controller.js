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
	/**
	 * This Function goes Back to the Cart Page
	 */
	onGoToCart : function() {
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("mycart");
		this.getView().byId("cartvalue");
	},
	/**
	 * Payment Validation is Done here 
	 */
	onSubmitPayment : function() {
		debugger;
		let transid = Math.floor(100000 + Math.random() * 9000);
		let oModel = this.getView().getModel("myModel");
		let oData = oModel.getProperty("/transactionid");
		oModel.setProperty("/transactionid",transid);
		let nOtp = Math.floor(1000 + Math.random() * 9000);
		oModel.setProperty("/otpno",nOtp);
		let nCartValue = oModel.getProperty("/cartvalue");
		let sName = this.getView().byId("name").getValue();
		let sStreetName = this.getView().byId("streetname").getValue();
		let nStreetNo = this.getView().byId("streetno").getValue();
		let nCode = this.getView().byId("zipcode").getValue();
		let sCity = this.getView().byId("city").getValue();
		let nCardNo = this.getView().byId("cardno").getValue();
		let nCvv = this.getView().byId("cvv").getValue();
		let sNamePattern = /^[a-zA-Z\s]{3,15}$/; 
		let sStreetNamePattern= /^[a-zA-Z\s]{3,15}$/; 
		let nStreetNoPattern = /^[a-zA-Z0-9-\_\/]$/;
		let nCodePattern = /^[0-9]{5}$/;
		let sCityPattern = /^[a-zA-Z\s]{3,10}$/;
		let nCardNoPattern = /^[0-9]{16}$/;
		let nCvvPattern = /^[0-9]{3}$/;
		if (sNamePattern.test(sName)) 
		{
			this.getView().byId("name").setValueState(sap.ui.core.ValueState.None);
		} else {
			this.getView().byId("name").setValueState(sap.ui.core.ValueState.Error);
		}
		if (sStreetNamePattern.test(sStreetName))
		{
			this.getView().byId("streetname").setValueState(sap.ui.core.ValueState.None);
		} else {
			this.getView().byId("streetname").setValueState(sap.ui.core.ValueState.Error);
		}
		if (nStreetNoPattern.test(nStreetNo)) 
		{
			this.getView().byId("streetno").setValueState(sap.ui.core.ValueState.None);
		} else {
			this.getView().byId("streetno").setValueState(sap.ui.core.ValueState.Error);
		}
		if (nCodePattern.test(nCode))
		{
			this.getView().byId("zipcode").setValueState(sap.ui.core.ValueState.None);
		} else {
			this.getView().byId("zipcode").setValueState(sap.ui.core.ValueState.Error);
		}
		if (sCityPattern.test(sCity)) 
		{
			this.getView().byId("city").setValueState(sap.ui.core.ValueState.None);
		} else {
			this.getView().byId("city").setValueState(sap.ui.core.ValueState.Error);
		}
		if (nCardNoPattern.test(nCardNo)) 
		{
			this.getView().byId("cardno").setValueState(sap.ui.core.ValueState.None);
		} else {
			this.getView().byId("cardno").setValueState(sap.ui.core.ValueState.Error);
		}
		if (nCvvPattern.test(nCvv))
		{
			this.getView().byId("cvv").setValueState(sap.ui.core.ValueState.None);
			new sap.m.MessageToast.show("your order is placed Successfully");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			 oRouter.navTo("mybilldetails");
			 var oDialog = sap.ui.xmlfragment("mydemoproject.myfragments.BusyDialog");
			 oDialog.open();
			 setTimeout(function() {
			 oDialog.close();
			 }, 3000);
			this.getView().byId("combobox1").setValue(null);
			this.getView().byId("combobox2").setValue(null);
			this.getView().byId("Date").setValue(null);
			this.getView().byId("name").setValue("");
			this.getView().byId("streetname").setValue("");
			this.getView().byId("streetno").setValue("");
			this.getView().byId("zipcode").setValue("");
			this.getView().byId("city").setValue("");
			this.getView().byId("cardno").setValue("");
			this.getView().byId("cvv").setValue("");
			let oCurrentUser = oModel.getProperty("/currentUser");
			let aCart = oModel.getProperty("/cart");
			var Component = this.getOwnerComponent();
			var oDataModel = Component.getModel("oDataModel");
	    	  oOrder = {
						"CustId":oCurrentUser.CustId,
						"TransId":transid,
						"TotalAmount":nCartValue
				}
	            oDataModel.create("/orders", oOrder, {
	                  method: "POST",  function(){
	                	  var oDialog = sap.ui.xmlfragment("mydemoproject.myfragments.BusyDialog");
	                	  oDialog.open();
	                	  setTimeout(function() {
	                	  oDialog.close();
	  			          }, 3000);
	                  },function(){
	                        sap.m.MessageToast.show('Order failed',{duration:1000});

	                  }});
	    		 oDataModel.setUseBatch(true);
	 			for (var i = 0; i < aCart.length; i++){
	 				let nItemUniqueCode = Math.floor(10000 + Math.random() * 9000);
	 				oOrderDetails= {
						  "CustId":oCurrentUser.CustId,
						  "TransId":transid,
						  "ItemCode":nItemUniqueCode,
						  "ProductName":aCart[i].ProductName,
						  "ProductPrice":aCart[i].ProductPrice,
						  "ProductImage":aCart[i].ProductImage,
						  "ProductSupplier":aCart[i].ProductSupplier
					}
	 				 oDataModel.create("/orderdetails", oOrderDetails, {
		                  method: "POST",  function(){
		                	  var oDialog = sap.ui.xmlfragment("mydemoproject.myfragments.BusyDialog");
		                	  oDialog.open();
		                	  setTimeout(function() {
		                	  oDialog.close();
		  			          }, 3000);
		                  },function(){
		                        sap.m.MessageToast.show('Order failed',{duration:1000});

		                  }});
	 			}
	 			oDataModel.setUseBatch(false);
		} else {
			this.getView().byId("cvv").setValueState(sap.ui.core.ValueState.Error);
			alert("Please Enter all your details")
		}
		
	}

	/*for(var i=0;i<aOrder.length;i++)
	  {
	  NewData = {
	 
	  };
	   batchChanges.push( oModel.createBatchOperation("/CREATE_DVR", "POST", NewData) ); 
	  }
	  console.log(batchChanges);
	  oModel.addBatchChangeOperations(batchChanges); 
	  oModel.submitBatch(function(data) { 
	       oModel.refresh(); 
	      console.log(data);

	     }, function(err) { 

	       alert("Error occurred "); 

	     }); 
	*/
	
	
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