import React , { useState } from 'react';
import AltitudeCharLine from "../Utilities/Trash/graph/AltitudeChartLine";
import {createControlledLayer} from "react-leaflet/LayersControl";
import graphAlgorithm from "../Service/GraphAlgorithm"

let relationsFinder = (startNode, sources, globVerse, nodes) => {
    const visitedNodes = new Set();
    const stack = [];
    const exploreRelations = (node) => {
        const polyRelations = nodes[node].properties.relationsLines || [];
        for (const polyRelation of polyRelations) {
            if (polyRelation.relation.verse === globVerse && !visitedNodes.has(polyRelation.relation.nodeId)) {
                stack.push(polyRelation.relation.nodeId)
            }
            ![...visitedNodes].includes(node) && visitedNodes.add(node)
        }

        if (polyRelations.filter((objRel)=> objRel.relation.verse === globVerse).length === 0) {
            sources.push(node)
        }
    };
    exploreRelations(startNode);
    while (stack.length > 0) {
        const currentNode = stack.pop();
        //console.log('Entering recursion with node ' + currentNode);
        exploreRelations(currentNode);
    }
    return globVerse === 1 ? {visitedNodes: visitedNodes, outlet: sources} :
        {visitedNodes: visitedNodes, sources: sources}
}


let extractMxsIncident = (totalGraph, nodes) =>{
    let myMatrixIncidentPositive = []
    let myMatrixNegativeNegative = []
    nodes.forEach(node => {
        myMatrixIncidentPositive[node.properties.fid]=!myMatrixIncidentPositive[node.properties.fid] === undefined ? '' : {value:0, relations: []}
        myMatrixNegativeNegative[node.properties.fid]=!myMatrixNegativeNegative[node.properties.fid] === undefined ? '' : []

        node.properties.relationsLines.forEach(rela => {
            if (rela.relation.verse === 1) {
                myMatrixIncidentPositive[node.properties.fid].relations.push({id : rela.relation.nodeId});

                if(totalGraph.sources.includes(node.properties.fid))
                {
                    myMatrixIncidentPositive[node.properties.fid].value = 1
                }
                else {
                    myMatrixIncidentPositive[node.properties.fid].value = 0
                }

            }
            else{
                myMatrixNegativeNegative[node.properties.fid].push(rela.relation.nodeId)
            }
        });
    });

    return {incPosMatx: myMatrixIncidentPositive, incNegMatx: myMatrixNegativeNegative}


}


const NavigatorGraph = (data) => {

    // console.log('questo e nel navigator') console.log(data)

    let geomSelectedType = data.geomSelected.type
    let idSelected = data.geomSelected.id


    let upperGraph= relationsFinder(idSelected,[], -1, data.nodes)
    let lowerGraph= relationsFinder(idSelected, [], 1, data.nodes)
    let totalGraph = relationsFinder(lowerGraph.outlet[0], [], -1, data.nodes) //-->attention it's wrong when the outlet isn't one !!!!
    totalGraph.outlet = lowerGraph.outlet[0] //-->single outlet
    let incidentStructure=extractMxsIncident(totalGraph, data.nodes)

    let orderOfSum=graphAlgorithm(data.nodes, incidentStructure, upperGraph, idSelected)


    console.log('ordine di somma del grafo superiore rispetto al punto selezionato, in sostanza è l ordine con cui si sommano i valori dalle fonti scendeno a valle fino al punto selezioanto')
    console.log(orderOfSum)
    console.log('upper graph')
    console.log(upperGraph)
    // console.log('data selezioneata') console.log(dataSelected)




    return (
        <>
            <div>
                {/*<h3>Hai selezionato {data.geomSelected.fid} {geomSelectedType} {idSelected}</h3>*/}
            </div>
        </>
     )
}



export default NavigatorGraph;