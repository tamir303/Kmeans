import { ClusterObjectType, DataObjectType } from "@/app/types";

class ClusterController {
  private _iter: number;
  private _k: number;
  private _clusters: ClusterObjectType[];

  constructor({ iter, k, clusters }: DataObjectType) {
    try {
      this.validateInput({ iter, k, clusters });
    } catch (error: any) {
      throw new Error(error);
    } finally {
      this._iter = iter;
      this._k = k;
      this._clusters = clusters;
    }
  }

  private validateInput({
    iter,
    k,
    clusters,
  }: DataObjectType): Error | boolean {
    if (
      Number.isNaN(iter && k) ||
      Number.isInteger(iter && k) ||
      (iter && k < 0)
    )
      return new Error("Iter/k mus't be an integer greater or equal to zero");

    const nonValidCluster = clusters
      .flatMap((cluster) => cluster.values)
      .filter((valueArray) => {
        return valueArray.every((value) => !Number.isNaN(value));
      });

    if (nonValidCluster)
      return new Error("Atleast one input contains non-number input");

    return true;
  }
}
