//================================================
/*

Site Deck

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.


To view a copy of this license, visit http://creativecommons.org/licenses/GPL/2.0/

*/
//================================================
var myStorage = (function() {
	var my = {};

	my.get = function(key) {
		return localStorage.getItem(key);
	}
   my.put = function (key, value) {
       return localStorage.setItem(key, value);
   }
   my.delete = function (key) {
       return localStorage.removeItem(key);
   }
   
   return my;
}());

var webFrame = (function(myStorage) {
	var my = {};

	my.cycleThroughSites = {
        "http://www.google.com"        : "Google",
        "http://www.yahoo.com"           : "Yahoo",
        "http://www.bing.com"       : "Bing"
	}

	if(!myStorage.get("cycleList")) {
		myStorage.put("cycleList", JSON.stringify(my.cycleThroughSites));
		myStorage.put("intervalTimer", "10000");
		myStorage.put("state", false);
	}

	my.getCycleThroughSites = function () {
		return JSON.parse(myStorage.get("cycleList"));
	}

	my.addCycleThroughSite = function(site) {
		my.cycledThroughSites = JSON.parse(myStorage.get("cycleList"));
		my.cycledThroughSites[site] = "Custom Add";
		myStorage.put("cycleList", JSON.stringify(my.cycledThroughSites));
	}

	my.removeCycleThroughSite = function(site) {
		my.cycledThroughSites = JSON.parse(myStorage.get("cycleList"));
		delete my.cycledThroughSites[site];
		myStorage.put("cycleList", JSON.stringify(my.cycledThroughSites));
	}

	my.getState = function() {
		return myStorage.get("state");
	}

	my.setState = function(state) {
		myStorage.put("state", state);
	}

	my.getIntervalTimer = function() {
		return myStorage.get("intervalTimer");
	}

	my.setIntervalTimer = function(millis) {
		myStorage.put("intervalTimer", millis);
	}

	return my;
}(myStorage));
