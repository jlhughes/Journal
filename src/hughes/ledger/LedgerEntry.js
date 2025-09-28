foam.CLASS({
  package: 'hughes.ledger',
  name: 'LedgerEntry',

  imports: [
    'accountDAO',
    'currencyDAO',
    'eventDAO',
    'transactionDAO'
  ],

  properties: [
    {
      name: 'id',
      class: 'String',
      visibility: 'RO'
    },
    {
      name: 'date',
      class: 'DateTime',
      visibility: 'RO',
      view: { class: 'foam.u2.view.DateView' }
    },
    {
      name: 'event',
      class: 'Reference',
      of: 'hughes.journal.Event',
      tableCellFormatter: function(val, obj) {
        var self = this;
        obj.eventDAO.find(obj.event).then(function(e) {
          self.add(e.toSummary());
        });
      },
      visibility: 'RO'
    },
    {
      name: 'debitAccount',
      class: 'Reference',
      of: 'hughes.ledger.Account',
      visibility: 'HIDDEN'
    },
    {
      name: 'debitAmount',
      class: 'UnitValue',
      label: 'Debit',
      unitPropName: 'denomination',
      visibility: 'RO',
      tableCellFormatter: function(value, obj) {
        var self = this;
        obj.accountDAO.find(obj.debitAccount).then(function(a) {
          obj.currencyDAO.find(a.currency).then(function(c) {
            if ( c ) {
              self.add(c.format(value));
            } else {
              self.add(value);
            }
          });
        });
      },
      unitPropValueToString: async function(x, val) {
        let a = await this.accountDAO.find(this.debitAccount);
        let c = await this.currencyDAO.find(a.currency);
        return c.format(val);
      }
    },
    {
      name: 'creditAccount',
      class: 'Reference',
      of: 'hughes.ledger.Account',
      visibility: 'HIDDEN'
    },
    {
      name: 'creditAmount',
      class: 'UnitValue',
      label: 'Credit',
      unitPropName: 'denomination',
      visibility: 'RO',
      tableCellFormatter: function(value, obj) {
        var self = this;
        obj.accountDAO.find(obj.creditAccount).then(function(a) {
          obj.currencyDAO.find(a.currency).then(function(c) {
            if ( c ) {
              self.add(c.format(value));
            } else {
              self.add(value);
            }
          });
        });
      },
      unitPropValueToString: async function(x, val) {
        let a = await this.accountDAO.find(this.creditAccount);
        let c = await this.currencyDAO.find(a.currency);
        return c.format(val);
      }
    },
    {
      name: 'balance',
      class: 'UnitValue',
      unitPropName: 'denomination',
      visibility: 'RO',
      expression: function(debitAmount, creditAmount) {
        return creditAmount - debitAmount;
      },
      tableCellFormatter: function(value, obj) {
        var self = this;
        obj.accountDAO.find(obj.creditAccount).then(function(a) {
          obj.currencyDAO.find(a.currency).then(function(c) {
            if ( c ) {
              self.add(c.format(value));
            } else {
              self.add(value);
            }
          });
        });
      },
      unitPropValueToString: async function(x, val) {
        let a = await this.accountDAO.find(this.creditAccount);
        let c = await this.currencyDAO.find(a.currency);
        return c.format(val);
      }
    },
    {
      name: 'denomination',
      class: 'String',
      visibility: 'HIDDEN',
      transient: true
    }
  ]
});
