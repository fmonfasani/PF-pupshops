import CardListCatFood from "@/components/CardList/CardListCatFood";
import CardListDogFood from "@/components/CardList/CardListDogFood";
import React from "react";

export default function HomeContainer() {
  return (
    <div>
      <CardListDogFood />
      <CardListCatFood />
    </div>
  );
}
