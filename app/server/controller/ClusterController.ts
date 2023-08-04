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

            // Initialize clusters with provided data and fill remaining clusters with empty ones
            const fields = clusters[0].fields;
            this._clusters = clusters.map((cluster) => new Cluster(cluster, uuidv4())).concat(new Array(Math.abs(k - clusters.length)).fill(new Cluster({
                fields,
                values: []
            }, uuidv4())));
        }
    }

    // Clean values from all clusters
    cleanClusters() {
        this._clusters.forEach((cluster) => (cluster.values = []));
    }

    nextIter() {
        const allPoints = this._clusters.flatMap((cluster) => cluster.values);
        const N = allPoints.length;
        const M = this._clusters.length;

        // Clear clusters before the next iteration
        this.cleanClusters();

        if (this._iter === 0) { // Randomly choose the first points in the array and spread them around the clusters
            this._clusters.forEach((cluster) => {
                cluster.values.push(allPoints[0]);
                allPoints.shift();
            });

            // Calculate initial centroids for each cluster
            const centroids = this._clusters.map((cluster) => cluster.findCentroid());

            // Create a nested array where each row represents a point (Pi) and each column represents the distance from centroid (Ci)
            const centroDistance: number[][] = Array.from({
                length: N
            }, () => new Array(M).fill(0));

            // Calculate the distance from each point to each centroid
            centroids.forEach((centroid, Ci) => allPoints.forEach((point, Pi) => (centroDistance[Pi][Ci] = distanceFromCentroid(point, centroid))));

            // Assign each point to the closest cluster
            centroDistance.forEach((subPiArr) => {
                const closestClusterCentroid = subPiArr.indexOf(Math.min(...subPiArr));
                this._clusters[closestClusterCentroid].addValue(allPoints.shift());
            });
        }

        // this._iter++;
        return {iter: this._iter, k: this._k, clusters: this._clusters}
    }
}
