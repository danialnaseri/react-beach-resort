import React, { Component } from "react";
import { RoomContext } from "../context";
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";

export default class FeaturedRooms extends Component {
  // declaring which context
  static contextType = RoomContext;

  render() {
    // to access values from context
    const { loading, featuredRooms: rooms } = this.context;
    console.log("featured rooms", rooms);

    const featuredRooms = rooms.map((room) => {
      return <Room key={room.id} room={room} />;
    });

    return (
      <div>
        <Title title="featured rooms" />

        <div className="featured-rooms-center">
          {loading ? <Loading /> : featuredRooms}
        </div>
      </div>
    );
  }
}
