import {
  Readable as ReadableStream
} from 'stream';
import { Meteor } from 'meteor/meteor';

/**
 * Callback with all the data from the readable stream.
 * @param {Object} req
 * @param {Function} callback
 */
export const readAll = (stream, callback) => {
  if (!stream instanceof ReadableStream) {
    throw new TypeError('"stream" must be a readable stream.');
  }
  if (typeof callback !== 'function') {
    throw new TypeError('"callback" must be a function.');
  }

  const safeCallback = Meteor.bindEnvironment(callback);

  let rawData = '';
  // Get the data as utf8 strings.
  // If an encoding is not set, Buffer objects will be received.
  stream.setEncoding('utf8');

  stream.on('data', (chunk) => {
    rawData += chunk;
  });

  stream.on('end', () => {
    safeCallback(null, rawData);
  });

  stream.on('error', safeCallback);
};

export const readAllSync = Meteor.wrapAsync(readAll);
