foam.CLASS({
  package: 'hughes.journal',
  name: 'EventTransactionDAO',
  extends: 'foam.dao.ProxyDAO',

  documentation: 'Create Transaction from Event',

  javaImports: [
    'foam.core.cron.Schedule',
    'foam.dao.ArraySink',
    'foam.dao.DAO',
    'foam.util.SafetyUtil',
    'hughes.ledger.Transaction',
    'java.util.ArrayList',
    'java.util.List'
  ],

  methods: [
    {
      name: 'find_',
      javaCode: `
      Event event = (Event) getDelegate().find_(x, id);
      if ( event != null ) {
        List<Transaction> txns = (List) ((ArraySink) event.getTxns(getX()).select(new ArraySink())).getArray();
        if ( txns != null &&
             txns.size() > 0 ) {
          event = (Event) event.fclone();
          event.setTransactions(txns.toArray(new Transaction[0]));
        }
      }
      return event;
      `
    },
    {
      name: 'put_',
      javaCode: `
      Event event = (Event) getDelegate().put_(x, obj);
      Transaction[] txns = event.getTransactions();
      if ( txns != null ) {
        for ( Transaction txn : txns ) {
          if ( ! SafetyUtil.isEmpty(txn.getId()) )
            continue;

          // Schedule schedule = event.getWhen();
          // java.util.Date date = schedule.getNextScheduledTime(x, null);
          // if ( date != null &&
          //      date.getTime() <= System.currentTimeMillis() ) {
            // Transaction nu = (Transaction) ((DAO) x.get("transactionDAO")).put_(x, txn);
            Transaction nu = (Transaction) event.getTxns(x).put(txn);
            txn.copyFrom(nu);
          // }
        }
      }
      return event;
      `
    },
    {
      // TODO:
      name: 'remove_',
      javaCode: `
      Event event = (Event) obj;
      // Transaction txn = (Transaction) ((DAO) x.get("transactionDAO")).find_(x, event.getTransaction());
      // if ( txn != null ) {
      //   txn = (Transaction) event.getTransactions(x).remove_(x, txn);
      //   // ((DAO) x.get("transactionDAO")).remove_(x, txn);
      // }
      return getDelegate().remove_(x, obj);
      `
    }
  ]
})
