define(["dojox/storage/Provider",
        "dojox/storage/manager",
        "dojox/storage/LocalStorageProvider",
        "dojox/storage/GearsStorageProvider",
        "dojox/storage/WhatWGStorageProvider",
        "dojox/storage/FlashStorageProvider",
        "dojox/storage/BehaviorStorageProvider",
        "dojox/storage/CookieStorageProvider"
        /*
		Note: if you are doing Dojo Offline builds you _must_
		have offlineProfile=true when you run the build script:
		./build.sh action=release profile=offline offlineProfile=true
        */
], function(Provider, manager){
	// now that we are loaded and registered tell the storage manager to
	// initialize itself
	manager.initialize();
});