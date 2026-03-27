# v1.1

- new "Mission Generator" dialog
  This new dialog provides several tools to modify missions:
  1. "Reset"
     Discard all current changes.
  2. Add portals
     Adds nearby portals to the current mission.
     You can:
     - Limit selection using a DrawTools polygon
     - Exclude individual portals with DrawTool Markers
     - Restrict selection to portals within path hack range
  3. Sort portals
     Attempts to arrange portals for the shortest possible path.
     (Note: This is a complex optimization problem—results may vary.
     The “keep end portal” option may occasionally fail.)
  4. Change start
     Set the selected Portal as new mission start.
     If no portal is selected, the start point will cycle through all mission portals.

  All changes are temporary until "applied" or be "dismissed".
  Note: Distance calculations are based on straight-line (“as-the-crow-flies”) distances; real-world paths are not considered.

- Use static layers
  UMM is now fully hidden when inactive. Background processing is also disabled while inactive.
- Added Multi-Reverse
  Using the reverse action in the main dialog, you can now reverse an entire banner or selected parts of it—not just a single mission.
- Drag: allow swapping mission portals
- Fixed merge in main dialog
- Fixed “Should merge?” prompt in split option (main dialog)
- Mission-Select dialog moved to the left

# v1.0.2

- fix IITC-Button load
  in iitc-button load order is differnet and custom "if UUM is loaded then disable it" failed
- fix variable if both plugins are active

# v1.0.1

- fix mission number (index started by 0 instead of 1)

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

- **Banner Settins** (start window)
  - changed Title placeholders to $T $M $N
- **Option Dialog** (main window)
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

- **Waypoint edit**
  - current mission is preselected
  - passphrases: add random default questions.
    when question & answer is empty a simple question will be set.

- **Miscellaneous**
  - Custom confirmation dialogs clarify actions and improve readability
  - Switch between any missions, even those without portals
  - Option to split missions when starting on a portal that's already assigned to another mission
  - on mobile dialogs are not at the top instead of centered
  - flash buttonbar on activation to draw attention

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
