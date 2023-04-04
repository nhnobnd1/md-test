import { DeleteTagsRequest } from '../unty';
import { CreateTagRequest, CreateTagResponse, DeleteTagResponse, GetListTagResponse, GetListTicketByTagResponse, GetOneTagResponse, UpdateTagResponse } from './Tag';
export declare const TagRepository: () => {
    delete: (data: DeleteTagsRequest) => import("rxjs").Observable<import("axios").AxiosResponse<DeleteTagResponse, any>>;
    getList: (params: import("./Tag").BaseListTagRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetListTagResponse, any>>;
    getOne: (id: string | undefined) => import("rxjs").Observable<import("axios").AxiosResponse<GetOneTagResponse, any>>;
    create: (data: CreateTagRequest) => import("rxjs").Observable<import("axios").AxiosResponse<CreateTagResponse, any>>;
    update: (id: string, data: import("./Tag").Tag) => import("rxjs").Observable<import("axios").AxiosResponse<UpdateTagResponse, any>>;
    getListTicket: (id: string, params: import("./Tag").BaseListTagRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetListTicketByTagResponse, any>>;
    deleteForce: (id: string) => import("rxjs").Observable<import("axios").AxiosResponse<DeleteTagResponse, any>>;
};
export default TagRepository;
//# sourceMappingURL=TagRepository.d.ts.map