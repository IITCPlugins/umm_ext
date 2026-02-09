export const title = 'Ultimate Mission Maker';
export const version = '0.7.3';
export const author = 'Vashiru, j00rtje, DanielOnDiordna, McBen';

export const changelog = `
  Changelog:

  Version 0.7.3
  - Added the ability to split the first mission into multiple missions, but have the remainder spread over the the first missions in the banner
  - Fixed invalid input for splitting/reversing resulting in errors

  Version 0.7.2
  - Change wording for importing files in MAT to be less scary
  - Fix an issue where importing a new file wouldn't refresh the portal view to reflect the new mission state

  Version 0.7.1
  - Fix an issue where merging/splitting/reversing paths resulted in portal action changes not saving

  Version 0.7.0
  - Added the ability to split the first mission into multiple missions
  - Added the ability to merge all missions into 1 mission
  - Added the ability to reverse the path of any mission
  - Added portal counter for current mission in sidebar

  Version 0.6.3
  - Fix issue where multi-line question would no longer be shown in IITC after save

  Version 0.6.2
  - Support multi-line questions

  Version 0.6.1
  - Fix contrast issues with dropdowns when the OS/browser is set to light mode

  Version 0.6.0
  - Added the ability to change waypoint objective from portal detail view
  - Update notification font for readability on systems without Calibri (eg. Mac)

  Version v0.5.1
  - Added support for versions of Chrome older than 80

  Version v0.5.0
  - Improved: Major improvements to path draw speed by changing from portalDetailsUpdated to portalSelected.
  This does have the side effect that some data in the JSON might be missing (specifically titles and images for portals).
  However, this has no consequences within the Mission Authoring Tool aside from the visual list. When missing
  data is detected, UMM will show the UMM logo for the portal and then attempt to refresh MAT. This will automatically
  fix the display the same way as a refresh of the page would've done.
  - Added: UMM Logo will be used as default portal image in MAT when non is found (won't affect what's send to NIA)
  - New: Automatically zoom to the banner on the map after import
  - New: IITC "Select Active Mission" replaced with a mission picker dialog with portal counts
  - New: Rewrite image URLs to https in Mission Authoring Tool (MAT) to prevent mixed content warnings

  Version v0.4.5
  - Fixed: Edit banner details won't save without N or NN in banner format

  Version v0.4.4
  - Fixed: Mission importer not showing in Mission Authoring Tool on first start

  Version v0.4.3
  - Fixed: Mission number display in Firefox

  Version v0.4.2
  - Fixed: Export / Save file for mobile. Now works on IITC.me (PC and app), IITC-CE (PC and app), iOS
  - Fixed: Cancel on Clear mission data would still clear all data
  - Fixed: Issue where UMM would affect TextArea styling of other plugins

  - Added: Shortkey Alt+M (probably Option + M on Mac) to bring up UMM options. (Picked the letter M for Mission)
  - Added: When there's no available 'save file' method, offer copy/paste modal
  - Added: Changelog and About in UMM Opt
  - Added: Zoom to view all missions in UMM Opt
  - Added: UMM opt button to sidebar
  - Added: checkboxes to toggle layers from the opt menu

  - Other various mobile optimizations (remove tooltips on buttons, remove unnecessary buttons)
  `;

