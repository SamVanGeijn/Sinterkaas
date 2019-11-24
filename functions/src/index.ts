import * as functions from 'firebase-functions';
// import { dialogflow, SimpleResponse, BasicCard, Button, Image } from 'actions-on-google';
import { dialogflow } from 'actions-on-google';
import { rijmen } from './rijmen';

const app = dialogflow({ debug: true });

app.intent('Kaas Verzoek', async (conv, params) => {
    let rijm: any = rijmen.filter(eenRijm => eenRijm.kazen.includes(params.Kazen));
    let rijmString: string = rijm[0].rijmen.replace("<KAAS>", params.Kazen as string);
    conv.ask(rijmString);
});

// Firebase specifieke manier om de Serverless function te exporteren.
export const fulfillment = functions.region('europe-west1').https.onRequest(app);