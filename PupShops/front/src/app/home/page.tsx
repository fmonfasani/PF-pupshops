import Banner from "@/components/Banner/Banner";
import CardList from "@/components/CardList/CardList";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

export default function HomeContainer() {
  return (
    <div>
      <Navbar />
      <Banner />
      <CardList />
      <h1>FOOTER</h1>
    </div>
  );
}
