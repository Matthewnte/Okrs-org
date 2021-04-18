const lineManagerPayload = {
  receiverId: trainingExist.departmentHead,
  notifyId: trainingExist.id,
  profileImg: employee.profilePicture,
  title: 'Training Cancelled',
  role: lineManager.role ? lineManager.role.name : null,
  body: `Take a look! ${employee.firstName} ${employee.lastName} cancelled ${trainingExist.trainingName} training`,
};

const hrManagerPayload = {
  receiverId: trainingExist.hrManager,
  notifyId: trainingExist.id,
  profileImg: employee.profilePicture,
  title: 'Training Cancelled',
  role: hr.role.name || null,
  body: `Take a look! ${employee.firstName} ${employee.lastName} cancelled ${trainingExist.trainingName} training`,
};

const lineManagerNotification = {
  userId: trainingExist.departmentHead,
  notifyId: trainingExist.id,
  profileImg: employee.profilePicture,
  title: 'Training Cancelled',
  role: lineManager.role ? lineManager.role.name : null,
  body: `Take a look! ${employee.firstName} ${employee.lastName} cancelled ${trainingExist.trainingName} training`,
};

const hrNotification = {
  userId: trainingExist.hrManager,
  notifyId: trainingExist.id,
  profileImg: employee.profilePicture,
  title: 'Training Cancelled',
  role: hr.role.name,
  body: `Take a look! ${employee.firstName} ${employee.lastName} cancelled ${trainingExist.trainingName} training`,
};

// Send RealTime Notifications
pusher(
  'trainingCancelled', // Channel of notification
  'trainingCancelled', // Event (when should notification be seen) e.g when training is canceled
  [lineManagerPayload, hrManagerPayload], // Data
  req.headers['x-socket-id'], // Exclude sender
);

//save notification
const notificationData = [lineManagerNotification, hrNotification];
