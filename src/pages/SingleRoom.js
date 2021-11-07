import React, { Component, Fragment } from "react";
import defaultBcg from "../images/hotelroom-2.jpg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomConsumer, RoomContext } from "../context";
import { StyledHero } from "../components/StyledHero";

export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    // logging the props what the router-dom provides: in params
    // we access the slug for each and every item
    console.log(this.props);

    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg,
    };
  }

  static contextType = RoomContext;

  // componentDidMount() {}

  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    console.log("single room", room);

    if (!room) {
      return (
        <div className="error">
          <h3>no such room could be found...</h3>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </div>
      );
    }

    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images,
    } = room;

    // array destructuring, mainImg is the first index and
    // ...defaultImg is the rest of array
    // to make sure we render only items just after the first item (mainImg)
    const [mainImg, ...defaultImg] = images;

    return (
      <Fragment>
        {/* <StyledHero img={images[0] || this.state.defaultBcg}> */}
        <StyledHero img={mainImg || this.state.defaultImg}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {/* {images.map((item, index) =>{ */}
            {defaultImg.map((item, index) => {
              return <img key={index} src={item} alt={name} />;
            })}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p> {description} </p>
            </article>
            <article className="info">
              <h3>Info</h3>
              <h6>price: ${price}</h6>
              <h6>size: {size} SQFT</h6>
              <h6>
                max capacity: {""}
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6> {pets ? "pets allowed" : "no pets allowed"} </h6>
              <h6> {breakfast && "free breakfast included"} </h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>-{item} </li>;
            })}
          </ul>
        </section>
      </Fragment>
    );
  }
}
