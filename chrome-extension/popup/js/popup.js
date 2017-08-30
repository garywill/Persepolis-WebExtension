/*
* pdm-chrome-wrapper (forked from uget-chrome-wrapper ) is an extension to integrate PDM Download manager
* with Google Chrome, Chromium and Vivaldi in Linux and Windows.
*
* Copyright (C) 2016  Gobinath
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


if(typeof browser !== 'undefined' )
    BrowserNameSpace = browser ;
else if(typeof chrome !== 'undefined' )
    BrowserNameSpace = chrome;


function saveSettings() {
    let keywords = keywordsDom.val();
    let interrupt = chkDom.checked;
    localStorage["pdm-keywords"] = keywords;
    BrowserNameSpace.runtime.getBackgroundPage(function(backgroundPage) {
        backgroundPage.updateKeywords(keywords);
        backgroundPage.setInterruptDownload(interrupt, true);
    });
    window.close();
}
let keywordsDom,chkDom;
//Do after load
$(document).ready(function () {
    keywordsDom = $('#keywords');
    chkDom = $('#chk-interrupt');

    keywordsDom.on("change",saveSettings);
    chkDom.on("change",saveSettings);
    
    let interrupt = (localStorage["pdm-interrupt"] == "true");
    keywordsDom.val(localStorage["pdm-keywords"]);
    chkDom.checked = interrupt;
});
