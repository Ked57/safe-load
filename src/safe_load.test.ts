import test from "ava";
import { validate } from "./safe_load";

const payload = {
  data: {
    welcomingMessage: "hello world",
    level: 12,
    nickname: "ked"
  }
};
const invalidPayload = {
  data: {
    welcomingMessage: "hello world",
    level: 12,
    nickname: true
  }
};
const missingPropertiesPayload = {
  data: {
    welcomingMessage: "hello world",
    level: 12
  }
};
const incompleteSchemaPayload = {
  data: {
    welcomingMessage: "hello world",
    level: 12,
    nickname: "ked",
    somethingNotImportant: "this is really not important"
  }
};
const payloadSchema = {
  data: {
    welcomingMessage: "string",
    level: "number",
    nickname: "string"
  }
};

test("payload is valid", async t => {
  const testPayload = await validate(payload, payloadSchema);
  t.deepEqual(testPayload, payload);
});

test("payload is not valid", async t => {
  try {
    const testPayload = await validate(invalidPayload, payloadSchema);
    t.notDeepEqual(testPayload, payload);
  } catch (err) {
    t.pass();
  }
});

test("payload has missing properties", async t => {
  try {
    await validate(missingPropertiesPayload, payloadSchema);
    t.fail("validate's promise didn't reject with missingPropertiesPayload");
  } catch (err) {
    t.pass();
  }
});

test("schema is incomplete but payload is valid", async t => {
  try {
    await validate(incompleteSchemaPayload, payloadSchema);
    t.pass();
  } catch (err) {
    console.error(err);
    t.fail("validate's promise rejected with incompleteSchemaPayload");
  }
});
