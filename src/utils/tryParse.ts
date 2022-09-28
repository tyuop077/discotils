const tryParse = <T = unknown>(value: string) => {
  try {
    return JSON.parse(value) as T;
  } catch (e) {
    console.error("Failed to parse JSON", value);
    return undefined;
  }
}

export default tryParse;
