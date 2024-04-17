var model  = Backbone.Model.extend({
    fetch: async function(location,units){
        
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&APPID=cddbf0b42be47fe6061841ce93bf9ab6`, {
            method: "GET",
            mode: "cors"
          });
          return res.json();
    }
})


var view = Backbone.View.extend({
    el: document.querySelector(".div_body_card"),
    initialize: function(){
        this.model = new model();
    },
    events:{
        "click .edit_card_content_update": "editCardButtonHandler"
    },
    addCard: function(){
        let location = document.querySelector(".div_body_search_field_input").value;
        let units = document.querySelector(".div_body_search_field_select").value;
        this.model.fetch(location,units).then(data => {
            this.el.innerHTML +=`
            <div id=card${data.id} class="div_body_card_content">
              <div class="body_card_content_city">
                <p class="para_card_content_city">${data.name}</p>
                <div class="body_card_content_temperature">
                    <p class="para_card_content_temperature">${data.main.temp}* F</p>
                  </div>
              </div>
             
              <div class="body_card_content_weather">
                <p class="para_card_content_weather">${data.weather[0].main}</p>
                <div class="body_card_content_wind">
                    <p class="para_card_content_wind">${data.wind.speed} kmph</p>
                  </div>
              </div>
             
              <div class="div_body_card_button_container">
                <button id=card${data.id} class="div_body_card_button_edit">
                  Edit
                </button>
                <button id=card${data.id} class="div_body_card_button_delete">
                  Delete
                </button>
              </div>
            </div>`;
    }).catch(err => alert(err));
        return this;
    },
    editCard: function(e){
        this.el.querySelector(`#${e}`).innerHTML = `
        <div id=${e} class="div_body_card_content_edit">
        <div class="body_card_content_city">
          <input type="text" placeholder="Enter City Name"
          class="div_body_card_search_field_input" class="edit_card_content_city"/>
          <div class="body_card_content_temperature">
              <button id=${e} class="edit_card_content_update">Update</button>
          </div>
        </div>
      </div>`;
    },
    editCardButtonHandler: function(e){
        let location = document.querySelector(".div_body_card_search_field_input").value;
        this.el.removeChild(document.getElementById(e.target.id));
        this.model.fetch(location,'standard').then(data => {
            this.el.innerHTML +=`
            <div id=card${data.id} class="div_body_card_content">
              <div class="body_card_content_city">
                <p class="para_card_content_city">${data.name}</p>
                <div class="body_card_content_temperature">
                    <p class="para_card_content_temperature">${data.main.temp}* F</p>
                  </div>
              </div>
             
              <div class="body_card_content_weather">
                <p class="para_card_content_weather">${data.weather[0].main}</p>
                <div class="body_card_content_wind">
                    <p class="para_card_content_wind">${data.wind.speed} kmph</p>
                  </div>
              </div>
             
              <div class="div_body_card_button_container">
                <button id=card${data.id} class="div_body_card_button_edit">
                  Edit
                </button>
                <button id=card${data.id} class="div_body_card_button_delete">
                  Delete
                </button>
              </div>
            </div>`;
        }).catch(err => alert(err));
    },
    deleteCard: function(e){
        console.log(e)
        this.el.removeChild(document.getElementById(e));
    },
})

var app = Backbone.View.extend({
    el: "body",
    events: {
        "click .div_body_card_button_delete": "deleteLocation",
        "click .div_body_search_field_button" : "addLocation",
        "click .div_body_card_button_edit" : "editLocation"
    },
    initialize: function(){
        this.view = new view();
    },
    addLocation: function(){
        this.view.addCard();
    },
    editLocation: function(e){
        this.view.editCard(e.target.id);
    },
    deleteLocation: function(e){
        this.view.deleteCard(e.target.id);
    }

})

var main = new app();