/*
 * @Author: fghpdf
 * @Date: 2023-02-02 19:59:21
 * @LastEditTime: 2023-02-05 22:12:06
 * @LastEditors: fghpdf
 */
let active = false;

function makeOrange(color: string): void {
    document.body.style.backgroundColor = color;
}

function getFacilities(facilitiesDivId: string): string {
    const facilitiesDiv = document.getElementById(facilitiesDivId);
    if (!facilitiesDiv) {
        console.warn(`div#${facilitiesDivId} can not be found`);
        return '';
    }
    const facilitiesLis = facilitiesDiv.getElementsByTagName('li');
    if (!facilitiesLis || facilitiesLis.length == 0) {
        console.warn(`div#${facilitiesDivId} no li`);
        return '';
    }

    const facilitiesStr = facilitiesLis[0].textContent;
    if (!facilitiesStr) {
        console.warn(`div#${facilitiesDivId} li no context`);
        return '';
    }
    console.log(facilitiesStr);
    return facilitiesStr;
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id ? tab.id : -1},
        func: getFacilities,
        args: ["bkdt-option"]
    }).then();
});