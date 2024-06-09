import React from 'react';

type Props = {};

const MapPage = (props: Props) => {
  // Example location (Přívrat)
  const y = '49.21812715295444';
  const x = '16.57464698340748';
  const markerTitle = 'Your location';
  return (
    <div className="h-[calc(100%-48px)]">
      <h1 className="px-6 py-4 text-xl">
        Map showing the crime levels in the city
      </h1>
      <small className="px-6 text-xs">
        OpenData from{' '}
        <a
          href="https://services6.arcgis.com/fUWVlHWZNxUvTUh8/ArcGIS/rest/services/PrestupkyCelkovaHustota/FeatureServer"
          className="italic"
          title="See data source"
          target="_blank"
        >
          https://services6.arcgis.com/fUWVlHWZNxUvTUh8/ArcGIS/rest/services/PrestupkyCelkovaHustota/FeatureServer
        </a>
      </small>
      <iframe
        className="w-full h-full mt-2"
        width="500"
        height="400"
        title="Brno - přestupky"
        src={`//www.arcgis.com/apps/Embed/index.html?webmap=e29bf434e70f48ebb4a4998206ee064d&extent=16.5462,49.1874,16.6451,49.2264&zoom=true&previewImage=false&scale=true&disable_scroll=true&theme=light&marker=${x};${y};;;;${markerTitle}`}
      ></iframe>
    </div>
  );
};

export default MapPage;
