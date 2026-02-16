v1.0

This is a code conversation of the Ultimate Mission Maker.
From a developer point of view the whole project was rewritten and completly changed.
For the enduser it still feels like the original UMM. The following list should give you an impression of whats visibily changes you will notice.

What's changed:

- UMM is now hidden by default. You need to hit the "UMM" button in the Portal details window to make it appear.

- "Select Mission Dialog" (open it through the toolbar or the main dialog)
  - "select" is nolonger required. just select another mission
  - there are + and - Buttons for walking through these too
  - added split,clear,merge,reverse commands to apply this to the selected mission
  - additional infos to current mission: portal-count, distances

- "Option Dialog" (main window)
  - changed top banner info to a short table view
  - removed the "warning message" when mission count is not a mulitple of 6
  - added warning if missions don't have enough waypoints

- Drag & Drop to the mission editor path
  - move existing markers
  - add new waypoints by moving intermedite markers to new locations
  - remove waypoint by double click a marker
  - you can merge missions by dragging the start/end together

- Mission Numbers
  - While creating a mission possible split points will be previewed

- Misc
  - a custom confirm dialog make it easier to read and understand what happens
  - you can switch to any mission even when they have no portals in it
  - when starting a mission on a portal already in a missions you will have the option to split this mission
