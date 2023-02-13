/*
 * @Author: fghpdf
 * @Date: 2023-02-02 19:59:21
 * @LastEditTime: 2023-02-11 19:29:53
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
    // verify only one section exist
    const sectionDiv = document.getElementById('suumo-enhance');
    if (sectionDiv) {
        return facilitiesStr;
    }
    addSection(facilitiesDivId);
    return facilitiesStr;
}

function addSection(facilitiesDivId: string): void {
    let sectionDiv = document.createElement('div');
    sectionDiv.setAttribute('class', 'section l-space_small');
    // TODO: make id sense
    sectionDiv.setAttribute('id', 'suumo-enhance');

    let whtDiv = document.createElement('div');
    whtDiv.setAttribute('class', 'bgc-wht ol-g');

    // add icon
    let allDayDustImg = document.createElement('img');
    allDayDustImg.setAttribute('src', chrome.runtime.getURL('24dust.png'));
    allDayDustImg.setAttribute('alt', '24 dust');
    whtDiv.appendChild(allDayDustImg);

    sectionDiv.appendChild(whtDiv);
    // TODO: make this to a function
    const facilitiesDiv = document.getElementById(facilitiesDivId);
    if (!facilitiesDiv) {
        console.warn(`div#${facilitiesDivId} can not be found`);
        return
    }
    facilitiesDiv.parentNode?.insertBefore(sectionDiv, facilitiesDiv.nextSibling);
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id ? tab.id : -1},
        func: getFacilities,
        args: ["bkdt-option"]
    }).then();
});