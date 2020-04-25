module.exports = {
  name: 'protocol-network',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/web',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
