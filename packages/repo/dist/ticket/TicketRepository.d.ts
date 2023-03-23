import { BaseDeleteList } from '../unty';
import { CreateReplyTicketResponse, CreateTicketRequest, CreateTicketResponse, DeleteTicketResponse, GetListTicketConversationResponse, GetListTicketResponse, GetOneTicketResponse, UpdateTicket, UpdateTicketResponse } from './Ticket';
export declare const TicketRepository: () => {
    delete: (data: BaseDeleteList) => import("rxjs").Observable<import("axios").AxiosResponse<DeleteTicketResponse, any>>;
    getList: (params: import("./Ticket").BaseListTicketRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetListTicketResponse, any>>;
    getOne: (id: string | undefined) => import("rxjs").Observable<import("axios").AxiosResponse<GetOneTicketResponse, any>>;
    create: (data: CreateTicketRequest) => import("rxjs").Observable<import("axios").AxiosResponse<CreateTicketResponse, any>>;
    update: (id: string, data: UpdateTicket) => import("rxjs").Observable<import("axios").AxiosResponse<UpdateTicketResponse, any>>;
    getListTrash: (params: import("./Ticket").BaseListTicketRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetListTicketResponse, any>>;
    getConversations: (id: string | undefined) => import("rxjs").Observable<import("axios").AxiosResponse<GetListTicketConversationResponse, any>>;
    postReply: (data: import("./Ticket").ReplyTicket) => import("rxjs").Observable<import("axios").AxiosResponse<CreateReplyTicketResponse, any>>;
    deletePermanently: (data: BaseDeleteList) => import("rxjs").Observable<import("axios").AxiosResponse<DeleteTicketResponse, any>>;
};
export default TicketRepository;
//# sourceMappingURL=TicketRepository.d.ts.map