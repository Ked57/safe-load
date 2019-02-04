# safe-load

Validate your payload in js or typescript

## Installation

`npm i safe-load`

## Usage

It's very easy to use, you need 2 object:

- payload: contains your payload
- payloadSchema: contains your expect payload schema

### Safe-Load is very usefull if you're using typescript !

Safe-Load validates your payload and lets typescript know that it is valid

```typescript
import { validate } from "./safe_load";

type Payload = {
  data: {
    welcomingMessages: string[];
    level: number;
    nickname: string;
  };
  key: string;
  isABoolean: boolean;
};

const payload = {
  data: {
    welcomingMessages: ["hello world", "hello there"],
    level: 12,
    nickname: "ked"
  },
  key: "akey",
  isABoolean: true
};

const payloadSchema = {
  data: {
    welcomingMessages: ["string"],
    level: "number",
    nickname: "string"
  },
  key: "string",
  isABoolean: "boolean"
};

if (validate<Payload>(payload, payloadSchema)) {
  //your payload object is now considered typed as Payload by typescript !
}
```

### Basic js example

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

if(validate(payload, payloadSchema)){
  console.log("payload is valid")
}else{
  console.log("payload is not valid")
}
```

The result should be

```payload is valid

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

if(validate(payload, payloadSchema)){
  console.log("payload is valid")
}else{
  console.log("payload is not valid")
}
```

This will work because the object "payload" contains all the fields listed in the schema and they all got the correct type

## Contribute !

Contributions are always welcomed !
