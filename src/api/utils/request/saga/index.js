import { CancelToken } from 'axios';
import { call, cancelled } from 'redux-saga/effects';

function* cancelableRequest(apiRequest) {
  const source = CancelToken.source();

  try {
    return yield call(apiRequest, { cancelToken: source.token });
  } finally {
    if (yield cancelled()) {
      source.cancel();
    }
  }
}

function request(apiRequest) {
  return call(() => cancelableRequest(apiRequest));
}

export { request };
