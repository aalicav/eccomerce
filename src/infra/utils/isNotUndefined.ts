export const isNotUndefined = <T>(message: string, parameter?: T): T => {
  if (!parameter || parameter === "") {
    throw new Error(message);
  }
  return parameter as T;
};
