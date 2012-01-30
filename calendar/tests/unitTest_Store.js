define(["doh", "../Calendar", "dojo/_base/Deferred", "dojo/store/JsonRest"],
	function(doh, Calendar, Deferred, JsonRest){
	doh.register("tests.unitTest_Store", [
		function test_Error(t){
			var calendar = new Calendar();
			var d = Deferred.when(calendar.set("store", new JsonRest({ target: "/" }), function(){
				t.f(true, "ok fct must not have been called");
			}, function(){
				t.t(true, "failure fct must have been called");
			}));
			calendar.startup();
		}
	]);
});
