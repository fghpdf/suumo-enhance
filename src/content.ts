/*
 * @Author: fghpdf
 * @Date: 2023-02-19 11:23:39
 * @LastEditTime: 2023-02-19 11:29:26
 * @LastEditors: fghpdf
 */

/* https://developer.chrome.com/docs/extensions/mv3/content_scripts/#isolated_world
 * Be aware that the injected function is a copy of the function referenced in the chrome.scripting.executeScript call, not the original function itself. As a result, the function's body must be self contained; references to variables outside of the function will cause the content script to throw a ReferenceError.
 */

function getFacilities(facilitiesDivId: string, enhanceDivId: string): string {
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
  const sectionDiv = document.getElementById(enhanceDivId);
  if (sectionDiv) {
      return facilitiesStr;
  }
  addSection(facilitiesDivId, enhanceDivId);
  return facilitiesStr;
}

function addSection(facilitiesDivId: string, enhanceDivId: string): void {
  let sectionDiv = document.createElement('div');
  sectionDiv.setAttribute('class', 'section l-space_small');
  sectionDiv.setAttribute('id', enhanceDivId);

  let whtDiv = document.createElement('div');
  whtDiv.setAttribute('class', 'bgc-wht ol-g');

  // add icon
  let allDayDustImg = createFacilityImg('24-dust');
  let bicycleParkingImg = createFacilityImg('bicycle-parking'); 
  whtDiv.appendChild(allDayDustImg);
  whtDiv.appendChild(bicycleParkingImg);

  sectionDiv.appendChild(whtDiv);

  const facilitiesDiv = document.getElementById(facilitiesDivId);
  if (!facilitiesDiv) {
      console.warn(`div#${facilitiesDivId} can not be found`);
      return
  }
  facilitiesDiv.parentNode?.insertBefore(sectionDiv, facilitiesDiv.nextSibling);
}

function createFacilityImg(facilityName: string): HTMLImageElement {
  let img = document.createElement('img');
  img.setAttribute('src', chrome.runtime.getURL(`${facilityName}.png`));
  // 24-dust -> 24 dust
  img.setAttribute('alt', `${facilityName.replace('-', ' ')} available`);
  img.setAttribute('width', `128`);
  img.setAttribute('height', `128`);
  return img;
}

function isFacilitiesDivExist(facilitiesDivId: string): boolean {
  const facilitiesDiv = document.getElementById(facilitiesDivId);
  if (!facilitiesDiv) {
      return false;
  }
  return true;
}

// run
getFacilities("bkdt-option", "suumo-enhance-facilities-icon");