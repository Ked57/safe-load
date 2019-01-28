const check = async (
  payload: { [key: string]: any },
  schema: { [key: string]: any }
) => {
  return await Promise.all(
    Object.keys(payload).map(
      async key =>
        new Promise(async (resolve, reject) => {
          if (typeof payload[key] === "object") {
            try {
              resolve(await check(payload[key], schema[key]));
            } catch (err) {
              reject(err);
            }
          } else if (typeof payload[key] !== schema[key]) {
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
