export interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
  [key: string]: unknown;
}
