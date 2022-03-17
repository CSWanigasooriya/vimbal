import { FileContract } from './file-contract.model';

export type FormatedTimestampFileContract = Omit<FileContract, 'timestamp'> & {
  timestamp: Date;
};
