export interface ChainData {
  network: {
    name: string;
    chainId: number;
    ensAddress?: string;
    _defaultProvider?: ((providers: any, options?: any) => any) | undefined;
  };
  networkData: any;
  contract: any;
}
