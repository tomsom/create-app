

export default function PlantList({name, country, co2}) {


  return (
    <ul class="coalplant">
        <li>Plant Name: {name}</li>
        <li>Location: {country}</li>
        <li>CO2 Amount: {co2}</li>
    </ul>
    )
}