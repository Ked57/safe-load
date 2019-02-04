import test from "ava";
import { validate } from "./safe_load";

const payload = {
  data: {
    welcomingMessages: ["hello world", "hello there"],
    level: 12,
    nickname: "ked"
  },
  key: "akey",
  isABoolean: true
};
const invalidPayload = {
  data: {
    welcomingMessages: ["hello world", "hello there"],
    level: 12,
    nickname: true
  },
  key: "akey",
  isABoolean: true
};
const missingPropertiesPayload = {
  data: { welcomingMessages: ["hello world", "hello there"], level: 12 }
};
const largerThanSchemaPayload = {
  data: {
    welcomingMessages: ["hello world", "hello there"],
    level: 12,
    nickname: "ked"
  },
  key: "akey",
  isABoolean: true,
  someThingNotUsefull: "this is really not important"
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

test("payload is valid", t => {
  t.is(validate(payload, payloadSchema), true);
});

test("payload is not valid", t => {
  t.is(validate(invalidPayload, payloadSchema), false);
});

test("payload has missing properties", t => {
  t.is(validate(missingPropertiesPayload, payloadSchema), false);
});

test("payload is larger than schema", t => {
  t.is(validate(largerThanSchemaPayload, payloadSchema), true);
});
