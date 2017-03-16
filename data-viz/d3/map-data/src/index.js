import Datamap from 'datamaps';
import '../public/index.scss';
import data from './meteorite-strike-data.json';
const globe = new Datamap({
  element: document.getElementById('container'),
  projection: 'mercator',
  geographyConfig: {
    popupOnHover: false,
    highlightOnHover: false
  },
  fills: {
    defaultFill: '#33691E',
    red: '#F44336',
    blue: '#2196F3',
    yellow: '#FFEB3B',
    purple: '#9C27B0',
  }
});
const newData = [];
for (let i = 0; i < data.features.length; i++) {
  if (data.features[i].geometry) {
    const meteoriteData = {};
    meteoriteData.latitude = data.features[i].geometry.coordinates[1];
    meteoriteData.longitude = data.features[i].geometry.coordinates[0];
    meteoriteData.radius = Math.max(1.5, Math.min(90, data.features[i].properties.mass / 50000));
    meteoriteData.data = data.features[i].properties;
    meteoriteData.borderWidth = 0;
    meteoriteData.fillKey = ['red', 'blue', 'yellow', 'purple'][Math.floor(Math.random() * 4)];
    newData.push(meteoriteData);
  }
}
globe.bubbles(newData, {
  popupTemplate: function(geo, data) {
    return `
      <div class="hoverinfo">
        Name: ${data.data.name}<br/>
        Mass: ${data.data.mass}<br/>
        Year: ${data.data.year}
      </div>`;
  }
});
