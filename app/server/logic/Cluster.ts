import { ClusterObjectType } from "@/app/types"

export class Cluster {
    private _fields: string[]
    private _values: string[][]

    constructor({ fields, values }: ClusterObjectType) {
        this._fields = fields
        this._values = values
    }

    /**
     * Centroid_d = (1 / N) * Σᵢ x_i,d
        Where:

        Centroid_d is the centroid value along dimension d.
        N is the total number of data points.
        x_i,d is the value of the data point i along dimension d.
    */
    centroid() {
        return Array
            .from({ length: this._fields.length }, (_, index) => index) // For each field (dᵢ)
            .map((index) => {
                return this._values
                    .reduce((sum, valueArray) => sum + Number(valueArray[index]), 0)
            })
    };
}

/**
 * WCSS = Σᵢ Σₓ₌₁ⁿ (x - μᵢ)²
    Where:

    WCSS: Within-Cluster Sum of Squares
    Σᵢ: Summation over all clusters (i = 1 to K)
    Σₓ₌₁ⁿ: Summation over all data points within cluster i (x = 1 to n)
    x: Data point within cluster i
    μᵢ: Centroid (mean) of cluster i
 */
variance() {

}

nextIter() {

}
}