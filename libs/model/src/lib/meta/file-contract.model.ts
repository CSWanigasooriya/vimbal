export interface FileContract {
  id: number;
  hash: string;
  title: string;
  authors: string;
  keywords: string;
  description: string;
  tipAmount: number;
  timestamp: number;
  owner: number;
}

export type WithDateFormat<T> = Omit<T, 'timestamp'> & {
  timestamp: Date;
};
