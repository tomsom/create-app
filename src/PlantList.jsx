import { useState } from 'react';

// import RangeSlider from './RangeSlider.jsx';

import Plant from './CoalPlant.jsx';
import data from '../src/data/v0.0small.json';


export default function PlantList({countries}) {
  const all_countries = [...new Set(data.map((json => {return json.country})))].sort();

    const [c, setC] = useState([...new Set(data.map((json => {return json.country})))].sort());
    const [sortedData, setSortedData] = useState(data);
    // const [filterdData, setFilteredData] = useState(data);
    const [sortDirection, setSortDirection] = useState("ascending");
    const [minCO2, setMinCO2] = useState('0');
    const [maxCO2, setMaxCO2] = useState('1000000000');


    //maybe create two data sets, one ascendign one descending to improve performance instead
    function sortData() {
      if(sortDirection === "ascending") {
        setSortDirection("descending")
        setSortedData(
          data.sort(function(a, b){
            return a.CO2_amount - b.CO2_amount;
        }))
        
      } else {
        setSortDirection("ascending")
        setSortedData(
          data.sort(function(a, b){
            return b.CO2_amount - a.CO2_amount;
        }))
      }
    }


  return (
    <div>
      <h3>Thank you for visiting!</h3>

      <label for="countries">Filter by country: </label>
      <select
        name="countries"
        id="countries"
        defaultValue="world"
        value={c}
        onChange={e => {
        setC(e.target.value);
      }}
      >
        <option value="world">World</option>
        {all_countries.map((country) => {
          return <option value={country}>{country}</option>
        })}
      </select>
      <hr />
      <button
        onClick={sortData}
      >change order: {sortDirection}</button>
      <hr />
      <p>Show plants with an CO2 ammount between: </p>
      <textarea
        value={minCO2} // ...force the input's value to match the state variable...
        onChange={e => {
          setMinCO2(e.target.value);
          // filterMinMaxData();

        }
        } // ... and update the state variable on any edits!
      />
      <textarea
        value={maxCO2} // ...force the input's value to match the state variable...
        onChange={e => {
          setMaxCO2(e.target.value);
          // filterMinMaxData();
        }} // ... and update the state variable on any edits!
      />

      <hr />

      {
        sortedData.map((cp) => {
          if (Number(cp.CO2_amount) >= Number(minCO2) && Number(cp.CO2_amount) <= Number(maxCO2)) {
            
            if (c === "world") {
              return <Plant
              name={cp.plant}
              country={cp.country}
              co2={Number(cp.CO2_amount)}
              ></Plant>
            }
            else if (cp.country === c ) {
              return <Plant
              name={cp.plant}
              country={cp.country}
              co2={Number(cp.CO2_amount)}
              ></Plant>
            } else return null;
          } else return null;
        })
      }
      
    </div>
  );
}