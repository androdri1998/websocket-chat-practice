# Backend-chat-app

This app is a backend app to create a websocket server to allow send messages between frontends connected.

## Available commands

### $ npm run start

Start application without reloading on changes.

### $ npm run dev

Start application watching every change on app to reload application with new changes applied.

### $ npm run test

Run unit tests created for this application.

## Available listeners

### set_username

This listener is user to set name for a user on chat, receive a `string` as a value.

### send_message

This listener is user to send a message for another users connected on chat, receive a `string` as a value.

## Available emiters

### receive_message

This emiter delivery messages on format bellow:

```
{
    name: string,
    message: string
}
```
