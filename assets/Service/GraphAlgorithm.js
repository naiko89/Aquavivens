


///Occhio al caso in cui la foce sia piu' di una
function GraphAlgorithm(totNodes,incidentMatrix, graph, idNodeSelect) {

    let pureSources = graph.sources
    let nodesOfMySelGraph = [...graph.visitedNodes].concat(graph.sources)
    let countAnalysis = 0
    let sourcesDone = []
    let tmpId=0
    let howItRead = []

    let idSwitchNode = function changeSourceAnalysis(nodeToChange){

        let newNodeId
        console.log(`%c Cerchiamo un nuovo id, avevamo : ${nodeToChange}`, 'background: #222; color: blue');
         console.log('la lunghezza delle relazioni all indietro è', incidentMatrix.incNegMatx[nodeToChange].length);
         console.log('il grafo rimanente è :', nodesOfMySelGraph);
         console.log('I valori passati sono (fonti pure) :', pureSources);
         console.log('Le fonti fatte sono :', sourcesDone);


         if(incidentMatrix.incNegMatx[nodeToChange].length!==0) {
            newNodeId = nodesOfMySelGraph.find(idNodeLast => {
                console.log(idNodeLast + '---' + sourcesDone.includes(idNodeLast))
                if (pureSources.includes(idNodeLast) && nodeToChange !== idNodeLast) {
                    pureSources.push(pureSources.shift())
                    return true;
                }
            });
        }
        else {
            newNodeId = nodeToChange
        }
        console.log('%c Propongo --> '+ newNodeId,'background: #222; color: orange')
        return pureSources.indexOf(newNodeId)
    }


    console.group('MATRICI PARTENZA');
    console.log('Nodo selezionato ' + idNodeSelect, '\n', pureSources);
    console.groupEnd();

    while (pureSources.length >= 1) {
        const pureNode = pureSources[tmpId];
        countAnalysis++
        let relationsPureMatrixPos =  incidentMatrix.incPosMatx[pureNode]
        let relationsPureMatrixNeg = incidentMatrix.incNegMatx[pureNode]
        let isSupPure= relationsPureMatrixNeg.length === 0 ? true : false

        console.group(`%cANALIZZO IL PURE NODE ${pureNode} CHE HA INDICE SOURCE ---> ${tmpId}`, 'background: #222; color: #bada55');
        console.log('Le fonti stack all inizio del giro sono:', pureSources);
        console.log('Le fonti verificate all inizio del giro sono:', sourcesDone);
        console.groupEnd();

        if(pureNode !== idNodeSelect ) {
            switch (isSupPure) {
                case true: {
                    console.group('%cCASO VERO', 'color: green')
                    relationsPureMatrixPos.relations.map(streetWalker => { // verifico le relazioni in discesa pure
                        !pureSources.includes(streetWalker.id) && pureSources.unshift(streetWalker.id)
                        pureSources = pureSources.filter(node => node !== pureNode)
                        howItRead.push({s:pureNode, e:streetWalker.id})
                        //console.log('Fonti pure modificate',pureSources)
                    })
                    idSwitchNode(pureNode)
                    nodesOfMySelGraph = nodesOfMySelGraph.filter(node => node !== pureNode)
                    sourcesDone.push(pureNode)
                    console.log('Le fonti Stack modificate sono:', pureSources)
                    console.groupEnd()
                    break
                }
                case false: {
                    console.group('%cCASO FALSO', 'color: red')
                    relationsPureMatrixNeg.map(streetClimber => {
                        console.log('Prima della modifica delle negativa',incidentMatrix.incNegMatx[pureNode])
                        incidentMatrix.incNegMatx[pureNode] = incidentMatrix.incNegMatx[pureNode].filter( //rimuovo la relazione e rimarrà da analizzare il resto
                            value => {
                                if (value === streetClimber) {
                                    return !sourcesDone.includes(value);
                                } else {
                                    return true
                                }
                            }) //-->deve rimanerti ciò che non è puro
                        console.log('Source Fatte ' + sourcesDone.includes(streetClimber),sourcesDone)
                        console.log('Eliminerò per il punto ' + pureNode  + ' ne rimangono '+incidentMatrix.incNegMatx[pureNode].length)

                    })
                    console.groupEnd()
                    idSwitchNode(pureNode)
                    break
                }
            }
        }

        else {
            console.log('%cStai Uscendo', 'background: #222; color: red', pureSources)
            if(pureSources.length !==1)
            {
                idSwitchNode(pureNode)}
            else{
                console.log('%cSei Uscendo', 'background: #222; color: red')
                break
            }
        }
    }


    console.log('how it read')
    console.log(howItRead)

    return howItRead
}

export default GraphAlgorithm