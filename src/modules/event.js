import {createAction, handleActions} from 'redux-actions';
import update from 'react-addons-update';

// action type
const ADD_EVENT = 'event/ADD_EVENT';

// action creators
export const addEvent = createAction(ADD_EVENT); // 


// initial states
const initialState = {
  events: [
    {
      "event_id":"12345",
      "event_name":"5K Run",
      "date":"Nov 1, 2017",
      "location":"Hotel Rwanda",
      "image": 'http://www.top13.net/wp-content/uploads/2014/11/17-small-flowers.jpg'
    },
    {  
      "event_id":"12346",
      "event_name":"Dance Event",
      "date":"Nov 15, 2017",
      "location":"Hotel Rwanda",
      "image": 'https://www.publicknowledge.org/assets/uploads/blog/smallbutpowerful.jpg'      
    },
    {  
      "event_id":"12327",
      "event_name":"New Year Event",
      "date":"Dec 31, 2017",
      "location":"Hotel Marriot",
      "image": 'http://thewallpaper.co/wp-content/uploads/2016/02/dog-small-pets-baby-animals-widescreen-high-resolution-wallpaper-new-top-desktop-background-download-free-puffy-dogs-curr-hd-1600x1200-736x459.jpg'
    }
  ],
  guests:[
    {
      "last name":"Narutis",
      "first name":"Lukas",
      "note":"our engineer from Barcelona",
      "status":"0"
    },
    {
      "last name":"Normantas",
      "first name":"Anya",
      "note":"Google Play support",
      "status":"1"
    },
    {  
      "last name":"Norris",
      "first name":"Dean",
      "note":"played by Hank Schrader",
      "status":"0"
    }
  ]
};

// reducers
export default handleActions({
  [ADD_EVENT]: (state, action) => {
    const {title, description, dateTime, location} = action.payload;
    
    return update(state, {
      events: {        
        $push: [{
          'event_id': "3454",
          'event_name': title,
          'date': dateTime,
          'location': location,
          'image': 'http://thewallpaper.co/wp-content/uploads/2016/02/dog-small-pets-baby-animals-widescreen-high-resolution-wallpaper-new-top-desktop-background-download-free-puffy-dogs-curr-hd-1600x1200-736x459.jpg'
        }]
      }
    });
  }
}, initialState);
