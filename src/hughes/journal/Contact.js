foam.CLASS({
  package: 'hughes.journal',
  name: 'Contact',

  documentation: 'Friend, associate',

  implements: [
    'foam.core.auth.Authorizable',
    'foam.core.auth.CreatedAware',
    'foam.core.auth.CreatedByAware'
  ],

  javaImports: [
    'foam.core.auth.AuthorizationException',
    'foam.core.auth.AuthService',
    'foam.core.auth.Subject',
    'foam.core.auth.User',
    'foam.util.SafetyUtil'
  ],

  imports: [
    'auth?',
    'userDAO'
  ],

  requires: [
    'hughes.journal.AccessLevel',
    'foam.core.auth.Address',
    'foam.core.auth.Phone'
  ],

  tableColumns: [
    'legalName',
    'businessName',
    'email',
    'phoneNumber',
    'mobileNumber',
    'owner',
    'tag'
  ],

  searchColumns: [
    'businessName',
    'email',
    'firstName',
    'lastName',
    'owner',
    'note',
    'tag'
  ],

  properties: [
    {
      __copyFrom__: 'foam.core.auth.User.ID',
      readPermissionRequired: false,
      createVisibility: 'HIDDEN',
      readVisibility: 'RO',
      updateVisibility: 'RO',
      gridColumns: 4,
      order: 1
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
      gridColumns: 4,
      order: 2
    },
    {
      documentation: 'Other user access to this Event. Public - all, Private - owner and who, protected - all or owner and who if who set',
      name: 'access',
      class: 'Enum',
      of: 'hughes.journal.AccessLevel',
      value: 'PUBLIC',
      gridColumns: 4,
      order: 3
    },
    {
      name: 'tag',
      label: 'Tag/Group',
      documentation: 'Used for grouping contacts',
      class: 'String',
      gridColumns: 4,
      order: 3
    },
    {
      __copyFrom__: 'foam.core.auth.User.FIRST_NAME',
      gridColumns: 4,
      order: 4
    },
    {
      __copyFrom__: 'foam.core.auth.User.MIDDLE_NAME',
      columnPermissionRequired: false,
      gridColumns: 4,
      order: 5
    },
    {
      __copyFrom__: 'foam.core.auth.User.LAST_NAME',
      gridColumns: 4,
      order: 6
    },
    {
      __copyFrom__: 'foam.core.auth.User.LEGAL_NAME',
      columnPermissionRequired: false,
      gridColumns: 4,
      order: 7
    },
    {
      __copyFrom__: 'foam.core.auth.User.PHONE_NUMBER',
      columnPermissionRequired: false,
      gridColumns: 4,
      order: 8
    },
    {
      __copyFrom__: 'foam.core.auth.User.MOBILE_NUMBER',
      createVisibility: 'RW',
      columnPermissionRequired: false,
      gridColumns: 4,
      order: 9
    },
    {
      __copyFrom__: 'foam.core.auth.User.EMAIL',
      gridColumns: 4,
      order: 10
    },
    {
      __copyFrom__: 'foam.core.auth.User.BIRTHDAY',
      columnPermissionRequired: false,
      gridColumns: 4,
      order: 11
    },
    {
      __copyFrom__: 'foam.core.auth.User.BUSINESS_NAME',
      columnPermissionRequired: false,
      gridColumns: 4,
      order: 12
    },
    {
      __copyFrom__: 'foam.core.auth.User.WEBSITE',
      createVisibility: 'RW',
      columnPermissionRequired: false,
      gridColumns: 4,
      order: 13
    },
    {
      __copyFrom__: 'foam.core.auth.User.NOTE',
      gridColumns: 12,
      order: 14
    },
    {
      __copyFrom__: 'foam.core.auth.User.ADDRESS',
      gridColumns: 12,
      order: 15
    },
    {
      __copyFrom__: 'foam.core.auth.User.PROFILE_PICTURE',
      visibility: 'HIDDEN',
      gridColumns: 3
    },
    {
      name: 'created',
      order: 15
    },
    {
      name: 'createdBy',
      order: 16
    },
    {
      name: 'createdByAgent',
      visibility: 'HIDDEN',
      order: 17
    }
  ],

  methods: [
    function toSummary() {
      return this.legalName;
    },
    {
      name: 'authorizeOnCreate',
      args: 'X x',
      javaThrows: ['AuthorizationException'],
      javaCode: `
        AuthService auth = (AuthService) x.get("auth");
        if ( ! auth.check(x, "contact.create") ) {
          throw new AuthorizationException("You do not have permission to create contacts.");
        }
      `
    },
    {
      name: 'authorizeOnRead',
      args: 'X x',
      javaThrows: ['AuthorizationException'],
      javaCode: `
        if ( this.getAccess() == AccessLevel.PUBLIC ||
             this.getAccess() == AccessLevel.PROTECTED )
          return;

        AuthService auth = (AuthService) x.get("auth");
        Subject subject = (Subject) x.get("subject");
        User user = subject.getUser();
        if ( user.getId() != this.getCreatedBy() &&
             user.getId() != this.getOwner() &&
             ! auth.check(x, "contact.read." + this.getId()) ) {
          throw new AuthorizationException();
        }
      `
    },
    {
      name: 'authorizeOnUpdate',
      args: 'X x',
      javaThrows: ['AuthorizationException'],
      javaCode: `
        if ( this.getAccess() == AccessLevel.PUBLIC ) return;

        AuthService auth = (AuthService) x.get("auth");
        Subject subject = (Subject) x.get("subject");
        User user = subject.getUser();
        if ( user.getId() != this.getCreatedBy() &&
             user.getId() != this.getOwner() &&
             ! auth.check(x, "contact.update." + this.getId()) ) {
          throw new AuthorizationException("You do not have permission to update this contact.");
        }
      `
    },
    {
      name: 'authorizeOnDelete',
      args: 'X x',
      javaThrows: ['AuthorizationException'],
      javaCode: `
        AuthService auth = (AuthService) x.get("auth");
        Subject subject = (Subject) x.get("subject");
        User user = subject.getUser();
        if ( user.getId() != this.getCreatedBy() &&
             user.getId() != this.getOwner() &&
             ! auth.check(x, "contact.remove." + this.getId()) ) {
          throw new AuthorizationException("You do not have permission to delete this contact.");
        }
      `
    }
  ]
});
