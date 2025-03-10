foam.POM({
  name: 'journal',
  vendorId: 'hughes',
  version: '1.0.0',
  java: 21,
  setFlags: {
    u3: true
  },
  tasks: [
    function jarJournals() {
      this.SUPER();
      var journals = this.BUILD_DIR + '/journals/';
      // foams self-sign certificates for https and http2 development
      this.copyDir('./src/resources', journals);
    }
  ],
  projects: [
    { name: 'foam3/pom' },
    { name: 'src/hughes/pom' },
    { name: 'deployment/journal/pom' }
  ]
});
