export interface SinglefieldValidResult {
    valid?: boolean;
    name?: string;
    message?: string;
}

export interface MultifieldValidResult {
    validAll: boolean;
    singles: SinglefieldValidResult[];
}