import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrog } from '@fortawesome/free-solid-svg-icons';
import './Home.scss';

export class Home extends Component {
  render() {
    return (
        <div className="home">
          <header>
            <FontAwesomeIcon className="icon" icon={faFrog} />
            <p>
              you have reached the <code>canvas playground</code>.
            </p>
            <Link to="/graph">start graphing</Link>
          </header>
        </div>
    );
  }
}
