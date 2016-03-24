var Title = React.createClass({

  componentDidMount: function () {
    var map = L.map('map').setView([51.505, -0.09], 13);
    map.locate({setView: true, enableHighAccuracy: true});

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    this.setState({map: map});
  },
  modifyMap: function (method, options) {
    this.setState({
      map: this.state.map[method](options.latLong, options.zoom, options.zoom_options)
    });
  },
  showmoreTemp: function (evt) {
    $('.majorpoints').click(function () {

      $(this).find('.hiders').toggle();
    });
  },
  getInitialState: function () {


    return {map: {}, title: 'undefined', temp: '0', rain: '0', wind: '0', gdd: "", water: '', ref : false};
  },
  getTerroir: function () {
    console.log("getting info...");
    if (!this.state.ref) {
      console.log("connecting to server");

      $.ajax({
        url: "http://localhost:3000/terroirs/getterroirinfo",
        dataType: 'json',
        success: function (data) {
          this.setState({title: data.terroirname});
          this.setState({temp: data.temperature});
          this.setState({wind: data.wind});
          this.setState({rain: data.rain});
          this.setState({gdd: data.gdd});
          this.setState({water: data.water});
          this.setState({ref: true});

        }.bind(this),
        error: function (xhr, status, err) {
          console.log("didnt connect")
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }

  },

  render: function () {
    this.getTerroir();
    return (

<div>

<div >

  <div className="row">
    <div className="col-xs-11"></div>
    <div  className="col-xs-1" >
      <button  className="btn btn-default" style={{float:'right', border :'none', backgroundColor: 'transparent'}}><i className="fa White fa-refresh fa-3x" onClick={function (){  }}></i></button>
    </div>
  </div>
</div>





      <div>
          <fieldset className="majorpoints" onClick={this.showmoreTemp}>
            <h2 >
              {this.state.title} <img src="/public/images/ic_my_location_48px-128.png"></img>
            </h2>
            <div className="hiders" style={{display:'none'}}>
              <p>some more data<br></br>
                some more data <br></br>
                some more data</p>
            </div>
          </fieldset>
        </div>


        <div>
          <fieldset className="majorpoints" onClick={this.showmoreTemp}>

            <div id="map" style={{height:300+'px'}}></div>

          </fieldset>
        </div>


        <div>
          <fieldset className="majorpoints" onClick={this.showmoreTemp}>
            <h2 >
              Temperature {this.state.temp} <img src="/public/images/thermometer-512 (1).png"></img> °C
            </h2>
            <div className="hiders" style={{display:'none'}}>
              <p>some more data<br></br>
                some more data <br></br>
                some more data</p>
            </div>
          </fieldset>
        </div>

        <div>
          <fieldset className="majorpoints" onClick={this.showmoreTemp}>

            <h2 >
              Chance of rain {this.state.rain} <img src="/public/images/white-rain-256.png"></img> %
            </h2>
            <div className="hiders" style={{display:'none'}}>
              <p>some more data<br></br>
                some more data <br></br>
                some more data</p>
            </div>
          </fieldset>
        </div>
        <div>
          <fieldset className="majorpoints" onClick={this.showmoreTemp}>
            <h2 >
              Water {this.state.water} <img src="/public/images/water-512.png"></img> % </h2>
            <div className="hiders" style={{display:'none'}}>
              <p> some more data.<br></br>
                some more data.<br></br>
                some more data.</p>
            </div>
          </fieldset>
        </div>

        <div>
          <fieldset className="majorpoints" onClick={this.showmoreTemp}>
            <h2 >
              Wind {this.state.wind} <img src="/public/images/wind-turbine-icon-22940.png"></img> Kmph
            </h2>
            <div className="hiders" style={{display:'none'}}>

              <p> some more data.<br></br>
                some more data.<br></br>
                some more data.</p>

            </div>
          </fieldset>
        </div>
      </div>


    );
  }
});


ReactDOM.render(
  <Title />,
  document.getElementById('app')
);
