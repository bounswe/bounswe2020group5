import React, {useState} from 'react';
import { GoogleMap, LoadScript,Marker,InfoWindow } from '@react-google-maps/api';

export const MapContainer = ({lat,lng,address}) => {
    console.log(lat)
    console.log(lng)
    console.log(address)
    const [ selected, setSelected ] = useState({});


    const onSelect = item => {
        setSelected(item);
    }

    const mapStyles = {
        height: "40vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: lat, lng:lng
    }
    const locations = [
        {
            name: address,
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