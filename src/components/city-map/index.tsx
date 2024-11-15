import { useEffect, useMemo, useRef } from 'react';
import { layerGroup, Marker } from 'leaflet';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { ICity, IOffer } from '../../model';
import { useMap } from '../../hooks/map';
import { CITIES_MOCK } from '../../mocks';
import { useAppSelector } from '../../store/hooks';

const DEFAULT_CUSTOM_ICON = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const CURRENT_CUSTOM_ICON = leaflet.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

interface ICityMapProps {
  offers: IOffer[];
  selectedOfferId?: string;
}

export const CityMap = ({ offers, selectedOfferId }: ICityMapProps) => {
  const mapRef = useRef(null);
  const { cityName } = useAppSelector((state) => state.offers);
  const activeCity = useMemo(() => CITIES_MOCK.find((city) => city.name === cityName) as ICity, [ cityName ]);
  const map = useMap(mapRef, activeCity);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const point = offer.location;
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });
        marker
          .setIcon(
            selectedOfferId && selectedOfferId === offer.id
              ? CURRENT_CUSTOM_ICON
              : DEFAULT_CUSTOM_ICON
          )
          .addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOfferId]);

  return (
    <div
      style={{ height: '100%' }}
      ref={mapRef}
    >
    </div>
  );
};