interface BaseToken {
    sub: string;
    preferred_username: string;
    email: string;
    role: string;
    tenantid: string;
    given_name: string;
    family_name: string;
    phone_number: string;
    phone_number_verified: string;
    email_verified: string;
    unique_name: string;
    storeId: string;
    subdomain: string;
    oi_prst: string;
    oi_au_id: string;
    client_id: string;
    oi_tkn_id: string;
    scope: string;
    exp: number;
    iss: string;
    iat: string;
}
export declare function useRole(): string;
export declare function useUser(): BaseToken | null;
export {};
