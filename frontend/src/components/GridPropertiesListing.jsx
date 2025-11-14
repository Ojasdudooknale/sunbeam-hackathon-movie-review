import React from 'react'
import { config } from '../services/config'
import { useNavigate } from 'react-router-dom'
//import { addToCart } from '../../features/cartSlice'
//import { useDispatch } from 'react-redux'

function GridPropertiesListing({ properties }) {
    // get navigate function reference
    const navigate = useNavigate()

    // const onDetails = (id) => {
    //     // dynamically go to the property details component
    //     // along with the selected property details
    //     navigate('/home/property-details', { state: { id: id } })
    // }

    // get dispatch function reference
    // const dispatch = useDispatch()

    // const addPropertyToCart = (property) => {
    //     dispatch(addToCart(property))
    // }

    return (
        <div className='row'>
            {properties.map((property) => {
                return (
                    <div
                        className='col-3'
                        key={property['id']}
                    >
                        <div
                            className='card'
                            style={{ width: '18rem' }}
                        >
                            <img
                                src={`${config.server}/${property['profileImage']}`}
                                className='card-img-top'
                                alt=''
                            />
                            <div className='card-body'>
                                <h5 className='card-title'>{property['title']}</h5>
                                <div className='card-text'>
                                    <div>
                                        <span>Rent: </span>
                                        <span style={{ fontWeight: 'bolder' }}>
                                            ₹{property['rent']}
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            beds: {property['beds']}, bathrooms:{' '}
                                            {property['bathrooms']}
                                        </span>
                                    </div>
                                    <div className='mt-2'>
                                        <button
                                            onClick={() => {
                                                onDetails(property['id'])
                                            }}
                                            className='btn btn-primary btn-sm'
                                        >
                                            details
                                        </button>
                                        <button
                                            onClick={() => {
                                                addPropertyToCart(property)
                                            }}
                                            className='ms-2 btn btn-warning btn-sm'
                                        >
                                            add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default GridPropertiesListing
