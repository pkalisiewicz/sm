export type ReturnNameValue = {
  name: string;
  value: string;
};

export type ReturnObjects = {
  name: string;
  count: number;
};

export type ReturnObjectWithId = ReturnNameValue & { id: string };
