/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Payment {
  blockHash: string;
  blockNumber: number;
  contractAddress: string;
  cumulativeGasUsed: number;
  events: any;
  from: string;
  gasUsed: number;
  logsBloom: string;
  status: string;
  to: string;
  transactionHash: string;
  transactionIndex: number;
}
