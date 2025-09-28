foam.RELATIONSHIP({
  sourceModel: 'hughes.journal.Event',
  targetModel: 'hughes.ledger.Transaction',
  forwardName: 'txns',
  inverseName: 'event',
  cardinality: '1:*',
  sourceProperty: {
    visibility: 'RO'
  },
  targetProperty: {
    createVisibility: 'HIDDEN',
    updateVisibility: 'HIDDEN',
    // readPermissionRequired: true,
    readVisibility: 'RO',
    tableCellFormatter: function(val, obj) {
      var self = this;
      obj.eventDAO.find(obj.event).then(function(e) {
        self.add(e.toSummary());
      });
    },
    order: 2,
    gridColumns: 3
  }
});
