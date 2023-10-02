import { all, put, takeEvery } from 'redux-saga/effects';

import { actionTypes, switchDemoPanelSuccess } from './action';

function* switchDemoPanel({ payload }) {
    try {
        yield put(switchDemoPanelSuccess(payload));
    } catch (err) {
        return true;
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.SWITCH_DEMO_PANEL, switchDemoPanel)]);
}
