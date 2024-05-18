import React, { useEffect, useState } from 'react';
import { GeoJSON, LayerGroup } from 'react-leaflet';
import hash from 'object-hash';
import 'leaflet-polylinedecorator';


class HeuristicSupport {
  constructor(graph) {
    this.graph = graph;
    this.nodes = {realtionLines:{}, intersection:[]};
    this.idNodes = [];
  }

  calcNode() {
    let nodesUnique = []
    this.graph.features.forEach((feature, id) => {
      if (feature.geometry.type === 'MultiLineString') {
        const lineFid = feature.properties.fid;
        const startNode = feature.geometry.coordinates[0]; //-->qua hai un problema è un vettore probabilemente hai una dimensione in più
        const endNode = feature.geometry.coordinates[feature.geometry.coordinates.length - 1];
        const startNodeKey = `${startNode[0]},${startNode[1]}`;
        const endNodeKey = `${endNode[0]},${endNode[1]}`;

        //console.log('-------');
        //console.log(startNode)
        //console.log(endNode)

        !this.nodes.intersection.includes(startNode) ? this.nodes.intersection.push(startNode) : null;
        !this.nodes.intersection.includes(endNode) ? this.nodes.intersection.push(endNode) : null;


        if (!this.nodes.realtionLines[startNodeKey]) {
          this.nodes.realtionLines[startNodeKey] = { type: 'Point', coordinates: startNode, lineRelations: [] };
        }
        if (!this.nodes.realtionLines[endNodeKey]) {
          this.nodes.realtionLines[endNodeKey] = { type: 'Point', coordinates: endNode, lineRelations: [] };
        }

        this.nodes.realtionLines[startNodeKey].lineRelations.push({
          nodeId: false,
          lineId: id,
          lineFid: lineFid,
          verse: 1,
          pointEnd: endNode,
          type: 'start'
        });

        this.nodes.realtionLines[endNodeKey].lineRelations.push({
          nodeId: false,
          lineId: id,
          lineFid: lineFid,
          verse: -1,
          pointStart: startNode,
          type: 'end'
        });
      }
    });

    for (const key in this.nodes.realtionLines) {
      if (this.nodes.hasOwnProperty(key)) {
        const node = this.nodes.realtionLines[key];
        const newIdNode = this.idNodes.length;
        this.idNodes[newIdNode] = {
          type: 'Feature',
          properties: {
            name: node.name,
            fid: newIdNode,
            realtionsFidPoly: node.lineRelations
          },
          geometry: {
            type: 'Point',
            coordinates: node.coordinates
          }
        };
        node.lineRelations.forEach(relation => {
          const keyToFind = relation.pointStart ? `${relation.pointStart[0]},${relation.pointStart[1]}` : relation.pointEnd ? `${relation.pointEnd[0]},${relation.pointEnd[1]}` : null;
          let idRel = 0;
          for (const keyRel in this.uniqueNodes) {
            if (keyRel === keyToFind) {
              if (!this.idNodes[newIdNode].properties.relationsLines) {
                this.idNodes[newIdNode].properties.relationsLines = [];
              }
              relation.nodeId = idRel;
              this.idNodes[newIdNode].properties.relationsLines.push({ relation });
              break;
            } else {
              idRel++;
            }
          }
        });
      }
    }

    return this.nodes;
  }
}



export default HeuristicSupport