/*
 * @Author: fghpdf
 * @Date: 2023-02-02 19:59:21
 * @LastEditTime: 2023-02-19 11:24:54
 * @LastEditors: fghpdf
 */
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id ? tab.id : -1},
        files: ["content.js"]
    }).then();
});