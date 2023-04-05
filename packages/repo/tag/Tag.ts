import { Ticket } from '../ticket';
import { BaseListRequest, BaseListResponse, BaseResponse } from '../unty';

export type Tag = {
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
	ticketsCount: number;
	_id: string;
};
export interface BaseListTagRequest extends BaseListRequest {
	sortBy?: string;
	sortOder?: number;
}

export type GetListTicketByTagResponse = BaseListResponse<Ticket>;

export type GetListTagRequest = BaseListTagRequest;
export type GetListTagResponse = BaseListResponse<Tag>;
export type GetOneTagResponse = BaseResponse<Tag>;
export type CreateTagRequest = Omit<Tag, 'id'>;
export type CreateTagResponse = BaseResponse<Tag>;
export type UpdateTagRequest = Tag;
export type UpdateTagResponse = BaseResponse<Tag>;
export type DeleteTagResponse = BaseListResponse<Tag>;
