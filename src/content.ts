import FACILITY_SVG_KEY from './facilities';

/*
 * @Author: fghpdf
 * @Date: 2023-02-19 11:23:39
 * @LastEditTime: 2023-03-01 22:41:32
 * @LastEditors: fghpdf
 */

/* https://developer.chrome.com/docs/extensions/mv3/content_scripts/#isolated_world
 * Be aware that the injected function is a copy of the function referenced in the chrome.scripting.executeScript call, not the original function itself. As a result, the function's body must be self contained; references to variables outside of the function will cause the content script to throw a ReferenceError.
 */

function getFacilities(facilitiesDivId: string, enhanceDivId: string): string[] {
  const facilitiesDiv = document.getElementById(facilitiesDivId);
  if (!facilitiesDiv) {
      console.warn(`div#${facilitiesDivId} can not be found`);
      return [];
  }
  const facilitiesLis = facilitiesDiv.getElementsByTagName('li');
  if (!facilitiesLis || facilitiesLis.length == 0) {
      console.warn(`div#${facilitiesDivId} no li`);
      return [];
  }

  const facilitiesStr = facilitiesLis[0].textContent;
  if (!facilitiesStr) {
      console.warn(`div#${facilitiesDivId} li no context`);
      return [];
  }
  return splitDescription(facilitiesStr, '、');
}

function addSection(facilitiesDivId: string, enhanceDivId: string, facilities: string[]): void {
  let sectionDiv = document.createElement('div');
  sectionDiv.setAttribute('class', 'section l-space_small');
  sectionDiv.setAttribute('id', enhanceDivId);

  let whtDiv = document.createElement('div');
  whtDiv.setAttribute('class', 'bgc-wht ol-g');

  // add icon
  for (const facility of facilities) {
    const imgKey = FACILITY_SVG_KEY[facility];
    if (!imgKey) {
      continue
    }
    let iconImg = createFacilityImg(imgKey);
    whtDiv.appendChild(iconImg);
  }

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
  img.setAttribute('src', chrome.runtime.getURL(`${facilityName}.svg`));
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

// Separate description based on the delimiter into string tokens (default: ','). Trim whitespace around each token.
	// Returns empty array when provided an empty string
function splitDescription(facilityDescription: string, delimiter: string = ','): string[] {
	const tokenArr: string[] = facilityDescription.split(delimiter);
	for (let i = 0; i < tokenArr.length; ++i) { tokenArr[i] = tokenArr[i].trim(); }
	return tokenArr;
}

function main() {
  const enhanceDivId = "suumo-enhance-facilities-icon";
  const facilitiesDivId = "bkdt-option";
  // verify only one section exist
  const sectionDiv = document.getElementById(enhanceDivId);
  if (sectionDiv) {
      return;
  }
  // parse facility description
  const facilities = getFacilities(facilitiesDivId, enhanceDivId);
  console.log(facilities);
  if (facilities.length == 0) {
    return;
  }

  // render
  addSection(facilitiesDivId, enhanceDivId, facilities);
}

// run
main();