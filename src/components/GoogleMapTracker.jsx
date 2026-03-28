import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, MapPinned } from 'lucide-react';
import {
    ISTANBUL_CENTER,
    normalizeLocation,
    pickFirstValidLocation
} from '../utils/location';

let leafletPromise = null;
const geocodeCache = new Map();

const LEAFLET_SCRIPT_SRC = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
const LEAFLET_CSS_HREF = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const GEOCODE_TIMEOUT_MS = 4000;
const ROUTE_TIMEOUT_MS = 6000;

const fetchWithTimeout = async (url, timeoutMs) => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
        return await fetch(url, { signal: controller.signal });
    } finally {
        window.clearTimeout(timeoutId);
    }
};

const loadLeaflet = () => {
    if (typeof window === 'undefined') {
        return Promise.reject(new Error("Tarayıcı ortamı bulunamadı."));
    }

    if (window.L?.map) {
        return Promise.resolve(window.L);
    }

    if (leafletPromise) {
        return leafletPromise;
    }

    leafletPromise = new Promise((resolve, reject) => {
        const existingCss = document.querySelector('link[data-leaflet-loader="true"]');
        if (!existingCss) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = LEAFLET_CSS_HREF;
            link.dataset.leafletLoader = 'true';
            document.head.appendChild(link);
        }

        const handleReady = () => {
            if (window.L?.map) {
                resolve(window.L);
                return;
            }

            leafletPromise = null;
            reject(new Error("Harita kütüphanesi yüklenemedi."));
        };

        const handleError = () => {
            leafletPromise = null;
            reject(new Error("Harita dosyaları yüklenemedi."));
        };

        const existingScript = document.querySelector('script[data-leaflet-loader="true"]');
        if (existingScript) {
            existingScript.addEventListener('load', handleReady, { once: true });
            existingScript.addEventListener('error', handleError, { once: true });
            if (window.L?.map) {
                handleReady();
            }
            return;
        }

        const script = document.createElement('script');
        script.src = LEAFLET_SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.dataset.leafletLoader = 'true';
        script.addEventListener('load', handleReady, { once: true });
        script.addEventListener('error', handleError, { once: true });
        document.body.appendChild(script);
    });

    return leafletPromise;
};

const formatDuration = (seconds) => {
    if (!Number.isFinite(seconds) || seconds <= 0) {
        return null;
    }

    const totalMinutes = Math.max(1, Math.round(seconds / 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) {
        return `${totalMinutes} dk`;
    }

    if (minutes === 0) {
        return `${hours} sa`;
    }

    return `${hours} sa ${minutes} dk`;
};

const geocodeAddress = async (address) => {
    const query = (address || '').trim();
    if (!query) {
        return null;
    }

    if (geocodeCache.has(query)) {
        return geocodeCache.get(query);
    }

    try {
        const response = await fetchWithTimeout(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=tr&q=${encodeURIComponent(query)}`
        , GEOCODE_TIMEOUT_MS
        );

        if (!response.ok) {
            throw new Error(`Geocode failed with ${response.status}`);
        }

        const data = await response.json();
        const result = normalizeLocation(data?.[0] ? { lat: data[0].lat, lng: data[0].lon } : null);
        geocodeCache.set(query, result);
        return result;
    } catch (error) {
        console.warn('Address lookup failed:', query, error);
        geocodeCache.set(query, null);
        return null;
    }
};

const createCircleMarker = (L, location, options) =>
    L.circleMarker([location.lat, location.lng], {
        radius: options.radius || 8,
        color: options.color,
        weight: options.weight ?? 2,
        fillColor: options.fillColor || options.color,
        fillOpacity: options.fillOpacity ?? 1
    });

const addLayerSafely = (layer, targetLayer) => {
    if (!layer || !targetLayer) {
        return;
    }

    layer.addTo(targetLayer);
};

const GoogleMapTracker = ({
    courierLocation,
    customerAddress,
    customerLocation,
    businessAddress,
    businessLocation,
    onTimeEstimate,
    heatmapPoints,
    className = ''
}) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersLayerRef = useRef(null);
    const routeLayerRef = useRef(null);
    const heatLayerRef = useRef(null);
    const onTimeEstimateRef = useRef(onTimeEstimate);

    const [routingError, setRoutingError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMapReady, setIsMapReady] = useState(false);

    const normalizedCourierLocation = useMemo(
        () => normalizeLocation(courierLocation),
        [courierLocation?.lat, courierLocation?.lng, courierLocation?.latitude, courierLocation?.longitude, courierLocation?.lon]
    );
    const normalizedCustomerLocation = useMemo(
        () => normalizeLocation(customerLocation),
        [customerLocation?.lat, customerLocation?.lng, customerLocation?.latitude, customerLocation?.longitude, customerLocation?.lon]
    );
    const normalizedBusinessLocation = useMemo(
        () => normalizeLocation(businessLocation),
        [businessLocation?.lat, businessLocation?.lng, businessLocation?.latitude, businessLocation?.longitude, businessLocation?.lon]
    );
    const validHeatmapPoints = useMemo(
        () => (heatmapPoints || []).map(point => normalizeLocation(point)).filter(Boolean),
        [heatmapPoints]
    );

    useEffect(() => {
        onTimeEstimateRef.current = onTimeEstimate;
    }, [onTimeEstimate]);

    useEffect(() => {
        let isMounted = true;

        const initMap = async () => {
            try {
                const L = await loadLeaflet();

                if (!isMounted || !mapRef.current) {
                    return;
                }

                if (!mapInstanceRef.current) {
                    const center = pickFirstValidLocation(
                        normalizedCourierLocation,
                        normalizedCustomerLocation,
                        normalizedBusinessLocation,
                        validHeatmapPoints[0],
                        ISTANBUL_CENTER
                    );

                    mapInstanceRef.current = L.map(mapRef.current, {
                        zoomControl: true,
                        attributionControl: false
                    }).setView([center.lat, center.lng], validHeatmapPoints.length > 0 ? 11 : 13);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19
                    }).addTo(mapInstanceRef.current);

                    const mapPanes = mapInstanceRef.current.getPanes();
                    if (mapPanes?.mapPane) mapPanes.mapPane.style.zIndex = '0';
                    if (mapPanes?.tilePane) mapPanes.tilePane.style.zIndex = '0';
                    if (mapPanes?.overlayPane) mapPanes.overlayPane.style.zIndex = '10';
                    if (mapPanes?.shadowPane) mapPanes.shadowPane.style.zIndex = '20';
                    if (mapPanes?.markerPane) mapPanes.markerPane.style.zIndex = '30';
                    if (mapPanes?.tooltipPane) mapPanes.tooltipPane.style.zIndex = '40';
                    if (mapPanes?.popupPane) mapPanes.popupPane.style.zIndex = '50';
                    const controlContainer = mapInstanceRef.current.getContainer()?.querySelector('.leaflet-control-container');
                    if (controlContainer) {
                        controlContainer.style.zIndex = '60';
                    }

                    markersLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);
                    routeLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);
                    heatLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);
                }

                setRoutingError(null);
                setIsMapReady(true);

                setTimeout(() => {
                    mapInstanceRef.current?.invalidateSize();
                }, 120);
            } catch (error) {
                console.error('Map initialization failed:', error);
                if (isMounted) {
                    setRoutingError(error.message || 'Harita yüklenemedi.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        initMap();

        return () => {
            isMounted = false;
            heatLayerRef.current = null;
            routeLayerRef.current = null;
            markersLayerRef.current = null;
            mapInstanceRef.current?.remove();
            mapInstanceRef.current = null;
        };
    }, []);

    useEffect(() => {
        const map = mapInstanceRef.current;
        const L = window.L;

        if (!isMapReady || !map || !L) {
            return;
        }

        const clearLayers = () => {
            markersLayerRef.current?.clearLayers();
            routeLayerRef.current?.clearLayers();
            heatLayerRef.current?.clearLayers();
        };

        const fitToLocations = (locations) => {
            const validLocations = locations.filter(Boolean);
            if (validLocations.length === 0) {
                map.setView([ISTANBUL_CENTER.lat, ISTANBUL_CENTER.lng], 11);
                return;
            }

            if (validLocations.length === 1) {
                map.setView([validLocations[0].lat, validLocations[0].lng], 14);
                return;
            }

            const bounds = L.latLngBounds(validLocations.map(location => [location.lat, location.lng]));
            map.fitBounds(bounds.pad(0.2));
        };

        const renderHeatmap = () => {
            clearLayers();

            if (!heatLayerRef.current) {
                return;
            }

            if (validHeatmapPoints.length === 0) {
                setRoutingError(null);
                fitToLocations([]);
                return;
            }

            validHeatmapPoints.forEach(point => {
                addLayerSafely(L.circle([point.lat, point.lng], {
                    radius: 450,
                    stroke: false,
                    fillColor: '#ef4444',
                    fillOpacity: 0.18
                }), heatLayerRef.current);

                addLayerSafely(L.circle([point.lat, point.lng], {
                    radius: 220,
                    stroke: false,
                    fillColor: '#f97316',
                    fillOpacity: 0.22
                }), heatLayerRef.current);

                addLayerSafely(createCircleMarker(L, point, {
                    radius: 5,
                    color: '#b91c1c',
                    fillColor: '#ef4444',
                    fillOpacity: 0.95,
                    weight: 0
                }), heatLayerRef.current);
            });

            fitToLocations(validHeatmapPoints);
            setRoutingError(null);
        };

        const renderTracking = async () => {
            clearLayers();

            const fallbackBusinessLocation = normalizedBusinessLocation || await geocodeAddress(businessAddress);
            const fallbackCustomerLocation = normalizedCustomerLocation || await geocodeAddress(customerAddress);
            const originLocation = pickFirstValidLocation(normalizedCourierLocation, fallbackBusinessLocation);
            const destinationLocation = fallbackCustomerLocation;

            if (!markersLayerRef.current || !routeLayerRef.current || !mapInstanceRef.current) {
                return;
            }

            if (!destinationLocation) {
                if (originLocation) {
                    addLayerSafely(createCircleMarker(L, originLocation, {
                        color: '#ef4444',
                        fillColor: '#ef4444'
                    }), markersLayerRef.current);
                    fitToLocations([originLocation]);
                    setRoutingError(null);
                    onTimeEstimateRef.current?.(null, null);
                    return;
                }
                setRoutingError('Harita için geçerli konum bilgisi bulunamadı.');
                onTimeEstimateRef.current?.(null, null);
                fitToLocations([]);
                return;
            }

            addLayerSafely(createCircleMarker(L, destinationLocation, {
                color: '#10b981',
                fillColor: '#10b981'
            }), markersLayerRef.current);

            if (originLocation) {
                addLayerSafely(createCircleMarker(L, originLocation, {
                    color: '#ef4444',
                    fillColor: '#ef4444'
                }), markersLayerRef.current);
            }

            if (!originLocation) {
                setRoutingError('Başlangıç konumu bulunamadı.');
                onTimeEstimateRef.current?.(null, null);
                fitToLocations([destinationLocation]);
                return;
            }

            try {
                const response = await fetchWithTimeout(
                    `https://router.project-osrm.org/route/v1/driving/${originLocation.lng},${originLocation.lat};${destinationLocation.lng},${destinationLocation.lat}?overview=full&geometries=geojson`
                , ROUTE_TIMEOUT_MS
                );

                if (!response.ok) {
                    throw new Error(`Route failed with ${response.status}`);
                }

                const data = await response.json();
                const route = data?.routes?.[0];

                if (!route?.geometry?.coordinates?.length) {
                    throw new Error('Route geometry missing');
                }

                const latLngs = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
                addLayerSafely(L.polyline(latLngs, {
                    color: '#2563eb',
                    weight: 5,
                    opacity: 0.85
                }), routeLayerRef.current);

                fitToLocations([originLocation, destinationLocation]);
                setRoutingError(null);
                onTimeEstimateRef.current?.(formatDuration(route.duration), route.duration);
            } catch (error) {
                console.error('Route rendering failed:', error);

                addLayerSafely(L.polyline(
                    [
                        [originLocation.lat, originLocation.lng],
                        [destinationLocation.lat, destinationLocation.lng]
                    ],
                    {
                        color: '#2563eb',
                        weight: 4,
                        opacity: 0.65,
                        dashArray: '8 8'
                    }
                ), routeLayerRef.current);

                setRoutingError('Rota servisi kullanılamadı. Düz hat gösteriliyor.');
                onTimeEstimateRef.current?.(null, null);
                fitToLocations([originLocation, destinationLocation]);
            }
        };

        const run = async () => {
            if (validHeatmapPoints.length > 0) {
                renderHeatmap();
                return;
            }

            await renderTracking();
        };

        run();
    }, [
        businessAddress,
        customerAddress,
        isMapReady,
        normalizedBusinessLocation,
        normalizedCourierLocation,
        normalizedCustomerLocation,
        validHeatmapPoints
    ]);

    return (
        <div className={`relative isolate z-0 w-full h-full min-h-[250px] rounded-2xl shadow-inner border border-slate-100 overflow-hidden bg-slate-50 ${className}`.trim()}>
            <div ref={mapRef} className="absolute inset-0 z-0 w-full h-full" />

            {isLoading && (
                <div className="absolute inset-0 z-10 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center p-4">
                    <div className="bg-white/90 px-4 py-3 rounded-2xl shadow-xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Harita yükleniyor...
                    </div>
                </div>
            )}

            {routingError && !isLoading && (
                <div className="absolute inset-x-4 bottom-4 z-10">
                    <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-rose-100 flex items-center gap-3">
                        <div className="w-9 h-9 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shrink-0">
                            <AlertCircle size={18} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Harita Bilgisi</p>
                            <p className="text-xs font-bold text-slate-800 leading-tight">{routingError}</p>
                        </div>
                    </div>
                </div>
            )}

            {!isLoading &&
                validHeatmapPoints.length === 0 &&
                !routingError &&
                !customerAddress &&
                !normalizedCustomerLocation &&
                !normalizedCourierLocation && (
                    <div className="absolute inset-x-0 bottom-4 z-10 mx-4 p-3 bg-slate-800/80 backdrop-blur-md text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-center shadow-xl border border-white/10 flex items-center justify-center gap-2">
                        <MapPinned size={14} />
                        Görüntülenecek konum bulunamadı
                    </div>
                )}

            {!isLoading && heatmapPoints && validHeatmapPoints.length === 0 && !routingError && (
                <div className="absolute inset-x-0 bottom-4 z-10 mx-4 p-3 bg-slate-800/80 backdrop-blur-md text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-center shadow-xl border border-white/10">
                    Seçili periyotta henüz konum verisi yok
                </div>
            )}
        </div>
    );
};

export default GoogleMapTracker;
