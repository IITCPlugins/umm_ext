# v1.0

This is a complete rewrite of the Ultimate Mission Maker from a developer perspective.
The entire codebase has been redesigned while maintaining the familiar user experience of the original UMM.
Below are the visible improvements and changes you'll notice.

## What's Changed:

- UMM is now hidden by default. You need to hit the "UMM" button in the Portal details window to make it appear.

- **Select Mission Dialog** (open it through the toolbar or the main dialog)
  - Selecting a mission is no longer required; simply open another mission
  - Navigation buttons (+/-) allow you to cycle through missions
  - Added split, clear, merge, and reverse commands for mission manipulation
  - New mission information display: portal count and distances

- **Options Dialog** (main window)
  - Banner information now displays as a compact table
  - Removed warning for mission counts that are not multiples of 6
  - Added warning when missions lack sufficient waypoints

- **Drag & Drop** in the mission editor path
  - Move existing markers to adjust waypoints
  - Add new waypoints by positioning intermediate markers at new locations
  - Remove waypoints by double-clicking a marker
  - Merge missions by dragging start and end markers together

- **Mission Numbers**
  - Potential split points are previewed while creating missions

- **Miscellaneous**
  - Custom confirmation dialogs clarify actions and improve readability
  - Switch between any missions, even those without portals
  - Option to split missions when starting on a portal that's already assigned to another mission
  - on mobile dialogs are not at the top instead of centered

---

# History:

## v1.0.beta.2 - 15.02.26

- fixed update-URL in script header

## v1.0.beta - 15.02.26

- first public release
- automated build process on GitHub
- fixed layer checkboxes in Option-Dialog
- add "clear" mission to selection dialog
- always color selected mission even when not in Edit-Mode
- move "no" to left in custom confirm dialog
- remove doubled "v" in version numbers
- fix toggeling edit mode on mission detail window "save" button
- close dialog on mission detail window "save"
- fix linebreaks in changelog dialog
- select mission: directly select mission on combo-box change
- fix question text in portal details
- on mobile dialogs are not at the top instead of centered
