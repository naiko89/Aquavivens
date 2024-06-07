import {aggregate} from "../Utilities/utilities";

class DataBaseSupport {

  constructor(prelieviStorico){
    this.prelieviStorico = prelieviStorico;
  }

  getStoricoPrelievo(codePrelievo){
    let storicoPrelievo = this.prelieviStorico.features.filter(prelievo => {
      return prelievo.properties.CodicePunto === codePrelievo;
    });
    return aggregate('Parametro', storicoPrelievo);
  }

}

export default DataBaseSupport