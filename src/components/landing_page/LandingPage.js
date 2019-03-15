// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Particles from 'react-particles-js';
import TypeIt from 'typeit';
import UserAuthNav from './UserAuthNav';
import './LandingPage.scss';

type Props = {
};

type State = {
  particles_params: Object,
};

class LandingPage extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      particles_params: {
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
        },
      },
    };
  }

  componentDidMount() {
    new TypeIt('.subtitle', {
      speed: 80,
      loop: true,
      loopDelay: 4000,
      waitUntilVisible: true,
    })
      .type('Ordner waren gestern')
      .pause(1000)
      .break()
      .type('Graphbasierte Cloudlösung für Datensammlungen')
      .pause(4000)
      .delete()
      .pause(1000)
      .type('Schluss mit dem Datensalat')
      .pause(1000)
      .break()
      .type('Bring Ordnung in deine Cloud')
      .go();
  }

  render() {
    return (
      <div className="LandingPage">
        <div className="Particles">
          <Particles
            params={this.state.particles_params}
          />
        </div>
        <div className="Content unselectable">
          <UserAuthNav />
          <h1>Ask Your Cloud</h1>
          <div className="subtitle" />
        </div>
      </div>
    );
  }
}

export default connect()(LandingPage);
