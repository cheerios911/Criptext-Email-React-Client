import { connect } from 'react-redux';
import * as actions from '../actions/index';
import SelectHeader from '../components/SelectHeader';

const mapStateToProps = (state, ownProps) => {
  const labels = getLabelIncluded(
    state.get('labels'),
    ownProps.thread ? ownProps.thread.get('labels') : null
  );
  return {
    threadsSelected: [ownProps.thread ? ownProps.thread.get('id') : null],
    labels,
    allLabels: state.get('labels')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBackOption: () => {
      // TO DO
    },
    onMoveThreads: (threadsIds, label) => {
      return dispatch(actions.moveThreads(threadsIds, label));
    },
    onAddLabel: (threadsIds, label) => {
      return dispatch(actions.addThreadsLabel(threadsIds, label));
    },
    onRemoveLabel: (threadsIds, label) => {
      return dispatch(actions.removeThreadsLabel(threadsIds, label));
    },
    onMarkRead: (threadsIds, read) => {
      return dispatch(actions.markThreadsRead(threadsIds, read));
    }
  };
};

function getLabelIncluded(labels, threadLabels) {
  if (!threadLabels) return [];
  const hasLabels = threadLabels.reduce((lbs, label) => {
    if (!lbs[label]) {
      lbs[label] = 1;
    } else {
      lbs[label]++;
    }
    return lbs;
  }, {});

  return labels.reduce((lbs, label) => {
    const labelId = label.get('id');
    const labelText = label.get('text');
    let checked = 'none';
    if (hasLabels[labelId]) {
      checked = 'all';
    }
    lbs.push({
      id: labelId,
      text: labelText,
      checked
    });
    return lbs;
  }, []);
}

const ThreadHeader = connect(mapStateToProps, mapDispatchToProps)(SelectHeader);

export default ThreadHeader;
