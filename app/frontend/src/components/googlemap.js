import React, {useState} from 'react';
import { GoogleMap, LoadScript,Marker,InfoWindow } from '@react-google-maps/api';
import Geocoder from 'react-native-geocoding';


export const MapContainer = ({lat,lng}) => {
    Geocoder.init("AIzaSyAMFkjk7UKH5zfJuVCzYbt5l_H4EP4CmiA")
    console.log(lat)
    console.log(lng)
    const [ selected, setSelected ] = useState({});

    Geocoder.from(lat, lng)
        .then(json => {
            console.log(json)
            var addressComponent = json.results[0].address_components[0];
            console.log(addressComponent);
        })
        .catch(error => console.warn(error));


    const onSelect = item => {
        setSelected(item);
    }

    const mapStyles = {
        height: "40vh",
        width: "80%"
    };

    const defaultCenter = {
        lat: lat, lng:lng
    }
    const locations = [
        {
            name: "Location 1",
            location: {
                lat: lat,
                lng: lng
            },
        },

    ];

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyAMFkjk7UKH5zfJuVCzYbt5l_H4EP4CmiA'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}>
                {locations.map(item => {
                    return (
                        <Marker key={item.name} position={item.location}  onClick={() => onSelect(item)}/>
                    )
                })}
                {
                    selected.location &&
                    (
                        <InfoWindow
                            position={selected.location}
                            clickable={true}
                            onCloseClick={() => setSelected({})}
                        >
                            <p>{selected.name}</p>
                        </InfoWindow>
                    )
                }
            </GoogleMap>


        </LoadScript>
    )
}

export default MapContainer;