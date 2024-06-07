class FabricatePlantsValues {
    constructor(basePlantsDimenAggr, basePlants) {
        this.plantsBaseDevValues = ''
        this.basePlants = basePlants
        this.valuesGeneration = []
        this.dateIntervalObj = {start: '', end: ''}
        this.setIntervalDates = this.setIntervalDates.bind(this);

        let plantsSynthesis = Object.entries(basePlantsDimenAggr).map( ([dimens, objDimPlants]) =>{
            return objDimPlants.map((element) => {
                const properties = element.properties;
                const numProperties = {};
                for (const [key, val] of Object.entries(properties)) {
                    if(['Data','id', 'lat', 'lon','h_(m)','T_(C)','dimens', 'date'].includes(key) !== true){
                        const valNum = parseFloat(val);
                        if (!isNaN(valNum)) {
                            numProperties[key] = valNum;
                        }
                    }
                }
                return numProperties;
            });
        })
        function everageCalcGroup(groupPlants) {
            const nObj = groupPlants.length;
            const everage = {};
            for (const plant of groupPlants) {
                for (const [key, val] of Object.entries(plant)) {
                    if (typeof val === 'number') {
                        if (!everage[key]) {
                            everage[key] = 0;
                        }
                        everage[key] += val;
                    }
                }
            }
            for (const key in everage) {
                everage[key] /= nObj;
            }
            return everage;
        }

        this.plantsBaseDevValues = {1: everageCalcGroup(plantsSynthesis[0]), 2: everageCalcGroup(plantsSynthesis[1]), 3: everageCalcGroup(plantsSynthesis[2])}
        //console.log('--->',plantsSynthesis)


    }


    setIntervalDates(startDate, endDate){ // console.log('inizia ad inventare i dati') console.log(this.plantsBaseDevValues) console.log('seii dentro')console.log(startDate) console.log(endDate)
        this.dateIntervalObj.start = startDate
        this.dateIntervalObj.end = endDate //console.log(this.dateIntervalObj)
        let giveMevalues = (valuesObj, interval, id) =>{
            let tmpValues = Object.entries(valuesObj)
            let ret = {"Alcalin_(mg/l-CaCO3)": 0,
                "Ammoniaca_(mg/l-NH4)": 0,
                "C-Tot_(UCF/100ml)": 0,
                "COD_(mg/l-O2)": 0,
                "Cloruri_(mg/l-Cl)": 0,
                "Cond_(mS/cm)": 0,
                "E.-coli_(UCF/100ml)": 0,
                "FosforoTot_(mg/l-P)": 0,
                "Nitrati_(mg/l-N)": 0,
                "Nitriti_(mg/l-N)": 0,
                "OD_ (%)": 0,
                "OD_(mg/l)": 0,
                "Ortofosfato_(mg/l-PO4)": 0,
                "Solfati_(mg/l-SO4)": 0,
                "T_(C)": 0,
                UV254: 0,
                id: "",
                nSpecimen: 0,
                nTaxa: 0,
                pH: 0,
                status: "generated"
            }

            tmpValues.forEach(([key,val])=>{ //---Fabbricazione dei valori degli impianti generati/su corpi idrici non ledra
                ret[key] = Number(val * (1 + (Math.random() * (interval * 2) - interval) / 100)).toFixed(3)
            })

            return ret
        }

        if (startDate && endDate) {
            const duration = endDate.diff(startDate, 'day');
            // console.log('valori medi') console.log(this.plantsBaseDevValues)
            for (let i = 0; i <= duration; i++) {
                const currentDate = startDate.add(i, 'day');
                let dateKey = currentDate.format('YYYY-MM-DD')
                this.valuesGeneration[dateKey] = []
                this.basePlants.forEach((plant, j) => {
                    this.valuesGeneration[dateKey].push({ ...plant });
                    if (plant.properties.status === 'base' && plant.properties.date === dateKey) {
                        console.log('mantieni il valore base');
                    } else {
                        const newProperties = giveMevalues(this.plantsBaseDevValues[plant.properties.dimens], 10, plant.properties.id);
                        this.valuesGeneration[dateKey][j].properties = { ...newProperties };
                    }
                })
            }
        }
    }

    getDateInterval(type){
        return type === 'start' ? this.dateIntervalObj.start : this.dateIntervalObj.end
    }
    getIntervalDateValues(date){
        return this.valuesGeneration[date]
    }
    getIntervalDateValuesTot(){
        return this.valuesGeneration
    }
}


export default FabricatePlantsValues