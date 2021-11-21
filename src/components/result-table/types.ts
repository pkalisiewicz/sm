type HeaderProps = {
  header: string;
  key: string;
};

type RowsProps = {
  count?: number;
  id: string;
  name: string;
};

export type ResultTableProps = {
  description: string;
  headers: HeaderProps[];
  rows: RowsProps[];
  title: string;
};
