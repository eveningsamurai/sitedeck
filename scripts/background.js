//================================================
/*

SiteDeck
Copyright: Avinash Padmanabhan

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
//

webFrame.setState(false);
chrome.browserAction.onClicked.addListener(function(tab) {
	var tabId = tab.id;
	if(webFrame.getState() == "false"){
		webFrame.setState(true);
		chrome.browserAction.setBadgeBackgroundColor({ color: [0, 153, 0, 255] });
		chrome.browserAction.setBadgeText({text: "ON"});
		window.runner = setInterval(function() {
			for(site in webFrame.getCycleThroughSites()) {
				chrome.tabs.update(tabId, { url: site } );
				pausecomp(webFrame.getIntervalTimer());
			}
		}, 500);
	} else {
		webFrame.setState(false);
		window.runner = window.clearInterval(window.runner);
		chrome.browserAction.setBadgeBackgroundColor({ color: [153, 0, 0, 255] });
		chrome.browserAction.setBadgeText({text: "OFF"});
	}
});

function pausecomp(ms) {
	ms = parseInt(ms);
	ms += new Date().getTime();
	while (new Date() < ms){}
}
