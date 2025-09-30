foam.CLASS({
  package: 'hughes.journal',
  name: 'UserRefines',
  refines: 'foam.core.auth.User',

  actions: [
    {
      name: 'ledger',
      isAvailable: async function() {
        return this.id &&
          await this.auth.check(null, 'transaction.read.*');
      },
      code: async function(X) {
        // Using href directly to pass key=value arguments, not possible with routeTo.
        // Also, setting window.location.search is problematic as it needs to be cleared after use.
        window.location.href = "/#flow/AccountLedger?flowMode=PRESENTATION&userId="+this.id;
      }
    }
  ]
});
