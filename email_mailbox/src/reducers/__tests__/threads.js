/* eslint-env node, jest */

import threadsReducer from './../threads';
import * as actions from './../../actions/index';
import file from './../../../public/threads.json';

jest.mock('./../../utils/const');
jest.mock('./../../utils/ipc');
jest.mock('./../../utils/electronInterface');
jest.mock('./../../utils/electronEventInterface');

const myThreads = file.threads;

function initState(labelId, threads) {
  return threadsReducer(undefined, actions.addThreads(labelId, threads));
}

describe('Thread actions - ADD_BATCH', () => {
  const manyThreads = [myThreads[0], myThreads[1]];
  const labelId = 1;

  it('should add threads to state', () => {
    expect(initState(labelId, manyThreads)).toMatchSnapshot();
  });
});

describe('Thread actions - ADD_LABELID_THREAD', () => {
  const threads = [myThreads[0]];
  const threadsdDraft = [myThreads[1]];

  it('should update thread params: allLabels', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = '6Za2dcMlE0OSSc9';
    const labelIdToAdd = 5;
    const action = actions.addLabelIdThreadSuccess(
      labelId,
      threadId,
      labelIdToAdd
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3, 5]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9']);
  });

  it('should not update thread param: allLabels, when threadId is undefined', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = '6Za2dcMlE0OSSc9';
    const labelIdToAdd = undefined;
    const action = actions.addLabelIdThreadSuccess(
      labelId,
      threadId,
      labelIdToAdd
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9']);
  });

  it('should not update thread param: allLabels, when labelId is not number type', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = '6Za2dcMlE0OSSc9';
    const labelIdToAdd = '4';
    const action = actions.addLabelIdThreadSuccess(
      labelId,
      threadId,
      labelIdToAdd
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9']);
  });

  it('should update thread draft params: allLabels', () => {
    const labelId = 6;
    const state = initState(labelId, threadsdDraft);
    const uniqueId = 2;
    const labelIdToAdd = 10;
    const action = actions.addLabelIdThreadSuccess(
      labelId,
      uniqueId,
      labelIdToAdd
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [5, 10]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual([2]);
  });

  it('should not update thread draft param: allLabels, when uniqueId is not number type', () => {
    const labelId = 6;
    const state = initState(labelId, threadsdDraft);
    const uniqueId = '2';
    const labelIdToAdd = undefined;
    const action = actions.addLabelIdThreadSuccess(
      labelId,
      uniqueId,
      labelIdToAdd
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [5]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual([2]);
  });

  it('should not update thread draft param: allLabels, when labelId is not number type', () => {
    const labelId = 6;
    const state = initState(labelId, threadsdDraft);
    const uniqueId = 2;
    const labelIdToAdd = '4';
    const action = actions.addLabelIdThreadSuccess(
      labelId,
      uniqueId,
      labelIdToAdd
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [5]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual([2]);
  });
});

describe('Thread actions - ADD_LABELID_THREADS', () => {
  const threads = [myThreads[0], myThreads[2]];
  const threadsdDraft = [myThreads[1]];

  it('should update threads params: allLabels', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = ['6Za2dcMlE0OSSc9', 'cuW6ElyoqsR7MMh'];
    const labelIdToAdd = 5;
    const action = actions.addLabelIdThreadsSuccess(
      labelId,
      threadIds,
      labelIdToAdd
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const threadUpdated2 = newState
      .get(`${labelId}`)
      .get('list')
      .get('1');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3, 5]
      })
    );
    expect(threadUpdated2.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3, 5]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(threadIds);
  });

  it('should not update threads param: allLabels, when threadIds is undefined', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = undefined;
    const labelIdToAdd = 5;
    const action = actions.addLabelIdThreadsSuccess(
      labelId,
      threadIds,
      labelIdToAdd
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const threadUpdated2 = newState
      .get(`${labelId}`)
      .get('list')
      .get('1');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3]
      })
    );
    expect(threadUpdated2.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9', 'cuW6ElyoqsR7MMh']);
  });

  it('should not update threads param: allLabels, when labelId is not number type', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = ['6Za2dcMlE0OSSc9', 'cuW6ElyoqsR7MMh'];
    const labelIdToAdd = '5';
    const action = actions.addLabelIdThreadsSuccess(
      labelId,
      threadIds,
      labelIdToAdd
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const threadUpdated2 = newState
      .get(`${labelId}`)
      .get('list')
      .get('1');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3]
      })
    );
    expect(threadUpdated2.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(threadIds);
  });

  it('should update draft threads params: allLabels', () => {
    const labelId = 1;
    const state = initState(labelId, threadsdDraft);
    const threadIds = [2];
    const labelIdToAdd = 6;
    const action = actions.addLabelIdThreadsSuccess(
      labelId,
      threadIds,
      labelIdToAdd
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [5, 6]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(threadIds);
  });
});

describe('Thread actions - MOVE_THREADS', () => {
  const threads = [myThreads[0], myThreads[2]];

  it('should move threads params: threadIds', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = ['6Za2dcMlE0OSSc9'];
    const action = actions.moveThreads(labelId, threadIds);
    const newState = threadsReducer(state, action);
    const threadUpdated = newState.get(`${labelId}`).get('list');
    expect(threadUpdated.size).toEqual(1);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['cuW6ElyoqsR7MMh']);
  });

  it('should move threads params: threadIds not exist', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = null;
    const action = actions.moveThreads(labelId, threadIds);
    const newState = threadsReducer(state, action);
    const threadUpdated = newState.get(`${labelId}`).get('list');
    expect(threadUpdated.size).toEqual(2);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9', 'cuW6ElyoqsR7MMh']);
  });

  it('should move threads params: threadIds is different', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = ['6Za2dMlE0OSS9'];
    const action = actions.moveThreads(labelId, threadIds);
    const newState = threadsReducer(state, action);
    const threadUpdated = newState.get(`${labelId}`).get('list');
    expect(threadUpdated.size).toEqual(2);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9', 'cuW6ElyoqsR7MMh']);
  });

  it('should move threads params: labelId is different', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = ['6Za2dMlE0OSS9'];
    const action = actions.moveThreads(2, threadIds);
    const newState = threadsReducer(state, action);
    const threadUpdated = newState.get(`${labelId}`).get('list');
    expect(threadUpdated.size).toEqual(2);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9', 'cuW6ElyoqsR7MMh']);
  });
});

describe('Thread actions - REMOVE_LABELID_THREAD', () => {
  const threads = [myThreads[0]];
  const threadsdDraft = [myThreads[1]];

  it('should update thread params: allLabels', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = '6Za2dcMlE0OSSc9';
    const labelIdToRemove = 3;
    const action = actions.removeLabelIdThreadSuccess(
      labelId,
      threadId,
      labelIdToRemove
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9']);
  });

  it('should not update thread param: allLabels, when threadId is undefined', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = undefined;
    const labelIdToRemove = 3;
    const action = actions.removeLabelIdThreadSuccess(
      labelId,
      threadId,
      labelIdToRemove
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9']);
  });

  it('should not update thread param: allLabels, when labelId is not number type', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = '6Za2dcMlE0OSSc9';
    const labelIdToRemove = '1';
    const action = actions.removeLabelIdThreadSuccess(
      labelId,
      threadId,
      labelIdToRemove
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9']);
  });

  it('should update thread params: allLabels', () => {
    const labelId = 6;
    const state = initState(labelId, threadsdDraft);
    const uniqueId = 2;
    const labelIdToRemove = 5;
    const action = actions.removeLabelIdThreadSuccess(
      labelId,
      uniqueId,
      labelIdToRemove
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: []
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual([2]);
  });

  it('should not update thread param: allLabels, when uniqueId is not number type', () => {
    const labelId = 6;
    const state = initState(labelId, threadsdDraft);
    const uniqueId = '2';
    const labelIdToRemove = undefined;
    const action = actions.removeLabelIdThreadSuccess(
      labelId,
      uniqueId,
      labelIdToRemove
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [5]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual([2]);
  });

  it('should not update thread param: allLabels, when labelId is not number type', () => {
    const labelId = 6;
    const state = initState(labelId, threadsdDraft);
    const uniqueId = 2;
    const labelIdToRemove = '5';
    const action = actions.removeLabelIdThreadSuccess(
      labelId,
      uniqueId,
      labelIdToRemove
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [5]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual([2]);
  });
});

describe('Thread actions - REMOVE_LABELID_THREADS', () => {
  const threads = [myThreads[0], myThreads[2]];

  it('should update threads params: allLabels', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = ['6Za2dcMlE0OSSc9', 'cuW6ElyoqsR7MMh'];
    const labelIdToRemove = 2;
    const action = actions.removeLabelIdThreadsSuccess(
      labelId,
      threadIds,
      labelIdToRemove
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const threadUpdated2 = newState
      .get(`${labelId}`)
      .get('list')
      .get('1');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 3]
      })
    );
    expect(threadUpdated2.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 3]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(threadIds);
  });

  it('should not update threads param: allLabels, when threadIds is undefined', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = undefined;
    const labelIdToRemove = 2;
    const action = actions.removeLabelIdThreadsSuccess(
      labelId,
      threadIds,
      labelIdToRemove
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const threadUpdated2 = newState
      .get(`${labelId}`)
      .get('list')
      .get('1');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3]
      })
    );
    expect(threadUpdated2.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9', 'cuW6ElyoqsR7MMh']);
  });

  it('should not update threads param: allLabels, when labelId is not number type', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = ['6Za2dcMlE0OSSc9', 'cuW6ElyoqsR7MMh'];
    const labelIdToRemove = '1';
    const action = actions.removeLabelIdThreadsSuccess(
      labelId,
      threadIds,
      labelIdToRemove
    );
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const threadUpdated2 = newState
      .get(`${labelId}`)
      .get('list')
      .get('1');
    expect(threadUpdated.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3]
      })
    );
    expect(threadUpdated2.toJS()).toMatchObject(
      expect.objectContaining({
        allLabels: [1, 2, 3]
      })
    );
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(threadIds);
  });
});

describe('Thread actions - REMOVE_THREADS', () => {
  const threads = [myThreads[0], myThreads[2]];

  it('should remove threads params: threadIds', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = ['6Za2dcMlE0OSSc9'];
    const action = actions.removeThreadsSuccess(labelId, threadIds);
    const newState = threadsReducer(state, action);
    const threadUpdated = newState.get(`${labelId}`).get('list');
    expect(threadUpdated.size).toEqual(1);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['cuW6ElyoqsR7MMh']);
  });

  it('should move threads params: threadIds not exist', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = null;
    const action = actions.removeThreadsSuccess(labelId, threadIds);
    const newState = threadsReducer(state, action);
    const threadUpdated = newState.get(`${labelId}`).get('list');
    expect(threadUpdated.size).toEqual(2);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9', 'cuW6ElyoqsR7MMh']);
  });

  it('should move threads params: threadIds is different', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = ['6Za2dMlE0OSS9'];
    const action = actions.removeThreadsSuccess(labelId, threadIds);
    const newState = threadsReducer(state, action);
    const threadUpdated = newState.get(`${labelId}`).get('list');
    expect(threadUpdated.size).toEqual(2);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9', 'cuW6ElyoqsR7MMh']);
  });
});

describe('Thread actions - UPDATE_EMAILIDS_THREAD', () => {
  const threads = [myThreads[0]];

  it('should update thread param: emailIds, add and remove', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = '6Za2dcMlE0OSSc9';
    const emailIdToAdd = 4;
    const emailIdsToRemove = [1];
    const action = actions.updateEmailIdsThread({
      labelId,
      threadId,
      emailIdToAdd,
      emailIdsToRemove
    });
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const emailIds = threadUpdated.get('emailIds').toJS();
    expect(emailIds).toEqual([2, 4]);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual([threadId]);
  });

  it('should update thread param: emailIds, just add', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = '6Za2dcMlE0OSSc9';
    const emailIdToAdd = 4;
    const action = actions.updateEmailIdsThread({
      labelId,
      threadId,
      emailIdToAdd
    });
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const emailIds = threadUpdated.get('emailIds').toJS();
    expect(emailIds).toEqual([1, 2, 4]);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual([threadId]);
  });

  it('should update thread param: emailIds, just remove', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = '6Za2dcMlE0OSSc9';
    const emailIdsToRemove = [1];
    const action = actions.updateEmailIdsThread({
      labelId,
      threadId,
      emailIdsToRemove
    });
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const emailIds = threadUpdated.get('emailIds').toJS();
    expect(emailIds).toEqual([2]);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual([threadId]);
  });

  it('should update thread param: emailIds', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = '6Za2dcMlE0OSSc9';
    const emailIds = [100, 200, 300];
    const action = actions.updateEmailIdsThread({
      labelId,
      threadId,
      emailIds
    });
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const emailIdsUpdated = threadUpdated.get('emailIds').toJS();
    expect(emailIdsUpdated).toEqual(emailIds);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual([threadId]);
  });

  it('should not update thread param: emailIds, when threadId is undefined', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = undefined;
    const emailIdToAdd = 4;
    const emailIdsToRemove = 1;
    const action = actions.updateEmailIdsThread({
      labelId,
      threadId,
      emailIdToAdd,
      emailIdsToRemove
    });
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const emailIds = threadUpdated.get('emailIds').toJS();
    expect(emailIds).toEqual([1, 2]);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9']);
  });

  it('should not update thread param: emailIds, when emailIdToAdd and emailIdToRemove are undefined', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = '6Za2dcMlE0OSSc9';
    const action = actions.updateEmailIdsThread({ labelId, threadId });
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const emailIds = threadUpdated.get('emailIds').toJS();
    expect(emailIds).toEqual([1, 2]);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual([threadId]);
  });

  it('should remove thread param: emailIds', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = '6Za2dcMlE0OSSc9';
    const emailIdsToRemove = [1, 2];
    const action = actions.updateEmailIdsThread({
      labelId,
      threadId,
      emailIdsToRemove
    });
    const newState = threadsReducer(state, action);
    const listUpdated = newState.get(`${labelId}`).get('list');
    expect(listUpdated.size).toEqual(0);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(allIds.size).toEqual(0);
  });
});

describe('Thread actions - UPDATE_THREAD', () => {
  const threads = [myThreads[0]];

  it('should update thread param: status', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = '6Za2dcMlE0OSSc9';
    const newStatus = 2;
    const action = actions.updateThread({
      labelId,
      threadId,
      status: newStatus
    });
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const status = threadUpdated.get('status');
    expect(status).toBe(newStatus);
  });

  it('should not update thread param: status when status is not number type', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadId = '6Za2dcMlE0OSSc9';
    const newStatus = '1';
    const action = actions.updateThread({
      labelId,
      threadId,
      status: newStatus
    });
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const status = threadUpdated.get('status');
    expect(status).not.toBe(newStatus);
    expect(status).toBe(0);
  });
});

describe('Thread actions - UPDATE_THREADS', () => {
  const threads = [myThreads[0]];

  it('should update thread param: unread', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = ['6Za2dcMlE0OSSc9'];
    const action = actions.updateThreadsSuccess(labelId, threadIds, false);
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const unread = threadUpdated.get('unread');
    expect(unread).toBe(false);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(threadIds);
  });

  it('should not update thread param: unread, when unread is not bool type', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = ['6Za2dcMlE0OSSc9'];
    const action = actions.updateThreadsSuccess(labelId, threadIds, 'false');
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const unread = threadUpdated.get('unread');
    expect(unread).toBe(true);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(threadIds);
  });

  it('should not update thread param: unread, when threadIds is empty', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = [];
    const action = actions.updateThreadsSuccess(labelId, threadIds, 'true');
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const unread = threadUpdated.get('unread');
    expect(unread).toBe(true);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9']);
  });

  it('should not update thread param: unread, when threadIds is undefined', () => {
    const labelId = 1;
    const state = initState(labelId, threads);
    const threadIds = undefined;
    const action = actions.updateThreadsSuccess(labelId, threadIds, 'true');
    const newState = threadsReducer(state, action);
    const threadUpdated = newState
      .get(`${labelId}`)
      .get('list')
      .get('0');
    const unread = threadUpdated.get('unread');
    expect(unread).toBe(true);
    const allIds = newState.get(`${labelId}`).get('allIds');
    expect(Array.from(allIds)).toEqual(['6Za2dcMlE0OSSc9']);
  });
});
