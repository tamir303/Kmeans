import {ClusterController} from "@/app/server/controller/ClusterController";
import {DataObjectType} from "@/app/types";

export async function POST(request : Request) {
    const dataObject = (await request.json())as DataObjectType;

    const clusterController = new ClusterController(dataObject)
    clusterController.nextIter()

    return clusterController
}
