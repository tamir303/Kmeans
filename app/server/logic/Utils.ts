import {ClusterObjectType} from "@/app/types";
import {sum} from "d3";

export function validateClusterData(iter : number, k : number, clusters : ClusterObjectType[]) {
    if (Number.isNaN(iter && k) || !Number.isInteger(iter && k) || (iter && k < 0)) 
        throw new Error("Iter/k mus't be an integer greater or equal to zero");
    
    const nonValidCluster = clusters !== null && clusters.some((cluster) => {
        return cluster.values.some((valueArray) => {
            return valueArray.some((value) => isNaN(Number(value)));
        });
    });

    if (nonValidCluster) 
        throw new Error("Atleast one input contains non-number input");
}

export function distanceFromCentroid(point : string[], centroid : number[]): number { // Euclidean distance
    const N = point.length;

    return Math.sqrt(sum(Array.from({
        length: N
    }, (_, i) => i).map((i) => Math.pow(Number(point[i]) - centroid[i], 2))));
}
