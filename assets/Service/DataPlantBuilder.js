import {aggregate} from "../Utilities/utilities";

let dataPlantBuilder = (baseNodes, jsonPly) => {
    let tmpId

    let fabricatedPointsIds = (polys, plants, basePlants) => { //--->you MUST be reuse it :D
        let basePlantsKeys = Object.keys(basePlants)
        let idsPoly = Object.keys(polys)
        let nNewPlants = basePlantsKeys.length*5
        // console.group('fabricatedPlantsIds')
        // console.log(plants,basePlants,nNewPlants,polys)
        // console.groupEnd()

        for(let i = 0; i <= nNewPlants; i++) {
            tmpId = Math.round(Math.random() * (idsPoly.length - 1))

            if(basePlantsKeys.includes(i) === false) {

                let polyCoords = polys[tmpId].geometry.coordinates
                let pointId = Math.floor(Math.random() * (polyCoords.length - 2)) + 1;

                let baseStructureNewNodeFeature = {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: polyCoords[pointId]
                    },
                    properties: {
                        status: 'generated',
                        name: 'Punto con ' + i + ' preso dalla linea ' + tmpId,
                        lineId: tmpId,
                        id: i,
                        pointIdLine: pointId,
                        dimens: Math.floor(Math.random() * (3 )) + 1,
                        prop: undefined,
                        bacino: polys[tmpId].properties.bacino_pri

                    }
                }

                plants.push(baseStructureNewNodeFeature)
            }
        }
        //console.log('definizione base', plants)
        return plants
    }


    let groupRealPlants = aggregate('id', baseNodes.features)
    let polyForFabrication = aggregate('tipo', jsonPly.features)['FIUME'].concat(aggregate('tipo', jsonPly.features)['TORRENTE'])
    /*
    console.group('Ritorno Oggetto NewPlants', jsonPly.features)
    console.log(aggregate('tipo', jsonPly.features)['FIUME'])
    console.log(polyForFabrication)
    console.groupEnd()
    */
    return fabricatedPointsIds(polyForFabrication, baseNodes.features, groupRealPlants) //you must to use it one time or restore the base plants
}
///////////////-->new component

export default dataPlantBuilder


