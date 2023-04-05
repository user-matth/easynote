import { BaseResourceModel } from "./base-resource.model";

export class NoteModel extends BaseResourceModel {
    constructor(
        public title?: string,
        public description?: string,
        public status?: boolean,
        public user_id?: number
    ) {
        super()
    }
    static fromJson(json: any): NoteModel {
        return Object.assign(new NoteModel(), json);
    }
}