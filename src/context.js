import React, { Component } from "react";
import itemss from "./data";

// start with contentful and get data from external source
import Client from "./Contentful";
// Client.getEntries({ content_type: "resortApp" }).then((response) =>
//   console.log("entries items =>", response.items)
// );

// createContext() give us two components: Provider and Consumer
const RoomContext = React.createContext();

// <RoomContext.Provider value={'hello'} />

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  // later on when we get the external data with "getData()"
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "resortApp",

        // ordering displaying of items by "sys" property which is the "id"
        // ex. order by price =>  order: 'fields.price'
        order: 'fields.id'
      });
      // calling func and pass in actual data "items" as argument
      let rooms = this.formatData(response.items);
      console.log("rooms fromatData", rooms);

      // filtering rooms with feature
      let featuredRooms = rooms.filter((room) => room.featured === true);
      console.log("filtered of featured rooms", featuredRooms);

      // get max price of price range, pass and return in a value
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      console.log("max price", maxPrice);
      // get max size of size range pass and return in a value
      let maxSize = Math.max(...rooms.map((item) => item.size));
      console.log("max size", maxSize);

      //  this.setState({
      //    rooms: rooms,
      //    featuredRooms: featuredRooms,
      //    sortedRooms: rooms,
      //    loading: false,
      //  });

      // ES6 way
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getData();
  }

  // func declaration
  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);

      let room = { ...item.fields, images: images, id };
      return room;
    });

    return tempItems;
  }

  // create func for getting exact matched room by the name of "slug"
  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];

    // difference between find() and filter(), well find() finds the first match
    // and find() going to be an object. In filter() should get it out from an array
    // also return an array
    const room = tempRooms.find((room) => room.slug === slug);

    return room;
  };

  // create changing events for filtring
  handleChange = (event) => {
    // define a generic variable as "target"
    const target = event.target;
    // check with a turnery wether the type is a checkbox or a regular value
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;

    console.log(` this is name: ${name}, this is value: ${value}`);

    // what we get from the name property, check that value in the state,
    // set them equal to the current value we get from input,
    // the type is actually the value
    this.setState(
      {
        [name]: value,
      },
      // filterRooms updates also depended what we do in filterRooms()
      this.filterRooms
    );
  };

  filterRooms = () => {
    // use "let" cause later on we overwrite some of them
    let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
      this.state;

    // get all rooms with spreadoperator then storing them in tempRooms
    let tempRooms = [...rooms];

    // transform value from string to number, cause we get the values (capacity)
    // from select as a string and should parse them to number here.
    // overwriting the capacity value form
    capacity = parseInt(capacity);
    price = parseInt(price);

    // filter by type which is the actual values
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    // filter by capacity
    // if room capacity is "1", don't tuch it cuase then we display/return all rooms for it
    // otherwise filter rooms: rooms with capacity bigger than "1"

    // ex. room with capacity 2 or bigger matches with all rooms with capacity
    // 2 or bigger which returns all rooms capacity 2 and bigger than 2
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    // filter by price
    // filtring rooms which each rooms price (price property from data object) is less than
    // price (which we set "price" to "maxPrice" in componentDidMount), in
    // this case the max range is "$600"
    tempRooms = tempRooms.filter((room) => room.price <= price);

    // filter by size
    // filtring rooms which the it's size is between
    // minSize ("0") and maxSize ("1000") in this case
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    // filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
      console.log("rooms with pets allowed", tempRooms);
    }

    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
      console.log("rooms with breakfast", tempRooms);
    }

    // change state
    // set the sortedRooms, which we get access to it later on
    // in the list, to rempRooms
    this.setState({
      sortedRooms: tempRooms,
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
