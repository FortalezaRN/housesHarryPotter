import React from 'react';
import * as firebase from 'firebase';

export default class Students extends React.Component {
  state = {
    houses: [{ student: 0 }, { student: 0 }, { student: 0 }, { student: 0 }],
  }

  componentDidMount() {
    const ref = firebase.database().ref("stateCurrent");
    ref.once("value")
      .then((snapshot) => {
        const currentHouse = snapshot.child("currentHouse").val();
        const houses = snapshot.child("houses").val();
        const removedHouses = snapshot.child("removedHouses").val();
        this.setState({ currentHouse, houses, removedHouses })
        console.log(this.state)
      });
  }
  render() {
    return (
      <div className="studentHouses">
        <p>Alunos:</p>
        <p>Grifinória: {this.state.houses[0].student}</p>
        <p>Lufa-Lufa: {this.state.houses[1].student}</p>
        <p>Corvinal: {this.state.houses[2].student}</p>
        <p>Sonserina: {this.state.houses[3].student}</p>
      </div>
    )
  }
}
