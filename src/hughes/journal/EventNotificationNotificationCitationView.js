foam.CLASS({
  package: 'hughes.journal',
  name: 'EventNotificationNotificationCitationView',
  extends: 'foam.core.notification.NotificationCitationView',

  requires: [
    'foam.u2.HTMLView'
  ],

  properties: [
    {
      class: 'String',
      name: 'menu',
      documentation: 'Menu id for Events',
      value: 'event',
      hidden: true
    },
    {
      class: 'Reference',
      of: 'hughes.journal.Event',
      name: 'event',
      hidden: true
    }
  ],

  methods: [
    function render() {
      this
        .addClass(this.myClass())
        .start()
          .start().addClass('p-legal-light', this.myClass('created'))
            .add(this.created$)
          .end()
          .start().addClass('p', this.myClass('description'))
          .start(foam.u2.HTMLView, { data: '<a href=\"#'+this.menu+'/'+this.data.event+'\">'+this.description+'</a>'}).end()
          .end()
        .end();
    }
  ]
});
