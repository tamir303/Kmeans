import {DataObjectType} from "@/app/types";
import {Cluster} from "@/app/server/logic/Cluster";
import {v4 as uuidv4} from "uuid";
import {validateClusterData, distanceFromCentroid} from "@/app/server/logic/Utils";

export class ClusterController {
    private _iter : number;
    private _k : number;
    private _clusters : Cluster[];

    constructor({iter, k, clusters} : DataObjectType) {
        try {
            validateClusterData(iter, k, clusters);
        } catch (error : any) {
            throw new Error(error);
        } finally {
            this._iter = iter;
            this._k = k;

            const fields = clusters[0].fields;
            this._clusters = clusters.map((cluster) => new Cluster(cluster, uuidv4())).concat(new Array(Math.abs(k - clusters.length)).fill(new Cluster({
                fields: fields,
                values: []
            }, uuidv4())));
        }
    }

    cleanClusters() {
        this._clusters.forEach((cluster) => (cluster.values = []));
    }

    nextIter() {
        const allPoints = this._clusters.flatMap((cluster) => cluster.values);
        const N = allPoints.length;
        const M = this._clusters.length;

        this.cleanClusters();

        if (this._iter == 0) { // Randomly choose the first points in the array and spread them around the clusters
            this._clusters.forEach((cluster, index) => {
                cluster.values.push(allPoints[index]);
            });
            allPoints.slice(this._clusters.length);

            // Nested array of indexes and the equivalent cluster's centroid
            const centroids = this._clusters.map((cluster) => cluster.findCentroid());

            // Create nested array of which each row is a point_i and col is distance from Centroid_c
            const centroDistance = Array.from({
                length: N
            }, () => new Array(M).fill(0))

            // Each promise compare all points to Centroid_i
            centroids.forEach((centroid, Ci) => allPoints.forEach((point, Pi) => (centroDistance[Ci][Pi] = distanceFromCentroid(point, centroid))));

            console.log(centroDistance);
        }
    }

    // this._iter ++;
}
