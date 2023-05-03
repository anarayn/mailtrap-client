const axios = require('axios');

class MailtrapClient {
    
    constructor(token, accountId, inboxId) {
        this.accountId = accountId;
        this.inboxId = inboxId;
        this.config={
            headers: {
                'Accept': 'application/json',
                'Api-Token': token
              }
        };
    }

    async readMessages(subjectMatcher){

        return new Promise((resolve, reject)=>  {
            this.callApi(`https://mailtrap.io/api/accounts/${this.accountId}/inboxes/${this.inboxId}/messages`)
            .then(messages => {
                for(let message of messages){
                    if(message.subject && message.subject.includes(subjectMatcher) ){
                        console.log(`Found message with id: ${message.id}`);

                        const messageBody = this.getMessageHtml(message.id);
                        resolve(messageBody);
                    }
                }
                
                
            });
        });
    }

    getMessageHtml(messageId){

        return new Promise((resolve, reject)=>{
            this.callApi(`https://mailtrap.io/api/accounts/${this.accountId}/inboxes/${this.inboxId}/messages/${messageId}/body.html`)
            .then(message => {
                // console.log(`Got message with id: ${message}`);
                resolve(message);
            });
        });
        
    }

    callApi(url){
        return new Promise((resolve, reject)=>{
            axios.get(url, this.config)
            .then(res => {
              const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
              //console.log('Status Code:', res.status);
              //console.log('Date in Response header:', headerDate);          
              resolve(res.data);
            })
            .catch(err => {
              console.log('Error: ', err);
              reject(err);
            });
        });
    }
}




module.exports = MailtrapClient;