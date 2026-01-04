foam.POM({
  name: 'journal',
  vendorId: 'hughes',
  version: '1.3.0',
  java: 21,
  projects: [
    { name: 'foam3/pom' },
    { name: 'src/hughes/pom' },
    { name: 'foamchat/src/com/foamdev/chat/pom'},
    { name: "foamchat/webroot/pom" },
    { name: "foamchat/journals/pom" }
  ]
});
