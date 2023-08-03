import {ClusterObjectType} from "@/app/types";

export class Cluster {
    private _fields : string[];
    private _values : string[][];
    private _centroid : number[] = [];
    private _id : string;

    constructor({fields, values} : ClusterObjectType, id : string) {
        this._fields = fields;
        this._values = values;
        this._centroid = this.findCentroid();
        this._id = id;
    }

    get fields() {
        return this.fields;
    }

    get values() {
        return this._values;
    }

    get centroid() {
        return this._centroid;
    }

    get id() {
        return this._id;
    }

    set fields(fields : string[]) {
        this._fields = fields;
    }

    set values(values : string[][]) {
        this._values = values;
    }

    set centroid(centroid) {
        this._centroid = centroid;
    }

    /**
       * Centroid_d = (1 / N) * Σᵢ x_i,d
          Where:
  
          Centroid_d is the centroid value along dimension d.
          N is the total number of data points.
          x_i,d is the value of the data point i along dimension d.
      */
    findCentroid() { // For each field (dᵢ) calculate the average
        const N = this._values.length;
        const D = this._fields.length;

        this._centroid = Array.from({
            length: D
        }, (_, index) => index).map((index) => {
            return((1 / N) * this._values.reduce((sum, valueArray) => sum + Number(valueArray[index]), 0));
        });

        return this._centroid;
    }

    /**
      * Variance = (1 / N) * Σᵢ Σᵈ (xᵢ₋ᵈ - μᵈ)²
          Where:
  
          Variance: The variance of the cluster.
          N: The total number of data points in the cluster.
          Σᵢ: Summation over all data points in the cluster (i = 1 to N).
          Σᵈ: Summation over all dimensions (d = 1 to D).
          xᵢ₋ᵈ: The value of data point i along dimension d.
          μᵈ: The value of the centroid along dimension d.
      */
    findVariance() {
        const N = this._values.length;
        const D = this._fields.length;
        const centroid = this._centroid;

        // Calculate the variance for each dimension
        const variance = this._values.reduce((acc, valueArray) => {
            return acc.map((sum, d) => sum + Math.pow(Number(valueArray[d]) - centroid[d], 2));
        }, Array.from({
            length: D
        }, () => 0));

        // Divide by N to get the average variance
        return variance.map((sum) => (1 / N) * sum);
    }

    nextIter(values : string[][]) {
        this._values = values;
        this._centroid = this.findCentroid();
    }
}
