'use strict';

process.env.DEBUG = 'actions-on-google:*';

const ActionsSdkApp = require('actions-on-google').ActionsSdkApp;
const functions = require('firebase-functions');

const NO_INPUTS = [
  'I didn\'t hear that.',
  'If you\'re still there, say that again.',
  'We can stop here. See you soon.'
];

exports.ratioBoard = functions.https.onRequest((request, response) => {
  const app = new ActionsSdkApp({request, response});
  var room = "";
  var post = "";

  function mainIntent (app) {
    console.log('mainIntent');
    let inputPrompt = app.buildInputPrompt(true, '<speak>Hi! <break time="1"/> ' +
      'I can post messages to a room <break time="1"/>' +
      'Please say the name of the room that you would like to enter.', NO_INPUTS);
    app.ask(inputPrompt);
  }

  function roomHandler(app) {
      console.log('roomHandler');
      if(app.getRawInput() === 'bye') {
          app.tell('Goodbye!');
    //   } else if(app.getRawInput() === 'yes') {
    //   } else if(app.getRawInput() === 'no') {
      } else {
          if(app.getRawInput() !== null) {
              room = app.getRawInput();
              let inputPrompt = app.buildInputPrompt(true, '<speak> You said to join room, ' +
                room + '</speak>', NO_INPUTS);
          }
      }
    }

  function postHandler(app) {
      console.log('postHandler');
      if(app.getRawInput() === 'bye') {
          app.tell('Goodbye!');
      } else {
      }
  }

  function getPostsHandler(app) {
      console.log('getPostsHandler');
      if(app.getRawInput() === 'bye') {
          app.tell('Goodbye!');
      } else {
      }
  }

  function rawInput (app) {
    console.log('rawInput');
    if (app.getRawInput() === 'bye') {
      app.tell('Goodbye!');
    } else {
      let inputPrompt = app.buildInputPrompt(true, '<speak>You said, ' +
        app.getRawInput() + '</speak>', NO_INPUTS);
      app.ask(inputPrompt);
    }
  }

  let actionMap = new Map();
  actionMap.set(app.StandardIntents.MAIN, mainIntent);
  actionMap.set(actions.intent.ROOM, roomHandler);
  actionMap.set(actions.intent.POST, postHandler);
  actionMap.set(actions.intent.GET_POSTS, getPostsHandler);
  actionMap.set(app.StandardIntents.TEXT, rawInput);

  app.handleRequest(actionMap);
});