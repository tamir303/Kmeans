import { ClusterController } from "@/app/server/controller/ClusterController";
import { DataObjectType } from "@/app/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const dataObject = (await request.json()) as DataObjectType;

        const clusterController = new ClusterController(dataObject)
        const data = clusterController.nextIter()
        const dataJson = {
            k: data.k,
            t: data.iter,
            clusters: data.clusters.map((cluster) => {
                return { fields: cluster.fields, values: cluster.values }
            })
        }
        return NextResponse.json(dataJson, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            message: "Error"
        }, { status: 500 })
    }
}
