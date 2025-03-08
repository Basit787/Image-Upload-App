export const createKey = (name: string) => {
  return `${Date.now()}-${name}`;
};

export const getMb = (size: number) => {
  return `${Math.round((size / 1024 ** 2) * 100) / 100}Mb`;
};
