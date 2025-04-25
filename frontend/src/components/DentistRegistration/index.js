import {Component} from 'react'
import { withNavigation } from '../WithNavigation'
import './index.css'

class DentistRegistration extends Component{

    state = {name: '', email: '', password: '', errMsg: '', specialization: '', successMsg: ''}
    

    onChangeName = (event) => {
        this.setState({name: event.target.value})
    }

    onChangeEmail = (event) => {
        this.setState({email: event.target.value})
    }

    onChangePassword = (event) => {
        this.setState({password: event.target.value})
    }

    onChangeSpecialization = (event) => {
        this.setState({specialization: event.target.value})
    }

    onSubmitDentistData = async (event) => {
        event.preventDefault()
        const {name, email, password,specialization} = this.state
        const newData = {name, email, specialization, password}
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/dentists/register`, options)
        const data = await response.json()
        if(response.ok){
            this.setState({successMsg: data.message, errMsg: ''})
            this.props.navigate(`/login`)
        }
        else{
            this.setState({errMsg: data.message, successMsg: ''})
        }
    }

    render(){
        const {name, email, password,errMsg,specialization,successMsg} = this.state
        return (
            <div className='user-registartion-container'>
                <div className='subcard-container'>
                <h1>User Regitration Form</h1>
               <form className='form-container' onSubmit={this.onSubmitDentistData}>
                    <div className='mt-2 mb-2'>
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input value={name} onChange={this.onChangeName} type="text" id="inputName" className="form-control" aria-describedby="passwordHelpBlock" placeholder='Enter Your Name' />
                    </div>
                    <div className='mt-2 mb-2'>
                        <label htmlFor="inputemail" className="form-label">email</label>
                        <input value={email} onChange={this.onChangeEmail}  type="text" id="inputemail" className="form-control" aria-describedby="passwordHelpBlock" placeholder='Enter Your email' />
                    </div>
                    <div className='mt-2 mb-2'>
                        <label htmlFor="inputspecialization" className="form-label">specialization</label>
                        <input value={specialization} onChange={this.onChangeSpecialization}  type="text" id="inputspecialization" className="form-control" aria-describedby="passwordHelpBlock" placeholder='Enter Your email' />
                    </div>
                    <div className='mt-2 mb-2'>
                        <label htmlFor="inputPassword5" className="form-label">Password</label>
                        <input value={password} onChange={this.onChangePassword}  type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" placeholder='Enter your Password'/>
                    </div>
                    <div className='d-flex justify-content-center mt-3'>
                        <button type="submit" className='btn btn-success'>Submit</button>
                    </div>
                    {successMsg.length > 0 && <p className='text-center text-success'>♥{successMsg}</p>}
                    {errMsg.length > 0 && <p className='text-center text-danger'>**{errMsg}</p>}
               </form>
               </div>
            </div>
        )
    }
}

export default withNavigation(DentistRegistration)