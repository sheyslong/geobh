# GEOBH

## Camadas

* Bairros

* Logradouro

* Wifi

* Escolas (Publicas, Privadas, Municipais)

* Ensino Superior

* Estacao de Onibus

* Estacao de Metrô

* OSM (Open Street Maps)
<br>


## Estrutura e Ferramentas

As ferramentas utilizadas foram:
    Openlayers
    Geoserver 
    PostGres
    PostGis
    JavaScrip
    Html
    CSS

### Funcionalidades

* Overlay de camadas

* Zooming e panning

<br>

### Consultas

* 1 Usando buffer

* 3 consultas com operadores topológicos

* 1 consulta métrica

<br>

## Baixa o geoserver
[Geoserver](http://sourceforge.net/projects/geoserver/files/GeoServer/2.19.0/geoserver-2.19.0-bin.zip)

## Baixar os arquivos ShapeFiles

Os arquivos se encontram no [Drive](https://drive.google.com/drive/folders/1KTswJFmxpA94060Z28RqW1OAtsAjdqhI?usp=sharing)

## Queries


### Logradouros em bairros

```sql
SELECT logl.geom FROM logradouroline logl, bairro_popular bair WHERE st_intersects(logl.geom, bair.geom) AND bair.nome LIKE '%bairro%'
```

### Escolas em bairro

```sql
SELECT escola.* FROM ( SELECT geom FROM bairro_popular WHERE nome LIKE '%bairro%' ) as bairro, escolas_particulares as escola WHERE ST_Within(ST_SetSRID(escola.geom, 22523), ST_SetSRID(bairro.geom, 22523))
```

### Escolas proximas a estação metro

```sql
SELECT em.geom FROM estacao_metro es, escolas_estaduais em WHERE ST_DWITHIN(ST_SETSRID(es.geom, 31983), ST_SETSRID(em.geom, 31983), %distancia%)
```

### Bairros Vizinhos
```sql
SELECT b2.geom FROM bairro_popular as b1, bairro_popular as b2 WHERE b1.nome like '%bairro%' AND ST_TOUCHES(st_setsrid(b1.geom, 31983), st_setsrid(b2.geom, 31983))
```

## Executar o projeto


Primeiramente, instalar as dependências.

```bash
    npm install
```

Para executar o projeto local
```bash
    npm start
```

## Equipe

[<img src="https://avatars0.githubusercontent.com/u/20846737?s=460&u=74713b81f37fc0c5a42ae203459a9824505cba20&v=4" width=115 > <br> <sub> Sheilla da Silva </sub>](https://github.com/sheyslong) | [<img src="https://avatars2.githubusercontent.com/u/27634603?s=460&u=15ac27abbac7e3d986429d3df4af5826b9ed69b6&v=4" width=115 > <br> <sub> Anderson Vidal </sub>](https://github.com/AndersonVidal) | [<img src="https://avatars.githubusercontent.com/u/15389384?v=4" width=115 > <br> <sub> Marcus Vinicius </sub>](https://github.com/vinifarias) | [<img src="https://avatars.githubusercontent.com/u/20840806?v=4" width=115 > <br> <sub> Samara Sampaio </sub>](https://github.com/samarasss) | [<img src="https://avatars1.githubusercontent.com/u/39067792?s=460&u=cbea390ae6b8d589a4fab1b4d27ab3228ef074f6&v=4" width=115 > <br> <sub> Kelvin C. L. </sub>](https://github.com/KelvinCL) |
| :---: | :---: | :---: | :---: | :---: |  
