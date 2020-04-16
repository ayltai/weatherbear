export class Location {
    latitude;
    longitude;
    name;

    constructor(latitude, longitude, name = '') {
        this.latitude  = latitude;
        this.longitude = longitude;
        this.name      = name;
    }

    get displayName() {
        return this.name && this.name.length ? this.name : `(${this.latitude}, ${this.longitude})`;
    }
}
