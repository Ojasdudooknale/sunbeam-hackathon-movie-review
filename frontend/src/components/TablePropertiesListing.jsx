import React from 'react'
import { config } from '../services/config'
import { useNavigate } from 'react-router-dom'

function TablePropertiesListing({ properties, onDeleteProperty }) {
    // get the navigation function reference
    const navigate = useNavigate()

    // const onDetails = (id) => {
    //     // go to the property details with the property id
    //     navigate('/home/property-details', { state: { id } })
    // }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Thumbnail</th>
                    <th>Title</th>
                    <th>Details</th>
                    <th>Rent</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {properties.map((property) => {
                    return (
                        <tr key={property['id']}>
                            <td>{property['id']}</td>
                            <td>
                                <img
                                    className='thumbnail'
                                    src={`${config.server}/${property['profileImage']}`}
                                    alt=''
                                />
                            </td>
                            <td>{property['title']}</td>
                            <td>{property['details']}</td>
                            <td>{property['rent']}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        onDeleteProperty(property['id'])
                                    }}
                                    className='btn btn-danger btn-sm'
                                >
                                    delete
                                </button>
                                <button
                                    onClick={() => onDetails(property['id'])}
                                    className='btn btn-primary btn-sm'
                                >
                                    details
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TablePropertiesListing
