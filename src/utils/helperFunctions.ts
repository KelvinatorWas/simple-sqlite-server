export const hasError = (error: Error | null) =>
  error ? console.log("ERROR: ", error.message) : null;

export const joinData = (data: (string | number)[]) => {
  const string = "?".repeat(data.length).split("").join(", ");
  return string;
};
