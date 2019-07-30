import React from 'react';
import grif from '../../assets/img/grif.png';
import lufa from '../../assets/img/lufa.png';
import rave from '../../assets/img/rave.png';
import san from '../../assets/img/san.png';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: [{ image: grif, student: 0 }, { image: lufa, student: 0 }, { image: rave, student: 0 }, { image: san, student: 0 }],
      currentHouse: grif,
      removedHouses: [grif, lufa, rave, san],
    };
    this.rotateHouses = this.rotateHouses.bind(this)
  }
  rotateHouses() {
    const randomHouse = Math.floor(Math.random() * this.state.removedHouses.length);
    const removedHouses = this.state.removedHouses;
    const student = this.state.houses.map((item, j) => {
      if (item.image === removedHouses[randomHouse])
        return { image: item.image, student: item.student + 1 };
      else
        return { image: item.image, student: item.student };
    });

    this.setState({ currentHouse: removedHouses[randomHouse] });
    this.setState({ houses: student })

    removedHouses.splice(randomHouse, 1);

    if (removedHouses.length === 0)
      this.setState({ removedHouses: this.state.houses.map((item) => (item.image)) })
    else
      this.setState({ removedHouses });
  }
  render() {
    return (
      <div>
        <div>
          <img src={this.state.currentHouse} alt="casa selecionada" />
        </div>
        <div className="studentHouses">
          <p>Alunos:</p>
          <p>Grifinória: {this.state.houses[0].student}</p>
          <p>Lufa-Lufa: {this.state.houses[1].student}</p>
          <p>Corvinal: {this.state.houses[2].student}</p>
          <p>Sonserina: {this.state.houses[3].student}</p>
        </div>
        <div>
          <button onClick={this.rotateHouses}>Selecionar casa</button>
        </div>
      </div>
    )
  }
}