foam.RELATIONSHIP({
  sourceModel: 'hughes.journal.Event',
  targetModel: 'hughes.ledger.Transaction',
  forwardName: 'txns',
  inverseName: 'event',
  cardinality: '1:*',
  sourceProperty: {
    visibility: 'HIDDEN'
  },
  targetProperty: {
    createVisibility: 'HIDDEN',
    updateVisibility: 'HIDDEN',
    // readPermissionRequired: true,
    readVisibility: 'RO',
    tableCellFormatter: function(val, obj) {
      var self = this;
      obj.eventDAO.find(obj.event).then(function(e) {
        if ( e )
          self.add(e.toSummary());
        else
          self.add(obj.event);
      });
    },
    order: 2,
    gridColumns: 3
  }
});
