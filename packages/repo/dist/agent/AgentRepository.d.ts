import { ActiveNewAgentRequest, ActiveNewAgentResponse, CheckTokenNewAgentRequest, CheckTokenNewAgentResponse, CreateAgentRequest, CreateAgentResponse, DeActiveAgentResponse, DeleteAgentResponse, GetListAgentRequest, GetListAgentResponse, GetOneAgentResponse, ReActiveResponse, ResendEmailInvitationRequest, ResendEmailInvitationResponse, UpdateAgentRequest, UpdateAgentResponse } from "./Agent";
export declare const AgentRepository: () => {
    delete: (id: string) => import("rxjs").Observable<import("axios").AxiosResponse<DeleteAgentResponse, any>>;
    getList: (params: GetListAgentRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetListAgentResponse, any>>;
    getOne: (id: string) => import("rxjs").Observable<import("axios").AxiosResponse<GetOneAgentResponse, any>>;
    create: (data: CreateAgentRequest) => import("rxjs").Observable<import("axios").AxiosResponse<CreateAgentResponse, any>>;
    update: (id: string, data: UpdateAgentRequest) => import("rxjs").Observable<import("axios").AxiosResponse<UpdateAgentResponse, any>>;
    activeNewAgent: (data: ActiveNewAgentRequest) => import("rxjs").Observable<import("axios").AxiosResponse<ActiveNewAgentResponse, any>>;
    resendEmailInvitation: (data: ResendEmailInvitationRequest) => import("rxjs").Observable<import("axios").AxiosResponse<ResendEmailInvitationResponse, any>>;
    deActiveAgent: (id: string) => import("rxjs").Observable<import("axios").AxiosResponse<DeActiveAgentResponse, any>>;
    reActiveAgent: (id: string) => import("rxjs").Observable<import("axios").AxiosResponse<ReActiveResponse, any>>;
    checkTokenActiveNewAgent: (payload: CheckTokenNewAgentRequest) => import("rxjs").Observable<import("axios").AxiosResponse<CheckTokenNewAgentResponse, any>>;
};
export default AgentRepository;
//# sourceMappingURL=AgentRepository.d.ts.map