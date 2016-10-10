# Helper for meteor apps to read everything from a stream.

## Install
```Bash
meteor add zodiase:stream-read-all
```

## Example

### Original code
Adopted from https://nodejs.org/api/stream.html#stream_api_for_stream_consumers
```JavaScript
const http = require('http');

const server = http.createServer( (req, res) => {
  // req is an http.IncomingMessage, which is a Readable Stream
  // res is an http.ServerResponse, which is a Writable Stream

  let body = '';
  // Get the data as utf8 strings.
  // If an encoding is not set, Buffer objects will be received.
  req.setEncoding('utf8');

  // Readable streams emit 'data' events once a listener is added
  req.on('data', (chunk) => {
    body += chunk;
  });

  // the end event indicates that the entire body has been received
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      // write back something interesting to the user:
      res.write(typeof data);
      res.end();
    } catch (er) {
      // uh oh!  bad json!
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });
});
```

### Using this package in Meteor
```JavaScript
import { createServer} from 'http';
import { readAllSync } from 'meteor/zodiase:stream-read-all';

const server = createServer( (req, res) => {

  // One-liner read.
  let body = readAllSync(req);

  try {
    const data = JSON.parse(body);
    // write back something interesting to the user:
    res.write(typeof data);
    res.end();
  } catch (er) {
    // uh oh!  bad json!
    res.statusCode = 400;
    return res.end(`error: ${er.message}`);
  }

});
```

### Async callback is still available
```JavaScript
import { createServer} from 'http';
import { readAll } from 'meteor/zodiase:stream-read-all';

const server = createServer( (req, res) => {

  // One-liner read.
  readAll(req, (err, body) => {
    try {
      const data = JSON.parse(body);
      // write back something interesting to the user:
      res.write(typeof data);
      res.end();
    } catch (er) {
      // uh oh!  bad json!
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });

});
```
