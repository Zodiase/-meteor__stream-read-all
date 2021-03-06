Package.describe({
  name: 'zodiase:stream-read-all',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Helper for reading everything from a stream.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/Zodiase/meteor__stream-read-all.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1.1');
  api.use('ecmascript');
  api.mainModule('stream-read-all.js', 'server');
});
