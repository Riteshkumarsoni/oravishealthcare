import {Component} from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import {withNavigation} from '../WithNavigation'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class LoginPage extends Component{

    state={patientEmail: '', patientpassword:'', dentistemail: '', dentistPassword: '', errMsg: '', id: ''}

    onChangePatientEmail = (event) => {
        this.setState({patientEmail: event.target.value})
    }

    onChangePatientPassord = (event) => {
        this.setState({patientpassword: event.target.value})
    }

    onChangeDentistEmail = (event) => {
        this.setState({dentistemail: event.target.value})
    }

    onChangeDentistPasword = (event) => {
        this.setState({dentistPassword: event.target.value})
    }

    onUserSubmitSuccess = (newData) => {
        Cookies.set('jwt_token', newData.jwtToken, {expires: 1})
        this.props.navigate(`/${newData.userId}/dashboard`)
    }

    onDentistSubmitSuccess = (newData) => {
        Cookies.set('jwt_token', newData.jwtToken, {expires: 1})
        this.props.navigate(`/dentist/:${newData.dentistId}/dashboard`)
    }

    onPatientDetailsSubmit = async (event) => {
        event.preventDefault()
        const {patientEmail, patientpassword} = this.state
        const newData = {email: patientEmail, password: patientpassword}
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, options)
        const data = await response.json()
        if(response.ok){
            const newData = {jwtToken: data.token, userId: data.userId}
            console.log(newData)
            this.onUserSubmitSuccess(newData)
        }
        else{
            this.setState({errMsg: data.message})
        }
    }

    onDentistDetailsSubmit = async (event) => {
        event.preventDefault()
        const {dentistemail, dentistPassword} = this.state
        const newData = {email: dentistemail, password: dentistPassword}
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/dentists/login`, options)
        const data = await response.json()
        if(response.ok){
            const newData = {jwtToken: data.token, dentistId: data.dentistId}
            console.log(newData)
            this.onDentistSubmitSuccess(newData)
            this.setState({id: newData.dentistId})
        }
        else{
            this.setState({errMsg: data.message})
        }
    }

    gotoUserRegistration = () => {
        this.props.navigate("/user/registration")
    }

    gotoDentistRgistration = () => {
        this.props.navigate("/dentist/registration")
    }

    render(){
        const {errMsg,patientEmail,patientpassword,dentistemail,dentistPassword} = this.state
        const jwtToken = Cookies.get("jwt_token")
        if(jwtToken !== undefined){
            return <Navigate to="/" />
        }
        return (
            <div className="main-container">
                <div className=" bg-container shadow-lg ">
                    <div className="container">
                
                        <h1 className="main-heading mt-3">
                            Patient Sign-In
                        </h1>
            
                        <form onSubmit={this.onPatientDetailsSubmit}>
                            <input type="text" value={patientEmail}  className='inputEl' placeholder="enter your email" onChange={this.onChangePatientEmail} />
                            <input type="password" value={patientpassword}  className='inputEl' placeholder="enter your password" onChange={this.onChangePatientPassord} />
                            <button type="submit" className="btn btn-primary mt-4 w-100">Sign In</button>
                        </form>
                        {errMsg.length > 0 && <p className='text-danger text-center'>**{errMsg}</p>}
                        <div className='title-register-btn mt-2'>
                            or
                            <button className='register-btn' onClick={this.gotoUserRegistration}>Create new account ?</button>
                        </div>
                    </div>
                </div>
                
                <div className=" bg-container shadow-lg ">
                    <div className="container">
                
                        <h1 className="main-heading mt-3">
                            Dentist Sign-In
                        </h1>
            
                        <form onSubmit={this.onDentistDetailsSubmit}>
                            <input type="text" value={dentistemail} className='inputEl' placeholder="enter your email" onChange={this.onChangeDentistEmail}/>
                            <input type="password" value={dentistPassword} className='inputEl' placeholder="enter your password" onChange={this.onChangeDentistPasword} />
                            <button type="submit" className="btn btn-primary mt-4 w-100">Sign In</button>
                        </form>
                        <div className='title-register-btn mt-2'>
                            or
                            <button className='register-btn' onClick={this.gotoDentistRgistration}>Create new account ?</button>
                        </div>
                    </div>
                </div>

            </div>
        )
        
    }
}

export default withNavigation(LoginPage)