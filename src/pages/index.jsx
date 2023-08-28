'use client'
import Header from "@/app/components/Header"
import Filter from "@/app/components/Filter"
import Body from "@/app/components/Body"

export default function Home(){
  return (
    <div>
      <Header />
      <Filter />
      <Body />
    </div>
  )
}