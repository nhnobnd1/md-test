import { CreateHelpWidgetRequest, CreateHelpWidgetResponse, DeleteHelpWidgetResponse, GetListHelpWidgetResponse, GetOneHelpWidgetResponse, UpdateHelpWidgetResponse } from './HelpWidget';
export declare const HelpWidgetRepository: () => {
    delete: (id: string) => import("rxjs").Observable<import("axios").AxiosResponse<DeleteHelpWidgetResponse, any>>;
    getList: (params: import("./HelpWidget").BaseListHelpWidgetRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetListHelpWidgetResponse, any>>;
    getOne: (id: string | undefined) => import("rxjs").Observable<import("axios").AxiosResponse<GetOneHelpWidgetResponse, any>>;
    create: (data: CreateHelpWidgetRequest) => import("rxjs").Observable<import("axios").AxiosResponse<CreateHelpWidgetResponse, any>>;
    update: (id: string, data: import("./HelpWidget").HelpWidget) => import("rxjs").Observable<import("axios").AxiosResponse<UpdateHelpWidgetResponse, any>>;
};
export default HelpWidgetRepository;
//# sourceMappingURL=HelpWidgetRepository.d.ts.map