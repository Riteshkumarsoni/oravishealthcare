import {Component} from 'react'
import { ClipLoader } from 'react-spinners'
import Header from '../Header'
import DentistCard from '../DentistCard'
import './index.css'

const apiConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    in_progress: 'IN_PROGRESS',
    failure: 'FAILURE'
}

class UserDashboard extends Component{
    state = {apiStatus: apiConstants.initial, doctorData: [], errMsg: ''}
    componentDidMount(){
        this.getDentistData()
    }

    getDentistData = async () => {
        this.setState({apiStatus: apiConstants.in_progress})
        const apiUrl = process.env.REACT_APP_API_URL
        const response = await fetch(`${apiUrl}/api/dentists/`)
        const data = await response.json()
        if(response.ok){
            this.setState({doctorData: data, apiStatus: apiConstants.success})
        }
        else{
            this.setState({errMsg: data.message, apiStatus: apiConstants.failure})
        }
    }

    renderSuccess = () => {
        const {doctorData} = this.state
        return (
            <>
                <ul className='doctor-list-container'>
                    {doctorData.map(eachItem => <DentistCard key={eachItem._id} doctorDetails={eachItem} />) }
                </ul>
            </>
        )
    }

    renderFailure = () => (
        <div className='failure-container'>
            <img src="https://res.cloudinary.com/dh8g9mloe/image/upload/v1743873558/GithubVisualizer/lxxrvrghrfmad5qfbdgv.png" alt="failure" className='failure-img' />
        </div>
    )

    renderInProgress = () => (
        <div className='loader-container'>
            <ClipLoader height={50} width={50} color="#bh125b" />
        </div>
    )

    switchOpeartion = () => {
        const {apiStatus} = this.state
        switch(apiStatus) {
            case apiConstants.in_progress:
                return this.renderInProgress()
            case apiConstants.failure:
                return this.renderFailure()
            case apiConstants.success:
                return this.renderSuccess()
            default:
                return null
        }
    }

    render(){
        return (
            <>
                <Header />
                {this.switchOpeartion()}
            </>
        )
    }
}

export default UserDashboard