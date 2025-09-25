"use client"
import Paino from "./Paino";
import {HeroUIProvider} from "@heroui/react";

export default function Home() {
  return (
    <>
    <HeroUIProvider>
    <Paino/>
    </HeroUIProvider>
    </>
  );
}
