import './index.css'

const DentistCard = (props) => {
    const {doctorDetails} = props
    const {name, specialization} = doctorDetails
    return (
        <li className='doctor-item-list m-2'>
            <p className='item-id'>{name}</p>
            <p className='item-status'>{specialization}</p>
            <button className='btn btn-primary'>Checkup Request</button>
        </li>
    )
}

export default DentistCard