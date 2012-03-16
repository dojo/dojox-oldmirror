define([
	"doh/runner",
	"dojo/_base/sniff",
	"./equals",
	"./StatefulModelOptions"
], function(doh, has){
	try{
		var userArgs = window.location.search.replace(/[\?&](dojoUrl|testUrl|testModule)=[^&]*/g, "").replace(/^&/, "?");

		// DOH
		doh.registerUrl("dojox.mvc.tests.doh_mvc_new_shipto-billto-simple", require.toUrl("dojox/mvc/tests/doh_mvc_new_shipto-billto-simple.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_new_ref-set-repeat", require.toUrl("dojox/mvc/tests/doh_mvc_new_ref-set-repeat.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.multiattrib.doh_mvc_test_Toolbar", require.toUrl("dojox/mvc/tests/multiattrib/doh_mvc_test_Toolbar.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.multiattrib.doh_mvc_test_Toolbar_withCtrl", require.toUrl("dojox/mvc/tests/multiattrib/doh_mvc_test_Toolbar_withCtrl.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_search-results-repeat", require.toUrl("dojox/mvc/tests/doh_mvc_search-results-repeat.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_new-mvc_input-output-simple", require.toUrl("dojox/mvc/tests/doh_new-mvc_input-output-simple.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_new-mvc_label_and_totals", require.toUrl("dojox/mvc/tests/doh_new-mvc_label_and_totals.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_mobile-demo", require.toUrl("dojox/mvc/tests/doh_mvc_mobile-demo.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_zero-value-test", require.toUrl("dojox/mvc/tests/doh_mvc_zero-value-test.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_binding-simple", require.toUrl("dojox/mvc/tests/doh_mvc_binding-simple.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_shipto-billto-hierarchical", require.toUrl("dojox/mvc/tests/doh_mvc_shipto-billto-hierarchical.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_ref-template-13263", require.toUrl("dojox/mvc/tests/doh_mvc_ref-template-13263.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_async_mvc_14491-input-output", require.toUrl("dojox/mvc/tests/doh_async_mvc_14491-input-output.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_form-kitchensink", require.toUrl("dojox/mvc/tests/doh_mvc_form-kitchensink.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_programmatic-repeat-store", require.toUrl("dojox/mvc/tests/doh_mvc_programmatic-repeat-store.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_search-results-repeat-store", require.toUrl("dojox/mvc/tests/doh_mvc_search-results-repeat-store.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_template_repeat_exprchar", require.toUrl("dojox/mvc/tests/doh_mvc_template_repeat_exprchar.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_validation-test-simple", require.toUrl("dojox/mvc/tests/doh_mvc_validation-test-simple.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_date_test", require.toUrl("dojox/mvc/tests/doh_mvc_date_test.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_repeat_select_manualsave", require.toUrl("dojox/mvc/tests/doh_mvc_repeat_select_manualsave.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.doh_mvc_repeat_select_cancel", require.toUrl("dojox/mvc/tests/doh_mvc_repeat_select_cancel.html" + userArgs), 999999);
		doh.registerUrl("doh_mvc_loan-stateful", require.toUrl("dojox/mvc/tests/doh_mvc_loan-stateful.html" + userArgs), 999999);
		// DOH regression
		doh.registerUrl("dojox.mvc.tests.regression.doh_mvc_shipto-billto-simple", require.toUrl("dojox/mvc/tests/regression/doh_mvc_shipto-billto-simple.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.doh_mvc_search-results-repeat", require.toUrl("dojox/mvc/tests/regression/doh_mvc_search-results-repeat.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.doh_mvc_search-results-repeat-store", require.toUrl("dojox/mvc/tests/regression/doh_mvc_search-results-repeat-store.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.doh_mvc_programmatic-repeat-store", require.toUrl("dojox/mvc/tests/regression/doh_mvc_programmatic-repeat-store.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.doh_mvc_binding-simple", require.toUrl("dojox/mvc/tests/regression/doh_mvc_binding-simple.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.doh_mvc_ref-set-repeat", require.toUrl("dojox/mvc/tests/regression/doh_mvc_ref-set-repeat.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.doh_mvc_billto-hierarchical", require.toUrl("dojox/mvc/tests/regression/doh_mvc_shipto-billto-hierarchical.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.doh_async_mvc_input-output-simple", require.toUrl("dojox/mvc/tests/regression/doh_async_mvc_input-output-simple.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.doh_async_mvc_zero-value-test", require.toUrl("dojox/mvc/tests/regression/doh_async_mvc_zero-value-test.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.doh_mvc_template_repeat_exprchar", require.toUrl("dojox/mvc/tests/regression/doh_mvc_template_repeat_exprchar.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.doh_mvc_form-kitchensink", require.toUrl("dojox/mvc/tests/regression/doh_mvc_form-kitchensink.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.doh_mvc_date_test", require.toUrl("dojox/mvc/tests/regression/doh_mvc_date_test.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.doh_mvc_validation-test-simple", require.toUrl("dojox/mvc/tests/regression/doh_mvc_validation-test-simple.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.doh_new-mvc_input-output-simple.html", require.toUrl("dojox/mvc/tests/doh_new-mvc_input-output-simple.html" + userArgs), 999999);
		// Robot regression
		doh.registerUrl("dojox.mvc.tests.regression.robot.mvc_loan-stateful", require.toUrl("dojox/mvc/tests/regression/robot/mvc_loan-stateful.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.robot.mobile-demo-test", require.toUrl("dojox/mvc/tests/regression/robot/mobile-demo-test.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.robot.mvc_shipto-billto-simple", require.toUrl("dojox/mvc/tests/regression/robot/mvc_shipto-billto-simple.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.robot.mvc_generate-view", require.toUrl("dojox/mvc/tests/regression/robot/mvc_generate-view.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.robot.mvc_loan-stateful", require.toUrl("dojox/mvc/tests/regression/robot/mvc_loan-stateful.html" + userArgs), 999999);
		//doh.registerUrl("dojox.mvc.tests.regression.robot.mvc_ref-set-repeat", require.toUrl("dojox/mvc/tests/regression/robot/mvc_ref-set-repeat.html" + userArgs), 999999);
		//doh.registerUrl("dojox.mvc.tests.regression.robot.mvc_search-results-repeat", require.toUrl("dojox/mvc/tests/regression/robot/mvc_search-results-repeat.html" + userArgs), 999999);
		doh.registerUrl("dojox.mvc.tests.regression.robot.mvc_search-results-ins-del", require.toUrl("dojox/mvc/tests/regression/robot/mvc_search-results-ins-del.html" + userArgs), 999999);
		//doh.registerUrl("dojox.mvc.tests.regression.robot.iphone_shipto-billto", require.toUrl("dojox/mvc/tests/regression/robot/iphone_shipto-billto.html" + userArgs), 999999);
		//doh.registerUrl("dojox.mvc.tests.regression.robot.android_repeat-ins", require.toUrl("dojox/mvc/tests/regression/robot/android_repeat-ins.html" + userArgs), 999999);
		//doh.registerUrl("dojox.mvc.tests.regression.robot.mvc_shipto-billto-hierarchical", require.toUrl("dojox/mvc/tests/regression/robot/mvc_shipto-billto-hierarchical.html" + userArgs), 999999);
	}catch(e){
		doh.debug(e);
	}
});
