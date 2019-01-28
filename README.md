# safe-load
Validate your payload in js or typescript

## Installation
```npm i safe-load```

## Usage

It's very easy to use, you need 2 object: 
* payload: contains your payload
* payloadSchema: contains your expect payload schema

### Basic example 

```javascript
const { validate } = require("safe-load");

const payload = {
  data: {
    welcomingMessage: "hello world",
    level: 12,
    nickname: "ked"
  }
};

const payloadSchema = {
  data: {
    welcomingMessage: "string",
    level: "number",
    nickname: "string"
  }
};

validate(payload, payloadSchema)
  .then(payload => {
    console.log("payload is valid");
    console.log(payload);
  })
  .catch(err => console.error(err));
  ```
  
The result should be

```payload is valid
{ welcomingMessage: 'hello world', level: 12, nickname: 'ked' }
```

### Payload can be larger than the schema

Do you always use every field of your payload ? I personaly don't, that's why I chose to let you validate payloads that are bigger than your schema.

Example:
```javascript
const { validate } = require("safe-load");

const payload = {
  data: {
    welcomingMessage: "hello world",
    level: 12,
    nickname: "ked",
    somethingNotUsefull: "this is really not important"
  }
};

const payloadSchema = {
  data: {
    welcomingMessage: "string",
    level: "number",
    nickname: "string"
  }
};

validate(payload, payloadSchema)
  .then(payload => {
    console.log("payload is valid");
    console.log(payload);
  })
  .catch(err => console.error(err));
  ```
This will work because the object "payload" contains all the fields listed in the schema and they all got the correct type

## Contribute !

Contributions are always welcomed !
