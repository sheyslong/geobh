import 'ol/ol.css';
import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {LineString, Polygon} from 'ol/geom';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {getArea, getLength} from 'ol/sphere';
import {unByKey} from 'ol/Observable';
import TileWMS from 'ol/source/TileWMS';

const belo_horizonte = [-4891950.72, -2263787.71]
const URL_WMS ='http://localhost:8080/geoserver/sig/wms'

function buildLayer(layers) {
    return new TileLayer({
        source: new TileWMS({
            url: URL_WMS,
            params: {
                layers: layers,
                styles: ''
            }
        }),
        visible: false
    });
};

const bairro_popular = buildLayer('sig:bairro_popular');
const logradouroline = buildLayer('sig:logradouroline');
const area_publica_wifi = buildLayer('sig:area_publica_wifi');
const escolas_estaduais = buildLayer('sig:escolas_estaduais');
const ensino_superior = buildLayer('sig:ensino_superior');
const escolas_municipais_ensino_fundamental = buildLayer('sig:escolas_municipais_ensino_fundamental');
const escolas_particulares = buildLayer('sig:escolas_particulares');
const estacao_metro = buildLayer('sig:estacao_metro');
const estacao_onibus = buildLayer('sig:estacao_onibus');

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    bairro_popular,
    escolas_estaduais,
    escolas_particulares,
    escolas_municipais_ensino_fundamental,
    ensino_superior,
    logradouroline,
    area_publica_wifi,
    estacao_onibus,
    estacao_metro,
  ],
  view: new View({
    center: belo_horizonte,
    zoom: 12
  })
});

function activeLayer(camada, ck) {
	var olCamada;
	if(camada == 'bairro_popular') {
		olCamada = bairro_popular;
	}

	olCamada.setVisible(ck);
}

// ------------- Funcionalidade de consulta topológica (BUFFER) ------ //
// ------------- Escolas estaduais próximas a estações de trem
 
const searchBufferButton = document.getElementById('bt-search-buffer');
const searchBufferInput = document.getElementById("input-search-buffer");
let searchBufferLayers;

searchBufferButton.onclick = () => {
    if (searchBufferLayers) {
        map.removeLayer(searchBufferLayers);
    }
    searchBufferLayers = new TileLayer({
        source: new TileWMS({
            url: URL_WMS,
            params: {
                layers: 'sig:EscolaBufferEstacao',
                viewparams: 'distancia:' + searchBufferInput.value,
                styles: ''
            }
        }),
        visible: true
    });
    map.addLayer(searchBufferLayers);
};

const deleteBufferButton = document.getElementById('bt-delete-buffer');
deleteBufferButton.onclick = () => {
    map.removeLayer(searchBufferLayers);
};

// ------------- Funcionalidade de consulta topológica (INTERSECTS) ------ //
// ------------- Adiciona uma camada com os logradouros de um bairro
 
const searchCrossesButton = document.getElementById('bt-search-crosses');
const searchCrossesInput = document.getElementById("input-search-crosses");
let searchCrossesLayers;

searchCrossesButton.onclick = () => {
    if (searchCrossesLayers) {
        map.removeLayer(searchCrossesLayers);
    }
    searchCrossesLayers = new TileLayer({
        source: new TileWMS({
            url: URL_WMS,
            params: {
                layers: 'sig:LogradouroIntersectsBairro',
                viewparams: 'bairro:' + searchCrossesInput.value,
                styles: ''
            }
        }),
        visible: true
    });
    map.addLayer(searchCrossesLayers);
};

const deleteCrossesButton = document.getElementById('bt-delete-crosses');
deleteCrossesButton.onclick = () => {
    map.removeLayer(searchCrossesLayers);
};

// ------------- Funcionalidade de consulta topológica (WITHIN) ------ //
// ------------- Adiciona uma camada com as áreas de wifi dentro de um bairro
 
const searchWithinButton = document.getElementById('bt-search-within');
const searchWithinInput = document.getElementById("input-search-within");
let searchWithinLayers;

searchWithinButton.onclick = () => {
    if (searchWithinLayers) {
        map.removeLayer(searchWithinLayers);
    }
    searchWithinLayers = new TileLayer({
        source: new TileWMS({
            url: URL_WMS,
            params: {
                layers: 'sig:EscolaWithInBairro',
                viewparams: 'bairro:' + searchWithinInput.value,
                styles: ''
            }
        }),
        visible: true
    });
    map.addLayer(searchWithinLayers);
};

const deleteWithinButton = document.getElementById('bt-delete-within');
deleteWithinButton.onclick = () => {
    map.removeLayer(searchWithinLayers);
};

// ------------- Funcionalidade de consulta topológica (TOUCHES) ------ //
// ------------- Adiciona uma camada com os bairros populares vizinhos
 
const searchTouchesButton = document.getElementById('bt-search-touches');
const searchTouchesInput = document.getElementById("input-search-touches");
let searchTouchesLayers;

searchTouchesButton.onclick = () => {
    if (searchTouchesLayers) {
        map.removeLayer(searchTouchesLayers);
    }
    searchTouchesLayers = new TileLayer({
        source: new TileWMS({
            url: URL_WMS,
            params: {
                layers: 'sig:BairrosVizinhos',
                viewparams: 'bairro:' + searchTouchesInput.value,
                styles: ''
            }
        }),
        visible: true
    });
    map.addLayer(searchTouchesLayers);
};

const deleteTouchesButton = document.getElementById('bt-delete-touches');
deleteTouchesButton.onclick = () => {
    map.removeLayer(searchTouchesLayers);
};

// ------------- Controle dos layers ------------------------- //

let is_visible_bairro_popular = false
let is_visible_escolas_estaduais = false
let is_visible_escolas_particulares = false
let is_visible_escolas_municipais_ensino_fundamental = false
let is_visible_ensino_superior = false
let is_visible_logradouroline = false
let is_visible_area_publica_wifi = false
let is_visible_estacao_onibus = false
let is_visible_estacao_metro = false

const bairrosButton = document.getElementById('bairro_popular');

bairrosButton.onclick = function() {
  is_visible_bairro_popular = !is_visible_bairro_popular
  bairro_popular.setVisible(is_visible_bairro_popular)
}

const escolasEstaduaisButton = document.getElementById('escolas_estaduais');

escolasEstaduaisButton.onclick = function() {
  is_visible_escolas_estaduais = !is_visible_escolas_estaduais
  escolas_estaduais.setVisible(is_visible_escolas_estaduais)
}

const escolasParticularesButton = document.getElementById('escolas_particulares');

escolasParticularesButton.onclick = function() {
  is_visible_escolas_particulares = !is_visible_escolas_particulares
  escolas_particulares.setVisible(is_visible_escolas_particulares)
}

const escolasMFButton = document.getElementById('escolas_municipais_ensino_fundamental');

escolasMFButton.onclick = function() {
  is_visible_escolas_municipais_ensino_fundamental = !is_visible_escolas_municipais_ensino_fundamental
  escolas_municipais_ensino_fundamental.setVisible(is_visible_escolas_municipais_ensino_fundamental)
}

const escolasSuperiorButton = document.getElementById('ensino_superior');

escolasSuperiorButton.onclick = function() {
  is_visible_ensino_superior = !is_visible_ensino_superior
  ensino_superior.setVisible(is_visible_ensino_superior)
}

const logradouroButton = document.getElementById('logradouroline');

logradouroButton.onclick = function() {
  is_visible_logradouroline = !is_visible_logradouroline
  logradouroline.setVisible(is_visible_logradouroline)
}

const publicaWifiButton = document.getElementById('area_publica_wifi');

publicaWifiButton.onclick = function() {
  is_visible_area_publica_wifi = !is_visible_area_publica_wifi
  area_publica_wifi.setVisible(is_visible_area_publica_wifi)
}

const estacaoOnibusButton = document.getElementById('estacao_onibus');

estacaoOnibusButton.onclick = function() {
  is_visible_estacao_onibus = !is_visible_estacao_onibus
  estacao_onibus.setVisible(is_visible_estacao_onibus)
}

const estacaoMetroButton = document.getElementById('estacao_metro');

estacaoMetroButton.onclick = function() {
  is_visible_estacao_metro = !is_visible_estacao_metro
  estacao_metro.setVisible(is_visible_estacao_metro)
}


// ------------- Funcionalidade de métrica entre pontos ------ //

let sourceMeasureVector = new VectorSource();
let measureVector = new VectorLayer({
  source: sourceMeasureVector,
  style: new Style({
    fill: new Fill({
      color: '#1A1A6E',
    }),
    stroke: new Stroke({
      color: '#1A1A6E',
      width: 3,
    }),
  }),
});

map.addLayer(measureVector);

let sketch;
let helpTooltipElement;
let helpTooltip;
let measureTooltipElement;
let measureTooltip;
let continueLineMsg = 'Clique para continuar a desenhar a linha';

let pointerMoveHandler = function (evt) {
  if (evt.dragging) {
    return;
  }
  let helpMsg = 'Clique para iniciar o desenho da linha';

  if (sketch) {
    let geom = sketch.getGeometry();
    if (geom instanceof LineString) {
      helpMsg = continueLineMsg;
    }
  }

  helpTooltipElement.innerHTML = helpMsg;
  helpTooltip.setPosition(evt.coordinate);

  helpTooltipElement.classList.remove('hidden');
};

let formatLength = function (line) {
  let length = getLength(line);
  let output;
  if (length > 100) {
    output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
  } else {
    output = Math.round(length * 100) / 100 + ' ' + 'm';
  }
  return output;
};

let draw;

function addInteraction() {
  map.on('pointermove', pointerMoveHandler);
  map.getViewport().addEventListener('mouseout', function () {
    helpTooltipElement.classList.add('hidden');
  });

  let type = 'LineString';
  draw = new Draw({
    source: sourceMeasureVector,
    type: type,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new Stroke({
        color: '#1A1A6E',
        lineDash: [10, 10],
        width: 3,
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
      }),
    }),
  });
  map.addInteraction(draw);

  createMeasureTooltip();
  createHelpTooltip();

  let listener;
  draw.on('drawstart', function (evt) {
    createMeasureTooltip();
    createHelpTooltip();
    // set sketch
    sketch = evt.feature;

    let tooltipCoord = evt.coordinate;

    listener = sketch.getGeometry().on('change', function (evt) {
      let geom = evt.target;
      let output;
      if (geom instanceof LineString) {
        output = formatLength(geom);
        tooltipCoord = geom.getLastCoordinate();
      }
      measureTooltipElement.innerHTML = output;
      measureTooltip.setPosition(tooltipCoord);
    });
  });

  draw.on('drawend', function () {
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
    measureTooltip.setOffset([0, -7]);
    // unset sketch
    sketch = null;
    // unset tooltip so that a new one can be created
    measureTooltipElement = null;
    //createMeasureTooltip();
    unByKey(listener);
  });
}

/**
 * Creates a new help tooltip
 */
function createHelpTooltip() {
  if (helpTooltipElement) {
    helpTooltipElement.parentNode.removeChild(helpTooltipElement);
  }
  helpTooltipElement = document.createElement('div');
  helpTooltipElement.className = 'ol-tooltip hidden';
  helpTooltip = new Overlay({
    element: helpTooltipElement,
    offset: [15, 0],
    positioning: 'center-left',
  });
  map.addOverlay(helpTooltip);
}

/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip() {
  if (measureTooltipElement) {
    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
  measureTooltip = new Overlay({
    element: measureTooltipElement,
    offset: [0, -15],
    positioning: 'bottom-center',
  });
  map.addOverlay(measureTooltip);
}

const resetButton = document.getElementById('reset-button');
resetButton.onclick = () => {
    map.getOverlays().clear();
    sourceMeasureVector.clear();
};

let measureActivated = false;
const activeMeasureButton = document.getElementById('active-measure-button');
activeMeasureButton.onclick = () => {
    if (measureActivated) {        
        map.removeInteraction(draw);
        map.getOverlays().clear();
        sourceMeasureVector.clear();
    } else {
        addInteraction();
    }
    measureActivated = !measureActivated;
};