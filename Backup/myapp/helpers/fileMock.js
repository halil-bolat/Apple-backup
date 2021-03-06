/*
 * Used for mocking asset imports such as CSS, images
 * or fonts when running Jest.
 *
 * Since static assets aren't testable we'll simply
 * return an empty object.
 *
 * Linked to from the Jest configuration in package.json:
 *
 * "jest": {
 *   "moduleNameMapper": {
 *     "^.+\\.(png|jpg|gif|scss)$": "<rootDir>/helpers/fileMock.js"
 *   },
 * }
 */

module.exports = {};
