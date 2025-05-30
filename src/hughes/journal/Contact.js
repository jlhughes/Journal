foam.CLASS({
  package: 'hughes.journal',
  name: 'Contact',

  documentation: '',

  implements: [
    'foam.core.auth.CreatedAware'
  ],

  javaImports: [
    'foam.util.SafetyUtil'
  ],

  imports: [
    'userDAO'
  ],

  requires: [
    'foam.core.auth.Address',
    'foam.core.auth.Phone'
  ],

  tableColumns: [
    'firstName',
    'lastName',
    'businessName',
    'email',
    'phoneNumber',
    'mobileNumber',
    'owner'
  ],

  searchColumns: [
    'businessName',
    'email',
    'firstName',
    'lastName',
    'owner',
    'note'
  ],

  properties: [
    {
      __copyFrom__: 'foam.core.auth.User.ID',
      readPermissionRequired: true,
      visibility: 'HIDDEN'
    },
    {
      name: 'owner',
      class: 'Reference',
      of: 'foam.core.auth.User',
      view: function(_, X) {
        return {
          class: 'foam.u2.view.RichChoiceReferenceView',
          search: true,
          sections: [
            {
              heading: 'Users',
              dao: X.userDAO
            }
          ]
        };
      },
      tableCellFormatter: function(value, obj) {
        var self = this;
        obj.userDAO.find(value).then(function(u) {
          if ( u ) self.add(u.toSummary());
        });
      },
      gridColumns: 6
    },
    {
      __copyFrom__: 'foam.core.auth.User.LEGAL_NAME',
      gridColumns: 6
    },
    {
      __copyFrom__: 'foam.core.auth.User.FIRST_NAME',
      gridColumns: 4
    },
    {
      __copyFrom__: 'foam.core.auth.User.MIDDLE_NAME',
      gridColumns: 4
    },
    {
      __copyFrom__: 'foam.core.auth.User.LAST_NAME',
      gridColumns: 4
    },
    {
      __copyFrom__: 'foam.core.auth.User.PHONE_NUMBER',
      gridColumns: 4
    },
    {
      __copyFrom__: 'foam.core.auth.User.MOBILE_NUMBER',
      createVisibility: 'RW',
      gridColumns: 4
    },
    {
      __copyFrom__: 'foam.core.auth.User.EMAIL',
      gridColumns: 4
    },
    {
      __copyFrom__: 'foam.core.auth.User.BIRTHDAY',
      gridColumns: 4
    },
    {
      __copyFrom__: 'foam.core.auth.User.BUSINESS_NAME',
      gridColumns: 4
    },
    {
      __copyFrom__: 'foam.core.auth.User.WEBSITE',
      gridColumns: 4
    },
    {
      __copyFrom__: 'foam.core.auth.User.NOTE',
      gridColumns: 12
    },
    {
      __copyFrom__: 'foam.core.auth.User.ADDRESS',
      gridColumns: 12
    },
    {
      __copyFrom__: 'foam.core.auth.User.PROFILE_PICTURE',
      visibility: 'HIDDEN',
      gridColumns: 3
    }
  ],

  methods: [
    function toSummary() {
      return this.legalName;
    }
  ]
});
