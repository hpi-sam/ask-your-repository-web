// @flow
import React, { Component } from 'react';
import Particles from 'react-particles-js';
import TypeIt from 'typeit';
import particlesConfig from './ParticlesConfiguration';
import UserAuthNav from './UserAuthNav';
import './LandingPage.scss';

type Props = {};

type State = {
  particles_params: Object,
};

class LandingPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      particles_params: particlesConfig,
    };
  }

  componentDidMount() {
    // Ordner waren gestern
    // Graphbasierte Cloudlösung für deine Datensammlung
    // Schluss mit dem Datensalat
    // Bring Ordnung in deine Cloud
    new TypeIt('.LandingPage__subtitle', {
      speed: 80,
      loop: true,
      loopDelay: 4000,
      waitUntilVisible: true,
    })
      .type('Still using folders?')
      .pause(1000)
      .break()
      .type('Graphbased cloud solution for your data collection')
      .pause(4000)
      .delete()
      .pause(1000)
      .type('Say no to the data jumble')
      .pause(1000)
      .break()
      .type('Declutter your cloud')
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
        <div className="LandingPage__content unselectable">
          <UserAuthNav />
          <div className="LandingPage__title">Ask Your Cloud </div>
          <div className="LandingPage__subtitle" />
        </div>
      </div>
    );
  }
}

export default LandingPage;
