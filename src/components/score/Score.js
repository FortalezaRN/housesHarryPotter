import React from 'react';
import * as firebase from 'firebase';

export default class Score extends React.Component {
  state = {
    grif: 0, san: 0, con: 0, lufa: 0
  }

  addPoint(house) {
    this.setState((state) => ({
      [house]: state[house] + 10
    }), () => {
      firebase.database().ref('score/' + house).set(this.state[house]);
    });
  }
  removePoint(house) {
    this.setState((state) => ({
      [house]: state[house] - 10
    }), () => {
      firebase.database().ref('score/' + house).set(this.state[house]);
    });
  }

  componentDidMount() {
    const ref = firebase.database().ref("score");
    ref.once("value")
      .then((snapshot) => {
        const grif = snapshot.child("grif").val();
        const san = snapshot.child("san").val();
        const con = snapshot.child("con").val();
        const lufa = snapshot.child("lufa").val();
        this.setState({ grif, san, con, lufa });
      });
  }
  componentWillMount() {
    firebase.database().ref('score/').on('value', (snapshot) => {
      const grif = snapshot.child("grif").val();
      const san = snapshot.child("san").val();
      const con = snapshot.child("con").val();
      const lufa = snapshot.child("lufa").val();
      this.setState({ grif, san, con, lufa })
    });
  }
  render() {
    return (
      <div className="content-score">
        <div className="scoresHouses">
          <div className="score">
            <h3>Grifinória</h3>
            <div className="btns">
              <span className="icon plus" onClick={() => this.addPoint("grif")}>+</span>
              <span>{this.state.grif}</span>
              <span className="icon less" onClick={() => this.removePoint("grif")}>-</span>
            </div>
          </div>
          <div className="score">
            <h3>Lufa-Lufa</h3>
            <div className="btns">
              <span className="icon plus" onClick={() => this.addPoint("lufa")}>+</span>
              <span>{this.state.lufa}</span>
              <span className="icon less" onClick={() => this.removePoint("lufa")}>-</span>
            </div>
          </div>
          <div className="score">
            <h3>Corvinal</h3>
            <div className="btns">
              <span className="icon plus" onClick={() => this.addPoint("con")}>+</span>
              <span>{this.state.con}</span>
              <span className="icon less" onClick={() => this.removePoint("con")}>-</span>
            </div>
          </div>
          <div className="score">
            <h3>Sonserina</h3>
            <div className="btns">
              <span className="icon plus" onClick={() => this.addPoint("san")}>+</span>
              <span>{this.state.san}</span>
              <span className="icon less" onClick={() => this.removePoint("san")}>-</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
