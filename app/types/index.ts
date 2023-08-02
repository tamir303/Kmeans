export type InputFileType = Blob | null;
export type ClusterObjectType = { fields: string[]; values: string[][] };
export type DataObjectType = {
    iter: number, // Iteration Number
    k: number, // Number of groups
    clusters: ClusterObjectType[] // Each cluster of type ClusterObject
}
  
  