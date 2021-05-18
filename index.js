import 'ol/ol.css';
import {Map, View, Image} from 'ol';
import TileLayer from 'ol/layer/Tile';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageWMS from 'ol/source/ImageWMS';
import TileWMS from 'ol/source/TileWMS';

const belo_horizonte = [-4891950.72, -2263787.71]
const URL_WMS ='http://localhost:8080/geoserver/geobh/wms'

const bairro_oficial = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'geobh:bairro_oficial',
            styles: ''
        }
    }),
    visible: false
})

const logradouroline = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'geobh:logradouroline',
            styles: ''
        }
    }),
    visible: false
})

const area_publica_wifi = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'geobh:area_publica_wifi',
            styles: ''
        }
    }),
    visible: false
})

const escolas_estaduais = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'geobh:escolas_estaduais',
            styles: ''
        }
    }),
    visible: false
})

const ensino_superior = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'geobh:ensino_superior',
            styles: ''
        }
    }),
    visible: false
})

const escolas_municipais_ensino_fundamental = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'geobh:escolas_municipais_ensino_fundamental',
            styles: ''
        }
    }),
    visible: false
})

const escolas_particulares = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'geobh:escolas_particulares',
            styles: ''
        }
    }),
    visible: false
})

const estacao_metro = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'geobh:estacao_metro',
            styles: ''
        }
    }),
    visible: false
})

const estacao_onibus = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'geobh:estacao_onibus',
            styles: ''
        }
    }),
    visible: false
})

new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    bairro_oficial,
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

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

let is_visible_bairro_oficial = false
let is_visible_escolas_estaduais = false
let is_visible_escolas_particulares = false
let is_visible_escolas_municipais_ensino_fundamental = false
let is_visible_ensino_superior = false
let is_visible_logradouroline = false
let is_visible_area_publica_wifi = false
let is_visible_estacao_onibus = false
let is_visible_estacao_metro = false

const bairrosButton = document.getElementById('bairro_oficial');

bairrosButton.onclick = function() {
  is_visible_bairro_oficial = !is_visible_bairro_oficial
  bairro_oficial.setVisible(is_visible_bairro_oficial)
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

