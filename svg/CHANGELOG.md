# Changelog

All notable changes to this project will be documented in this file.

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
