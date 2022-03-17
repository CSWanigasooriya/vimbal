export interface IpfsReceipt {
  path: string;
  cid: {
    code: number;
    version: number;
    hash?: {
      [key: string]: number;
    };
  };
  size: number;
}
