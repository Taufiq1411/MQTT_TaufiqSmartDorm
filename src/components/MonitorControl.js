import React, { useState, useEffect, Fragment } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import TempIcon from '../assets/temp_icon.svg'
import HumidIcon from '../assets/humid_icon.svg'
import FanIcon from '../assets/fan_icon.svg'

import Card from 'react-bootstrap/Card';

var mqtt    = require('mqtt');
var options = {
	protocol: 'mqtts',
	clientId: 'b0908853' 	
};
var client  = mqtt.connect('wss://test.mosquitto.org:8081', options);

function App() {
  const [mesgTemp, setmesgTemp] = useState();
  const [mesgHumid, setmesgHumid] = useState();
  const [nilai, setNilai] = useState('1');
  var [fanStatus, setFanStatus] = useState('off');

  client.subscribe('SmartHome/+');

  var pesanSuhu = () => {
    client.on('message', function (topic, message) {
    if (topic === 'SmartHome/temp') {
    const mesgTemp = message.toString();
    setmesgTemp(mesgTemp);
    console.log(mesgTemp);
    }});
  };

  var pesanLembap = () => {
    client.on('message', function (topic, message) {
    if (topic === 'SmartHome/humid') {
    const mesgHumid = message.toString();
    setmesgHumid(mesgHumid);
    console.log(mesgHumid);
    }});
  };

  var saklar = () => {
    const topic3 = 'SmartHome/relay'
    client.publish(topic3, nilai);
    if (nilai == '1') {
      setNilai('0')
      setFanStatus('on');}
    else {
      setNilai('1')
      setFanStatus('off');}
  };

  useEffect(() => {
      pesanSuhu();
      pesanLembap();
  }, [mesgTemp, mesgHumid]);

  const handleClick = () => {
    saklar()
  }

  return (
    <>
    <div class="col-lg-6 mb-4">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Text className="mb-2 text-muted">Temperature</Card.Text>
          <img src={TempIcon} className="App-icon"></img>
          <Card.Text className="mb-2 text-muted">{mesgTemp} °C</Card.Text>
        </Card.Body>
      </Card>
    </div>
    <div class="col-lg-6 mb-4">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Text className="mb-2 text-muted">Humidity</Card.Text>
          <img src={HumidIcon} className="App-icon"></img>
          <Card.Text className="mb-2 text-muted">{mesgHumid} %</Card.Text>
        </Card.Body>
      </Card>
    </div>
    <div class="col-lg-6 mb-4">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Text className="mb-2 text-muted">Fan</Card.Text>
            {fanStatus == 'on' && (<img src={FanIcon} className="App-logo"></img>)}
            {fanStatus == 'off' && (<img src={FanIcon} className="App-icon"></img>)}
          <Card.Text className="mb-2 text-muted">
          <div className='App-switch'>
            <div className='custom-control custom-switch'>
              <input
                type='checkbox'
                className='custom-control-input'
                id='customSwitches'
                readOnly
                onChange={handleClick}
              />
              <label className='custom-control-label' htmlFor='customSwitches'></label>
            </div>
          </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    </>
  );
}

export default App;

