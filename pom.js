foam.POM({
  name: 'journal',
  vendorId: 'hughes',
  version: '1.1.0',
  java: 21,
  setFlags: {
    u3: true
  },
  projects: [
    { name: 'foam3/pom' },
    { name: 'src/hughes/pom' },
    { name: 'deployment/journal/pom' }
  ]
});
