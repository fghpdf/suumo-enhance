/*
 * @Author: fghpdf
 * @Date: 2023-02-02 19:59:21
 * @LastEditTime: 2023-02-02 19:59:32
 * @LastEditors: fghpdf
 */
let active = false;

function makeOrange(color: string): void {
    document.body.style.backgroundColor = color;
}

chrome.action.onClicked.addListener((tab) => {
    active = !active;
    const color = active ? 'orange' : 'white';
    chrome.scripting.executeScript({
        target: {tabId: tab.id ? tab.id : -1},
        func: makeOrange,
        args: [color]
    }).then();
});