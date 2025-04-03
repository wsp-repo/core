/* eslint-disable @typescript-eslint/no-explicit-any */

export enum MergeArray {
  Append = 'append',
  Merge = 'merge',
  Replace = 'replace',
  Rewrite = 'rewrite',
}

export type MergeCustom = (
  target: any,
  source: any,
  options: MergeOptions,
) => any;

export type MergeOptions = {
  mergeArray?: MergeArray | MergeCustom;
  mergePath?: string;
  newObject?: boolean;
};
