export const ISTANBUL_CENTER = { lat: 41.0082, lng: 28.9784 };

const toFiniteNumber = (value) => {
    const parsed = typeof value === 'string' ? parseFloat(value) : value;
    return Number.isFinite(parsed) ? parsed : null;
};

export const normalizeLocation = (value) => {
    if (!value) return null;

    if (Array.isArray(value) && value.length >= 2) {
        const lat = toFiniteNumber(value[0]);
        const lng = toFiniteNumber(value[1]);
        if (lat === null || lng === null) return null;
        return { lat, lng };
    }

    if (typeof value === 'object') {
        const lat = toFiniteNumber(value.lat ?? value.latitude);
        const lng = toFiniteNumber(value.lng ?? value.lon ?? value.longitude);
        if (lat === null || lng === null) return null;
        return { lat, lng };
    }

    return null;
};

export const hasValidLocation = (value) => normalizeLocation(value) !== null;

export const pickFirstValidLocation = (...values) => {
    for (const value of values) {
        const normalized = normalizeLocation(value);
        if (normalized) return normalized;
    }
    return null;
};

export const getDirectionsTarget = ({ location, address, fallbackAddress = '' }) => {
    const normalized = normalizeLocation(location);
    if (normalized) {
        return `${normalized.lat},${normalized.lng}`;
    }

    const cleanedAddress = (address || fallbackAddress || '').trim();
    return cleanedAddress || null;
};
