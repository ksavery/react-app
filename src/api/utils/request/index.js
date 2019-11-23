import axios from 'axios';
import { log } from 'utils/log';

/* Status Code References: https://httpstatuses.com/ */
import { NO_CONTENT, RESET_CONTENT } from 'http-status-codes';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  log.info(response);

  if (response.status === NO_CONTENT /* 204 */ || response.status === RESET_CONTENT /* 205 */) {
    return null;
  }

  return response.data;
}

/**
 * Collects and throws errors from a network request as an error object
 *
 * @param  {object} response   A response from a network request
 */
function handleError(response) {
  log.error(response?.config?.url);

  const apiResponse = response?.response;
  if (!apiResponse) {
    throw new Error(response.message);
  }

  const apiErrors = apiResponse.data?.errors;
  if (apiErrors) {
    throw getDataError(apiErrors); // Returns an array of errors
  }

  const { status, statusText } = response.response;
  throw new Error(`${status}: ${statusText}`);
}

function getDataError(errors) {
  const result = [];
  Object.keys(errors).forEach(key => {
    errors[key].forEach(error => result.push(new Error(error)));
  });

  return result;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {object} [options] The axios options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
function requestBuilder(options) {
  return async function request(moreOptions = {}) {
    const { headers, ...other } = options;

    return axios({ headers, ...other, ...moreOptions })
      .then(parseJSON)
      .catch(handleError);
  };
}

function get(url, config = {}) {
  return requestBuilder({ method: 'GET', url, ...config });
}

function put(url, data, config = {}) {
  return requestBuilder({ method: 'PUT', url, data, ...config });
}

function post(url, data, config = {}) {
  return requestBuilder({ method: 'POST', url, data, ...config });
}

function del(url, config = {}) {
  return requestBuilder({ method: 'DELETE', ...config });
}

export { get, put, post, del };
