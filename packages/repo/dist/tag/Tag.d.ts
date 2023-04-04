import { Ticket } from '../ticket';
import { BaseListRequest, BaseListResponse, BaseResponse } from '../unty';
export declare type Tag = {
    id: string;
    createdDatetime: string;
    createdTimestamp: string;
    createdBy: string;
    updatedDatetime?: string;
    updatedTimestamp?: string;
    updatedBy?: string;
    deleted: boolean;
    deletedDatetime?: string;
    deletedTimestamp?: string;
    deletedBy?: string;
    name: string;
    description: string;
    storeId: string;
    _id: string;
};
export interface BaseListTagRequest extends BaseListRequest {
    sortBy?: string;
    sortOder?: number;
}
export declare type GetListTicketByTagResponse = BaseListResponse<Ticket>;
export declare type GetListTagRequest = BaseListTagRequest;
export declare type GetListTagResponse = BaseListResponse<Tag>;
export declare type GetOneTagResponse = BaseResponse<Tag>;
export declare type CreateTagRequest = Omit<Tag, 'id'>;
export declare type CreateTagResponse = BaseResponse<Tag>;
export declare type UpdateTagRequest = Tag;
export declare type UpdateTagResponse = BaseResponse<Tag>;
export declare type DeleteTagResponse = BaseListResponse<Tag>;
//# sourceMappingURL=Tag.d.ts.map