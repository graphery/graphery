# Changelog

All notable changes to this project are included in this file.


## version 1.0.0 - 2022-08-01 - First stable version!

### Changed
- Refactored `.animateTo()` to use the web animation API as the first internal option, using SMIL only when necessary.
- `.animateTo()` accept an object and an array of object as first parameter, with the same structure that  `.animate()`.
- `.animateTo()` accept a duration number and an object of options as second parameter, with the same structure 
that  `.animate()`.
- Optimized code and refactored several methods.
- Update the CDN structure to `https://cdn.graphery.online/svg/1.0.0/`.

### Added
- sequence plugin
- helpers plugin
- style observer plugin


## version 0.1.5 - 2021-01-10

### Changed
- Update the CDN structure from `https://cdn.graphery.online/svg/0.1.4/` to
  `https://cdn.graphery.online/0.1.5/svg/`.
- `.animateTo()` accept now a time 0. In this case the behaviour is optimized, and the change is
  executed immediately.
- `.animateTo()` accept two new optional parameters: start, a callback function called when the
  animation is initialized; end, a callback function called when the animation is finished.

### Fixed
- Fixed an error with Proxy and Symbols.
- Fixed an error with Firefox and keep-aspect plugin.
- Fixed an error with Firefox and resize-observer plugin (`.getScreenCTM()` returns null before SVG
  is attached to the DOM).


## version 0.1.4 - 2020-11-03

### Added
- This CHANGELOG.
- Contributors in package.json.

### Changed
- animateTo() has been completely refactored.
- animateTo() can now animate colors and other non-numeric attributes.
- debug.plugin check nested elements.
- Updated README.md.


## version 0.1.3 - 2020-10-26

### Changed
- Fixed error on README.md.
- Fixed error on package.json.


## version 0.1.2 - 2020-10-26

### Added
- The first publish version.
