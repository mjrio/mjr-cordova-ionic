# mjr-cordova-ionic

## Cordova
Mobile apps with HTML, CSS & JS that target multiple platforms with one code base.

### Installing Cordova
Cordova runs on Node and is available on NPM.

	npm install -g cordova
	
### Creating a project
The easiest way to get started is to let Cordova do the work and edit it afterwards. 

	cordova create myApp
	
### Add a platform
Cordova 6.x supports:

* iOS
* Android
* Blackberry 10
* Windows (10)
* WP8
* Firefox OS
* Ubuntu
* OS X
* Amazon Fire OS

Lets add the platform Android. Cordova commands need to be executed in a cordova project.

	cd myApp
	cordova platform add android

### Run the platform
Make sure you have the latest android sdk installed. Cordova will build the project and try to open the app on a USB connected device. If one is not found it will start an android emulator.

	cordova run android
	
### Plugins

TODO

##Ionic
Ionic is the beautiful, open source front-end SDK for developing hybrid mobile apps with web technologies.

TODO

##Firebase
Firebase is a scalable realtime backend that lets you build apps fast without managing servers.

TODO