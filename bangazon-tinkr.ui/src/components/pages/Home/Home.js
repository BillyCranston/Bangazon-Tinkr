import React from 'react';

import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="Home d-flex justify-content-center align-items-center">
        <div class=" home-container container d-flex justify-content-center align-items-center">
          <div class="row">
            <div class=" home-content col d-flex justify-content-center align-items-center">
            <div class="jumbotron jumbotron-fluid">
              <div class="container">
                <h1 class="display-4">Rubbish Refurbished</h1>
                <p class="lead">Tinkr is the place for amazing antiques, rustic relics, fantastic finds, broken bits, and everything in between. Simply search by name or category to find your next fix. </p>
              </div>
            </div>
            </div>
            <div class=" home-content col d-flex justify-content-center align-items-center">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Find something to Tinkr with..." aria-label="tinkrSearch" aria-describedby="basic-addon2"/>
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">Search</button>
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
