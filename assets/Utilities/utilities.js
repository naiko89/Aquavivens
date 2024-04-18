export const aggregate = (key, baseNodes) => {
    const aggregatedData = {};
    baseNodes.forEach(feature => {
        if (!aggregatedData[feature.properties[key.toString()]]) {
            aggregatedData[feature.properties[key.toString()]] = [feature];
        } else {
            aggregatedData[feature.properties[key.toString()]].push(feature);
        }
    });

    return aggregatedData;

}

export const aggregateForTable = (plants, nElementsRow) => {
    let plantsForTable = []
     for (let i = 0; i < plants.length; i += nElementsRow) {
        const group = plants.slice(i, i + nElementsRow);
        plantsForTable.push(group);
     }
    return plantsForTable
}

export const groupPrelevTab = (dati) => {
  return dati.map((campionatoGroup, id) => {
    let nomeCampionato = Object.keys(campionatoGroup)[0];
    let campionatoSto = campionatoGroup[nomeCampionato];
    const sortedCampionatoKeys = Object.keys(campionatoSto).sort((a, b) => {
      return new Date(a) - new Date(b);
    });
    return {
      prelevato:nomeCampionato,
      dati: sortedCampionatoKeys.map((date) => {
        let properties = campionatoSto[date][0].properties; //-->solo il primo
        return {
          data: new Date(date),
          UM: properties.UM,
          Risultato: properties.Risultato,
          codePunto: properties.codePunto
        };
      })
    }
  })
}


