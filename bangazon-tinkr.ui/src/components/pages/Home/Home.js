import React from 'react';
import Button from '../../shared/Button/Button';
import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="Home d-flex justify-content-center align-items-center">
        <div className=" home-container container d-flex justify-content-center align-items-center">
          <div className="row">
            <div className=" home-content col d-flex justify-content-center align-items-center">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Rubbish Refurbished</h1>
                <p className="lead">Tinkr is the place for amazing antiques, rustic relics, fantastic finds, broken bits, and everything in between. Simply search by name or category to find your next fix. </p>
              </div>
            </div>
            </div>
            <div className=" home-content col d-flex justify-content-center align-items-center">
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Find something to Tinkr with..." aria-label="tinkrSearch" aria-describedby="basic-addon2"/>
                  <div className="input-group-append">
                    <Button />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
