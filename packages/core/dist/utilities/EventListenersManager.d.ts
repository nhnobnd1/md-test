type Listener<E> = (...param: E extends [] ? E : any[]) => void;
declare class EventListenersManager<ListEvents extends {
    [key: string]: any[];
}> {
    private listeners;
    constructor();
    trigger<K extends keyof ListEvents>(event: K, ...params: ListEvents[K]): void;
    on<K extends keyof ListEvents>(event: K, listener: Listener<ListEvents[K]>): () => void;
    off<K extends keyof ListEvents>(event: K, listener: Listener<ListEvents[K]>): void;
}
export default EventListenersManager;
