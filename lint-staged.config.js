module.exports = {
  'src/*.+(js|jsx)': ['eslint --fix', 'git add', 'jest --bail --passWithNoTests --findRelatedTests'],
  'src/*.+(json|css|md|scss)': ['prettier --write', 'git add'],
};
