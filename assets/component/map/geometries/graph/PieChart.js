import React, { useState } from 'react';

const PieChart = () => {
    const [percentage, setPercentage] = useState(50)

    const updatePieChart = (newPercentage) => {
        setPercentage(newPercentage)
    };

    const degrees = (percentage / 100) * 360
    const clipPathValue = `conic-gradient(white 0% ${180 - degrees / 2}%, #3498db ${180 - degrees / 2}% 100%)`

    return (
        <div>
             adsadas
        </div>
    );
};


export default PieChart;



//<div
//                 style={{
//                     position: 'relative',
//                     width: '300px',
//                     height: '300px',
//                     borderRadius: '50%',
//                     backgroundColor: '#f2f2f2',
//                 }}
//             >
//                 <div
//                     style={{
//                         position: 'absolute',
//                         width: '100%',
//                         height: '100%',
//                         clipPath: clipPathValue,
//                     }}
//                 ></div>
//             </div>
//
//             <label htmlFor="percentageInput">Inserisci la percentuale:</label>
//             <input
//                 type="number"
//                 id="percentageInput"
//                 min="0"
//                 max="100"
//                 step="1"
//                 value={percentage}
//                 onChange={(e) => updatePieChart(e.target.value)}
//             />