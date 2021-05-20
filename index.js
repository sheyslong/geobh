import 'ol/ol.css';
import {Map, View, Image} from 'ol';
import TileLayer from 'ol/layer/Tile';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ImageWMS from 'ol/source/ImageWMS';
import TileWMS from 'ol/source/TileWMS';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';

const belo_horizonte = [-4891950.72, -2263787.71]
const URL_WMS ='http://localhost:8080/geoserver/sig/wms'

const bairro_popular = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'sig:bairro_popular',
            styles: ''
        }
    }),
    visible: false
})

const logradouroline = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'sig:logradouroline',
            styles: ''
        }
    }),
    visible: false
})

const area_publica_wifi = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'sig:area_publica_wifi',
            styles: ''
        }
    }),
    visible: false
})

const escolas_estaduais = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'sig:escolas_estaduais',
            styles: ''
        }
    }),
    visible: false
})

const ensino_superior = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'sig:ensino_superior',
            styles: ''
        }
    }),
    visible: false
})

const escolas_municipais_ensino_fundamental = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'sig:escolas_municipais_ensino_fundamental',
            styles: ''
        }
    }),
    visible: false
})

const escolas_particulares = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'sig:escolas_particulares',
            styles: ''
        }
    }),
    visible: false
})

const estacao_metro = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'sig:estacao_metro',
            styles: ''
        }
    }),
    visible: false
})

const estacao_onibus = new Tile({
    source: new TileWMS({
        url: URL_WMS,
        params: {
            layers: 'sig:estacao_onibus',
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

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


document.getElementById('bairro_popular').onclick = (event) => {
    const flag = event.target.checked
    bairro_popular.setVisible(flag)
}

document.getElementById('escolas_estaduais').onclick = (event) => {
    const flag = event.target.checked
    escolas_estaduais.setVisible(flag)
}

document.getElementById('escolas_particulares').onclick = (event) => {
    const flag = event.target.checked
    escolas_particulares.setVisible(flag)
}

document.getElementById('escolas_municipais_ensino_fundamental').onclick = (event) => {
    const flag = event.target.checked
    escolas_municipais_ensino_fundamental.setVisible(flag)
}

document.getElementById('ensino_superior').onclick = (event) => {
    const flag = event.target.checked
    ensino_superior.setVisible(flag)
}

document.getElementById('logradouroline').onclick = (event) => {
    const flag = event.target.checked
    logradouroline.setVisible(flag)
}

document.getElementById('area_publica_wifi').onclick = (event) => {
    const flag = event.target.checked
    area_publica_wifi.setVisible(flag)
}

document.getElementById('estacao_onibus').onclick = (event) => {
    const flag = event.target.checked
    estacao_onibus.setVisible(flag)
}

document.getElementById('estacao_metro').onclick = (event) => {
    const flag = event.target.checked
    estacao_metro.setVisible(flag)
}