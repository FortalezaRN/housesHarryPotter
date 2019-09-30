sorry for bad english but we're go 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:


### `npm start`

You need to have node (^ 8.12) installed, download the project, run npm install and then npm start
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Fonts
Fonts removed by copyright:<br>
src/assets/fonts/HARRYP__.TTF;<br>

### Node MCU 
Node MCU ESP8266 was used in the project for to trigger the hat function<br>

### For security, I left firebase data hidden
But just create the project in firebase, copy the project data and create the file DataFirebase.js in src / assets / js / with firebase data:
```const Config = () => ({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
})

export default Config;```
