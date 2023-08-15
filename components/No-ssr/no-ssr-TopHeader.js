"use client"
import { set } from "mongoose";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import TopHeader from "../_App/TopHeader"
export default function topHeader() {
    const [onClient, setOnClient] = useState(false);
    useEffect(() => {
        setOnClient(true);
    },[])
  return <>{onClient && <TopHeader />}</>;
}