import { ChangeEvent } from "react";

export type UploadFormProps = {
  error: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
};
