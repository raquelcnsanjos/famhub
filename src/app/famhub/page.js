"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import AppHeader from "./components/AppHeader";
import BottomNav from "./components/BottomNav";
import HomeScreen from "./components/HomeScreen";
import CalendarScreen from "./components/CalendarScreen";
import MedicationsScreen from "./components/MedicationsScreen";
import TasksScreen from "./components/TasksScreen";
import ShoppingScreen from "./components/ShoppingScreen";
import { mockFamily, mockNotifications } from "./data/mockData";

export default function FamHubApp() {
  const [currentScreen, setCurrentScreen] = useState("home");

  const currentUser = mockFamily.members[0]; // Fabrício como usuário logado
  const unreadNotifications = mockNotifications.filter((n) => !n.read).length;

  const getScreenTitle = () => {
    const titles = {
      home: "FamHub",
      calendar: "Agenda",
      medications: "Medicamentos",
      tasks: "Tarefas",
      shopping: "Compras",
    };
    return titles[currentScreen] || "FamHub";
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen />;
      case "calendar":
        return <CalendarScreen />;
      case "medications":
        return <MedicationsScreen />;
      case "tasks":
        return <TasksScreen />;
      case "shopping":
        return <ShoppingScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <Box
      sx={{ height: "100%", display: "flex", flexDirection: "column", mb: 2 }}
    >
      <AppHeader
        title={getScreenTitle()}
        onNotificationClick={() => {}}
        notificationCount={unreadNotifications}
        user={currentUser}
      />

      <Box sx={{ flex: 1, overflow: "auto" }}>{renderScreen()}</Box>

      <BottomNav
        value={currentScreen}
        onChange={(event, newValue) => {
          setCurrentScreen(newValue);
        }}
      />
    </Box>
  );
}
