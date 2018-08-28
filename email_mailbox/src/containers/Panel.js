import { connect } from 'react-redux';
import {
  addEmailIdToThread,
  loadThreads,
  removeEmailIdsToThread,
  updateLabelSuccess,
  updateAllFeedItemsAsOlder,
  loadEmails,
  updateStatusThread,
  unsendEmailOnSuccess,
  unsendEmailFiles,
  removeThreadsByThreadIdsOnSuccess,
  updateUnreadThreadsSuccess
} from '../actions';
import PanelWrapper from '../components/PanelWrapper';
import {
  LabelType,
  myAccount,
  updateAccount
} from '../utils/electronInterface';
import { storeSeenTimestamp } from '../utils/storage';
import { EmailStatus } from '../utils/const';

const mapStateToProps = state => {
  const threadsCount = state.get('threads').size;
  return {
    threadsCount
  };
};

const defineContactType = labelId => {
  if (labelId === LabelType.sent.id || labelId === LabelType.draft.id) {
    return ['to', 'cc'];
  }
  return ['from'];
};

const defineRejectedLabels = labelId => {
  switch (labelId) {
    case LabelType.allmail.id:
      return [LabelType.spam.id, LabelType.trash.id, LabelType.draft.id];
    case LabelType.spam.id:
    case LabelType.trash.id:
      return [];
    default:
      return [LabelType.spam.id, LabelType.trash.id];
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddEmailIdToThread: ({ threadId, emailId }) => {
      dispatch(addEmailIdToThread({ threadId, emailId }));
    },
    onLoadEmails: threadId => {
      dispatch(loadEmails(threadId));
    },
    onLoadThreads: params => {
      const { labelId } = params;
      const rejectedLabelIds = defineRejectedLabels(labelId);
      const contactTypes = defineContactType(labelId);
      dispatch(loadThreads({ ...params, rejectedLabelIds, contactTypes }));
    },
    onMarkThreadAsOpen: threadId => {
      const openedStatus = EmailStatus.OPENED;
      dispatch(updateStatusThread(threadId, openedStatus));
    },
    onRemoveEmailIdsToThread: ({ threadId, emailIds }) => {
      dispatch(removeEmailIdsToThread({ threadId, emailIds }));
    },
    onUpdateOpenedAccount: async () => {
      const opened = true;
      const recipientId = myAccount.recipientId;
      await updateAccount({ opened, recipientId });
    },
    onUpdateUnreadEmailsBadge: ({ labelId, operation, value }) => {
      const label = {
        id: labelId,
        operation,
        value
      };
      dispatch(updateLabelSuccess(label));
    },
    onUpdateTimestamp: () => {
      storeSeenTimestamp();
      dispatch(updateAllFeedItemsAsOlder());
    },
    onUnsendEmail: (emailId, date) => {
      dispatch(unsendEmailOnSuccess(emailId, date));
      dispatch(unsendEmailFiles(emailId));
    },
    onRemoveThreads: threadIds => {
      dispatch(removeThreadsByThreadIdsOnSuccess(threadIds));
    },
    onUpdateUnreadThreads: (threadIds, unread) => {
      dispatch(updateUnreadThreadsSuccess(threadIds, unread));
    }
  };
};

const Panel = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelWrapper);

export default Panel;
