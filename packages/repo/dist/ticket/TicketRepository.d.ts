import { CreateTicketRequest, CreateTicketResponse, GetListTicketResponse, GetOneTicketResponse, UpdateTicketResponse } from './Ticket';
export declare const TicketRepository: () => {
    getList: (params: import("./Ticket").BaseListTicketRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetListTicketResponse, any>>;
    getOne: (id: string | undefined) => import("rxjs").Observable<import("axios").AxiosResponse<GetOneTicketResponse, any>>;
    create: (data: CreateTicketRequest) => import("rxjs").Observable<import("axios").AxiosResponse<CreateTicketResponse, any>>;
    update: (id: string, data: import("./Ticket").Ticket) => import("rxjs").Observable<import("axios").AxiosResponse<UpdateTicketResponse, any>>;
};
export default TicketRepository;
//# sourceMappingURL=TicketRepository.d.ts.map