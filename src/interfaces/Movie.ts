import { Status } from "./Status";

export interface Movie {
    url: string;
    name: string;
    size: string;
    downloadUrl: string;
    status: Status;
}