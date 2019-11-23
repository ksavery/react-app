const runYarnLock = 'yarn install --forzen-lockfile';

module.exports = {
  hooks: {
    'post-merge': runYarnLock,
    'post-rebase': 'yarn install',
    'pre-commit': 'yarn pretty-quick --staged && yarn lint-staged',
  },
};
