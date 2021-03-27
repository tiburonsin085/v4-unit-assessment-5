import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom'
import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png';
import logoutLogo from './../../assets/shut_down.png';
import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    axios.get('/api/auth/me')
    .then(res => 'replace this string with something useful')
  }
  
  logout() {
    axios.post('/api/auth/logout')
      .then(_ => 'replace this string with something else')
  }
  
  render() {
      return this.props.location.pathname !== '/' &&
        <div className='nav'>
          <div className='nav-profile-container'>
            <div className='nav-profile-pic'></div>
            <p>placeholder username</p>
          </div>
          <div className='nav-links'>
            <Link to = '/dash'>
              <img className='nav-img' src={homeLogo} alt='home' />
            </Link>
            <Link to = '/form'>
              <img className='nav-img' src={newLogo} alt='new post' />
            </Link>
          </div>
          <Link to = '/' onClick = {this.logout()}>
            <img className='nav-img logout' src={logoutLogo} alt='logout' />
          </Link>
        </div>
  }
}

export default  withRouter( Nav );