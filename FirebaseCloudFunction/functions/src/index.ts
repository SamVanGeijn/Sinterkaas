import * as functions from 'firebase-functions';
// import { dialogflow, SimpleResponse, BasicCard, Button, Image } from 'actions-on-google';
import { dialogflow } from 'actions-on-google';
import { rijmen } from './rijmen';

const app = dialogflow({ debug: true });

app.intent('Kaas Verzoek', async (conv, params) => {
    const rijmArray: any = rijmen.filter(eenRijm => eenRijm.kazen.includes(params.Kazen));
    const rijmString: string = rijmArray[Math.floor(Math.random() * rijmArray.length)].rijmen.replace("<KAAS>", params.Kazen as string);
    conv.ask(rijmString);
});

// Firebase specifieke manier om de Serverless function te exporteren.
export const fulfillment = functions.region('europe-west1').https.onRequest(app);