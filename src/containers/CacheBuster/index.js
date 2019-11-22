/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import packageJson from '../../../package.json';
global.appVersion = packageJson.version;

// version from response - first param, local version second param
const semverGreaterThan = (versionA, versionB) => {
  const versionsA = versionA.split(/\./g);

  const versionsB = versionB.split(/\./g);
  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());

    const b = Number(versionsB.shift());
    // eslint-disable-next-line no-continue
    if (a === b) continue;
    // eslint-disable-next-line no-restricted-globals
    return a > b || isNaN(b);
  }
  return false;
};

const refreshCacheAndReload = () => {
  console.log('Clearing cache and hard reloading...');
  if (caches) {
    // Service worker cache should be cleared with caches.delete()
    caches.keys().then(names => names.forEach(name => caches.delete(name)));
  }

  // delete browser cache and hard reload
  window.location.reload(true);
};

/* Works around Service Worker cache, and manages out of date cache directly */
function CacheBuster({ children }) {
  const [loading, setLoading] = useState(true);
  const [isLatestVersion, setIsLatestVersion] = useState(true);

  useEffect(() => {
    fetch('/meta.json')
      .then(response => response.json())
      .then(meta => {
        const latestVersion = meta.version;
        const currentVersion = global.appVersion;

        const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion);
        if (shouldForceRefresh) {
          console.log(`We have a new version - ${latestVersion}. Should force refresh`);
          setIsLatestVersion(false);
          setLoading(false);
        } else {
          console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`);
          setIsLatestVersion(true);
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    if (!loading && !isLatestVersion) {
      refreshCacheAndReload();
    }
  }, [loading, isLatestVersion]);

  return !loading ? children : null;
}

const { node } = PropTypes;
CacheBuster.propTypes = {
  children: PropTypes.oneOfType(node, PropTypes.arrayOf(node)),
};

export default CacheBuster;
