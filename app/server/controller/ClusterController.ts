import { ClusterObjectType, DataObjectType } from "@/app/types";
import { Cluster } from "@/app/server/logic/Cluster"

export class ClusterController {
  private _iter: number;
  private _k: number;
  private _clusters: Cluster[];

  constructor({ iter, k, clusters }: DataObjectType) {
    try {
      if (
        Number.isNaN(iter && k) ||
        Number.isInteger(iter && k) ||
        (iter && k < 0)
      )
        throw new Error("Iter/k mus't be an integer greater or equal to zero");

      const nonValidCluster = clusters
        .flatMap((cluster) => cluster.values)
        .filter((valueArray) => {
          return valueArray.every((value) => !Number.isNaN(value));
        });

      if (nonValidCluster)
        throw new Error("Atleast one input contains non-number input");

    } catch (error: any) {
      throw new Error(error);
    } finally {
      this._iter = iter;
      this._k = k;
      this._clusters = clusters.map((cluster) => new Cluster(cluster));
    }
  }
}
