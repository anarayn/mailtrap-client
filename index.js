const MailtrapClient = require('./lib');

let token='122ffee0a362754d8a135ad669293d69';
const accountId='205646';
const inboxId='419122';

const client = new MailtrapClient(token, accountId, inboxId);

client.readMessages('You are awesome!').then(mailContent =>{
    console.log(cnt);
    cy.document().then((document) => { document.documentElement.innerHTML = mailContent });

    // doo all your cypress operation


});


