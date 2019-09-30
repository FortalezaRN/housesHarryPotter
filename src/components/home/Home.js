import React from 'react';
import * as firebase from 'firebase';
import Config from '../../assets/js/DataFirebase';

import grif from '../../assets/img/grif.png';
import lufa from '../../assets/img/lufa.png';
import rave from '../../assets/img/rave.png';
import san from '../../assets/img/san.png';

firebase.initializeApp(Config());

const database = firebase.database();

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: [{ image: grif, student: 0, name: "Grifinoria" }, { image: lufa, student: 0, name: "Lufa-Lufa" }, { image: rave, student: 0, name: "Corvinal" }, { image: san, student: 0, name: "Sonserina" }],
      currentHouse: { image: grif, name: "Grifinoria" },
      removedHouses: [grif, lufa, rave, san],
      go: true
    }
    this.rotateHouses = this.rotateHouses.bind(this)
  }

  resetState() {
    this.setState({
      houses: [{ image: grif, student: 0, name: "Grifinória" }, { image: lufa, student: 0, name: "Lufa-Lufa" }, { image: rave, student: 0, name: "Corvinal" }, { image: san, student: 0, name: "Sonserina" }],
      currentHouse: { image: grif, name: "" },
      removedHouses: [grif, lufa, rave, san],
    })
  }

  rotateHouses() {
    this.animation();
    setTimeout(() => {
      const randomHouse = Math.floor(Math.random() * this.state.removedHouses.length);
      const removedHouses = this.state.removedHouses;
      let nameHouse = "";
      const student = this.state.houses.map((item, j) => {
        if (item.image === removedHouses[randomHouse]) {
          nameHouse = item.name;
          return { image: item.image, student: item.student + 1, name: item.name };
        }
        else
          return { image: item.image, student: item.student, name: item.name };
      });

      this.setState({ currentHouse: { image: removedHouses[randomHouse], name: nameHouse } }, function () {
        removedHouses.splice(randomHouse, 1);

        const updateDatabase = (item) => { database.ref('stateCurrent/').set(this.state); }

        if (removedHouses.length === 0)
          this.setState({ removedHouses: this.state.houses.map((item) => (item.image)) }, updateDatabase)
        else
          this.setState({ removedHouses }, updateDatabase);

        this.setState({ houses: student });
      });


    }, 5000);

  }

  fade(txt, contentAnimation, contTxt) {
    switch (contTxt) {
      case 0:
        txt.style.opacity = 0;
        break;
      case 1:
        txt.innerHTML = "Hummmm..."
        txt.style.opacity = 1;
        break;
      case 2:
        txt.style.opacity = 0;
        break;
      case 3:
        txt.innerHTML = "Sua casa eh..."
        txt.style.opacity = 1;
        break;
      case 4:
        txt.style.opacity = 0;
        break;
      case 5:
        txt.innerHTML = "Qual sera a sua casa?"
        contentAnimation.style.opacity = 0;
        break;
      default:
        contentAnimation.style.display = "none";
    }
  }

  animation() {
    let contTxt = 0;
    const txt = document.querySelector("#hat");
    const contentAnimation = document.querySelector(".house--animation");
    contentAnimation.style.display = "flex";
    contentAnimation.style.opacity = 1;
    this.fade(txt, contentAnimation, contTxt)
    contTxt++;
    const animation = setInterval(() => {
      this.fade(txt, contentAnimation, contTxt)
      contTxt++;
      if (contTxt === 6) {
        clearInterval(animation);
        setTimeout(() => {
          contentAnimation.style.display = "flex";
          contentAnimation.style.opacity = 1;
          txt.style.opacity = 1;
          database.ref('arduino/').set({ choice: false });
          this.setState({ go: true });
        }, 3000)
      }
    }, 1000);

  }

  componentDidMount() {
    const ref = database.ref("stateCurrent");
    this.animation();
    const alterStatus = () => {
      if (this.state.go) {
        this.setState({ go: false });
        database.ref('arduino/').set({ choice: true });
      }
    }
    ref.once("value")
      .then((snapshot) => {
        const currentHouse = snapshot.child("currentHouse").val();
        const removedHouses = snapshot.child("removedHouses").val();
        const houses = snapshot.child("houses").val();
        this.setState({ currentHouse, removedHouses, houses })
        window.onclick = () => {
          alterStatus();
        }
        window.addEventListener('keydown', (e, o) => {
          if (e.code === "Space" || e.code === "Enter" || e.code === "NumpadEnter")
            alterStatus();
        })
      });
  }

  componentWillMount() {
    database.ref('arduino/').on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let childData = childSnapshot.val();
        if (childData) {
          this.rotateHouses();
        }
      });
    });
  }

  render() {
    return (
      <div className="container--home">
        <div className="house--current">
          <img src={this.state.currentHouse.image} alt="casa selecionada" />
          <p>{this.state.currentHouse.name}</p>
        </div>
        <div className="house--animation">
          <p id="hat">Qual sera a sua casa?</p>
        </div>
        {/* <div>
          <button onClick={this.rotateHouses}>Selecionar casa</button>
        </div> */}
      </div>
    )
  }
}