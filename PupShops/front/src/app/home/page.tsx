import CardListCatFood from "@/components/CardList/CardListCatFood";
import CardListDogFood from "@/components/CardList/CardListDogFood";
import Carousel from "@/components/Carousel/Carousel";
import Testimonials from "@/components/Testimonials/Testimonials";
import React from "react";

export default function HomeContainer() {
  return (
    <div>
      <Carousel />
      <CardListDogFood />
      <CardListCatFood />
      <Testimonials />
    </div>
  );
}
