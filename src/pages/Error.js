import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";

// Hero component contain a default prop wihch is "defaultHero", if
// we dont sett other classes though

function Error() {
  return (
    <Hero>
      <Banner title="404" subTitle="page not found">
        <Link to="/" className="btn-primary">
          return home
        </Link>
      </Banner>
    </Hero>
  );
}

export default Error;
