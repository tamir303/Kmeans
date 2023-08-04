import {ClusterController} from "@/app/server/controller/ClusterController";
import {DataObjectType} from "@/app/types";
import {NextResponse} from "next/server";

export async function POST(request : Request) {
    try {
        const dataObject = (await request.json())as DataObjectType;

        const clusterController = new ClusterController(dataObject)
        const data = clusterController.nextIter()as DataObjectType

        return NextResponse.json(data, {status: 200})
    } catch (error : any) {
        return NextResponse.json({
            message: "Error"
        }, {status: 500})
    }
}
