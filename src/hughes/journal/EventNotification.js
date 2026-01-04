foam.CLASS({
  package: 'hughes.journal',
  name: 'EventNotification',
  extends: 'foam.core.notification.Notification',

  properties: [
    {
      class: 'Reference',
      of: 'hughes.journal.Event',
      name: 'event'
    }
  ]
});
