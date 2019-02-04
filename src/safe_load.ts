export const validate = <T>(
  payload: { [key: string]: unknown },
  schema: { [key: string]: unknown }
): payload is T => {
  if (typeof payload !== "object" || payload === null) {
    return false;
  }
  const schemaKeys = Object.keys(schema);
  return schemaKeys.every(key => {
    const row = payload[key];
    const schemaRow = schema[key];
    if (
      typeof row === "object" &&
      row !== null &&
      typeof schemaRow === "object" &&
      schemaRow !== null
    ) {
      return validate(row, schemaRow);
    } else if (typeof row !== schemaRow) {
      return false;
    } else {
      return true;
    }
  });
};
