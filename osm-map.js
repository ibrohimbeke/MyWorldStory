// osm-map.js
export class OSMMap extends HTMLElement {
    constructor() {
        super();
        this.map = null;
        this.markers = [];
    }

    connectedCallback() {
        this.render();
        this.initializeMap();
    }


    static get observedAttributes() {
        return ['lat', 'lng', 'zoom'];
    }

    attributeChangedCallback() {
        this.updateMap();
    }

    render() {
        this.innerHTML = `<div style="width:100%;height:100%"></div>`;
    }

    initializeMap() {
        const container = this.querySelector('div');
        const lat = parseFloat(this.getAttribute('lat')) || 53.550341;
        const lng = parseFloat(this.getAttribute('lng')) || 10.000654;
        const zoom = parseInt(this.getAttribute('zoom')) || 2;

        this.map = L.map(container).setView([lat, lng], zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(this.map);

        this.map.on('click', this.onMapClick.bind(this));
    }

    onMapClick(e) {
        this.clearMarkers();
        this.addMarker(e.latlng.lat, e.latlng.lng, `Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`);
        // Dispatch custom event with lat and lng
        this.dispatchEvent(new CustomEvent('marker-set', { detail: e.latlng }));
    }    

    addMarker(lat, lng, popup) {
        const marker = L.marker([lat, lng]).addTo(this.map);
        if (popup) marker.bindPopup(popup);
        this.markers.push(marker);
    }

    clearMarkers() {
        this.markers.forEach(m => this.map.removeLayer(m));
        this.markers = [];
    }

    updateMap() {
        if (!this.map) return;
        const lat = parseFloat(this.getAttribute('lat')) || 53.550341;
        const lng = parseFloat(this.getAttribute('lng')) || 10.000654;
        const zoom = parseInt(this.getAttribute('zoom')) || 2;
        this.map.setView([lat, lng], zoom);
    }

    flyTo(lat, lng, zoom) {
        this.map.flyTo([lat, lng], zoom || this.map.getZoom());
    }

}
