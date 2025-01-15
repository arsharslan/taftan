export interface AddressResponse {
    plus_code?: PlusCode;
    results?:   Result[];
    status?:    string;
}

export interface PlusCode {
    compound_code?: string;
    global_code?:   string;
}

export interface Result {
    address_components?: AddressComponent[];
    formatted_address?:  string;
    geometry?:           Geometry;
    navigation_points?:  NavigationPoint[];
    place_id?:           string;
    plus_code?:          PlusCode;
    types?:              string[];
}

export interface AddressComponent {
    long_name?:  string;
    short_name?: string;
    types?:      string[];
}

export interface Geometry {
    location?:      NortheastClass;
    location_type?: string;
    viewport?:      Bounds;
    bounds?:        Bounds;
}

export interface Bounds {
    northeast?: NortheastClass;
    southwest?: NortheastClass;
}

export interface NortheastClass {
    lat?: number;
    lng?: number;
}

export interface NavigationPoint {
    location?: NavigationPointLocation;
}

export interface NavigationPointLocation {
    latitude?:  number;
    longitude?: number;
}
