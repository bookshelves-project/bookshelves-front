export interface Link {
    url?: string;
    label?: string;
    active?: boolean;
}

export interface Links {
    first?: string;
    last?: string;
    prev?: null;
    next?: string;
}

export interface ApiMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: Link[];
    path: string;
    per_page: string;
    to: number;
    total: number;
}

export interface ApiResponse {
    data: any;
}

export interface ApiPaginateResponse {
    data?: any[];
    links?: Links;
    meta?: ApiMeta;
}

export interface Pagination {
    pages?: number;
    currentPage?: number;
    perPage?: string;
    total?: number
}

export interface ApiFormated {
    data?: any[];
    pagination?: Pagination;
}

export interface Query {
    perPage?: string
    page?: string
}
