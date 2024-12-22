export interface DistanceMatrixResponse {
    destination_addresses: string[];
    origin_addresses: string[];
    rows: Row[];
    status: string;
}

interface Row {
    elements: Element[]
}

interface Element {
    distance: Value;
    duration: Value;
    status: string
}

interface Value {
    text: string
    value: number
}