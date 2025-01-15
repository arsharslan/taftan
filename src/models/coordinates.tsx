interface GeocodeResponse {
    results?: Result[];
    status?: string;
}

interface Result {
    address_components?: AddressComponent[];
    formatted_address?: string;
    geometry?: Geometry;
    place_id?: string;
    types?: string[];
}

interface AddressComponent {
    long_name?: string;
    short_name?: string;
    types?: string[];
}

interface Geometry {
    bounds?: Bounds;
    location?: Location;
    location_type?: string;
    viewport?: Bounds;
}

interface Bounds {
    northeast?: Coordinates;
    southwest?: Coordinates;
}

interface Coordinates {
    lat?: number;
    lng?: number;
}

interface Location {
    lat?: number;
    lng?: number;
}
