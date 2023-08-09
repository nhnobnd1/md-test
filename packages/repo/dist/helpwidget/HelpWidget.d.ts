import { BaseListRequest, BaseListResponse, BaseResponse } from '../unty';
export type HelpWidget = {
    id: string;
    createdDatetime: string;
    createdTimestamp: number;
    createdBy: string;
    updatedDatetime?: string;
    updatedTimestamp?: string;
    updatedBy?: string;
    deleted: boolean;
    deletedDatetime?: string;
    deletedTimestamp?: string;
    deletedBy?: string;
    name: string;
    storeId: string;
    _id: string;
    settings: any;
};
export interface BaseListHelpWidgetRequest extends BaseListRequest {
    sortBy?: string;
    sortOrder?: number;
}
export type GetListHelpWidgetRequest = BaseListHelpWidgetRequest;
export type GetListHelpWidgetResponse = BaseListResponse<HelpWidget>;
export type GetOneHelpWidgetResponse = BaseResponse<HelpWidget>;
export type CreateHelpWidgetRequest = Omit<HelpWidget, 'id'>;
export type CreateHelpWidgetResponse = BaseResponse<HelpWidget>;
export type UpdateHelpWidgetRequest = HelpWidget;
export type UpdateHelpWidgetResponse = BaseResponse<HelpWidget>;
export type DeleteHelpWidgetResponse = BaseListResponse<HelpWidget>;
//# sourceMappingURL=HelpWidget.d.ts.map