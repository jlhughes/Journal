foam.CLASS({
  package: 'hughes.journal',
  name: 'Comment',

  properties: [
    {
      name: 'date',
      class: 'DateTime',
      factory: function() { return new Date(); },
      order: 1,
      gridColumns: 3
    },
    {
      name: 'comment',
      class: 'String',
      view: {
        class: 'foam.u2.tag.TextArea',
        rows: 2, cols: 60,
      },
      order: 2,
      gridColumns: 9
    }
  ]
})
