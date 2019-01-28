const payloadContains = function(payload: any[], schema: any[]) {
  if (!payload || !schema) return false;

  for (let i = 0, l = schema.length; i < l; i++) {
    if (schema[i] instanceof Array && payload[i] instanceof Array) {
      if (!schema[i].equals(payload[i])) return false;
    } else if (schema[i] != payload[i]) {
      return false;
    }
  }
  return true;
};

const check = async (
  payload: { [key: string]: any },
  schema: { [key: string]: any }
) => {
  const payloadKeys = Object.keys(payload);
  const schemaKeys = Object.keys(schema);

  if (!payloadContains(payloadKeys, schemaKeys)) {
    return new Promise((_, reject) =>
      reject("Error: Payload's structure doesn't match the schema")
    );
  } else
    return await Promise.all(
      payloadKeys.map(
        async key =>
          new Promise(async (resolve, reject) => {
            if (Object.keys(payload))
              if (typeof payload[key] === "object") {
                try {
                  resolve(await check(payload[key], schema[key]));
                } catch (err) {
                  reject(err);
                }
              } else if (typeof payload[key] !== schema[key] && schema[key]) {
                reject(
                  `Error: payload's field "${key}" type is ${typeof payload[
                    key
                  ]} instead of ${schema[key]}`
                );
              } else {
                resolve(payload[key]);
              }
          })
      )
    );
};

export const validate = async (
  payload: { [key: string]: any },
  schema: { [key: string]: any }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      await check(payload, schema);
      resolve(payload);
    } catch (err) {
      reject(err);
    }
  });
};
