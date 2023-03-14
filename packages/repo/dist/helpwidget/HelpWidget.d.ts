import { BaseListRequest, BaseListResponse, BaseResponse } from '../unty';
export declare type HelpWidget = {
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
export declare type GetListHelpWidgetRequest = BaseListHelpWidgetRequest;
export declare type GetListHelpWidgetResponse = BaseListResponse<HelpWidget>;
export declare type GetOneHelpWidgetResponse = BaseResponse<HelpWidget>;
export declare type CreateHelpWidgetRequest = Omit<HelpWidget, 'id'>;
export declare type CreateHelpWidgetResponse = BaseResponse<HelpWidget>;
export declare type UpdateHelpWidgetRequest = HelpWidget;
export declare type UpdateHelpWidgetResponse = BaseResponse<HelpWidget>;
export declare type DeleteHelpWidgetResponse = BaseListResponse<HelpWidget>;
//# sourceMappingURL=HelpWidget.d.ts.map