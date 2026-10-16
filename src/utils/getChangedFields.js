export const getChangedFields = (originalData, updatedData) => {
  const changedFields = {};

  for (const [key, updatedValue] of Object.entries(updatedData)) {
    const originalValue = originalData[key];

    const normalizedOriginal =
      typeof originalValue === "string"
        ? originalValue.trim()
        : originalValue;

    const normalizedUpdated =
      typeof updatedValue === "string"
        ? updatedValue.trim()
        : updatedValue;

    if (!isEqual(normalizedOriginal, normalizedUpdated)) {
      changedFields[key] = updatedValue;
    }
  }

  return changedFields;
};

const isEqual = (original, updated) => {
  if (Object.is(original, updated)) {
    return true;
  }

  if (
    original === null ||
    updated === null ||
    typeof original !== "object" ||
    typeof updated !== "object"
  ) {
    return false;
  }

  if (Array.isArray(original) || Array.isArray(updated)) {
    return (
      Array.isArray(original) &&
      Array.isArray(updated) &&
      original.length === updated.length &&
      original.every((item, index) =>
        isEqual(item, updated[index])
      )
    );
  }

  const originalKeys = Object.keys(original);
  const updatedKeys = Object.keys(updated);

  return (
    originalKeys.length === updatedKeys.length &&
    originalKeys.every(
      (key) =>
        Object.hasOwn(updated, key) &&
        isEqual(original[key], updated[key])
    )
  );
};
