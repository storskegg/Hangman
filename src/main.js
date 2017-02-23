/**
 * Example ES6 main.js
 *
 * @description The entry point to your javascript application.
 */

// import {_} from 'lodash';

'use strict';

const immutableNumber = 78;
const immutableText   = 'i am text';

const getImmutableNumber = function() {
  return immutableNumber;
};

const getImmutableText = function() {
  return immutableText;
};

const wrapP = function(text) {
  text = text.trim();
  return `<p>${text}</p>`;
};

console.log(wrapP(`[${getImmutableNumber()}] - ${getImmutableText()}`))
