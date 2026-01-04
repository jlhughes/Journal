foam.CLASS({
  package: 'hughes.journal',
  name: 'FollowUpAutoAgent',
  implements: [
    'foam.lang.ContextAgent',
  ],

  documentation: `Create a follow-up Event for events
- followUpAuto: true
- status: Closed
- no follow ups
`,

  javaImports: [
    'foam.core.notification.Notification',
    'foam.lang.Detachable',
    'foam.lang.X',
    'foam.dao.DAO',
    'foam.dao.Sink',
    'static foam.mlang.MLang.*',
    'foam.mlang.sink.Count',
    'foam.core.cron.Schedule',
    'foam.util.SafetyUtil'
  ],

  methods: [
    {
      name: 'execute',
      args: 'X x',
      javaCode: `
      DAO dao = (DAO) x.get("eventDAO");
      dao = dao.where(
        AND(
          EQ(Event.FOLLOW_UP_AUTO, true),
          EQ(Event.STATUS, Status.CLOSED)
        )
      );
      dao.select(new Sink() {
        public void put(Object obj, Detachable sub) {
          Event event = (Event) obj;
          DAO children = event.getChildren(x);
          if ( ((Count) children.select(COUNT())).getValue() == 0 ) {
            if ( ((Schedule)event.getFollowUpAutoSchedule()).getNextScheduledTime(x, ((CalendarSchedule)event.getWhen()).getStartDate()).getTime() < System.currentTimeMillis()) {
              Event followUp = event.createFollowUp(x);
              followUp = (Event) children.put(followUp);
              if ( followUp.getWho() != 0 ) {
                EventNotification n = new EventNotification();
                n.setEvent(followUp.getId());
                n.setUserId(followUp.getWho());
                n.setToastMessage("Follow-up Event Created");
                n.setToastSubMessage(followUp.getWhat());
                if ( ! SafetyUtil.isEmpty(followUp.getWhere()) ) {
                  n.setToastSubMessage(n.getToastSubMessage() + " - " + followUp.getWhere());
                }
                ((DAO) x.get("notificationDAO")).put(n);
              }
            }
          }
        }
        public void remove(Object obj, Detachable sub) {}
        public void eof() {}
        public void reset(Detachable sub) {}
      });
      `
    }
  ]
});
