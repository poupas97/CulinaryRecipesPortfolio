import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import {
  notificationsSelectors,
  removeNotificationAction,
} from '../store/notifications';

const Notifications = ({ notifications, removeNotification }) => {
  const { addToast } = useToasts();

  useEffect(() => {
    (notifications || []).forEach((it, index) => {
      addToast(it.notification, { appearance: it.type, autoDismiss: true });
      removeNotification(index);
    });
  }, [notifications, addToast, removeNotification]);

  return null;
};

const mapStateToProps = (state) => {
  const data = notificationsSelectors(state);
  return {
    notifications: data.list,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeNotification: (index) => removeNotificationAction(dispatch, index),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
