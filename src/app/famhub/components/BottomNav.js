"use client";

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import {
  Home as HomeIcon,
  CalendarToday as CalendarIcon,
  LocalPharmacy as MedicationIcon,
  CheckCircle as TaskIcon,
  ShoppingCart as ShoppingIcon,
} from "@mui/icons-material";

export default function BottomNav({ value, onChange }) {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderRadius: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={onChange}
        showLabels
        sx={{
          "& .MuiBottomNavigationAction-root": {
            minWidth: "auto",
            fontSize: "10px",
          },
        }}
      >
        <BottomNavigationAction
          label="Início"
          icon={<HomeIcon />}
          value="home"
        />
        <BottomNavigationAction
          label="Agenda"
          icon={<CalendarIcon />}
          value="calendar"
        />
        <BottomNavigationAction
          label="Remédios"
          icon={<MedicationIcon />}
          value="medications"
        />
        <BottomNavigationAction
          label="Tarefas"
          icon={<TaskIcon />}
          value="tasks"
        />
        <BottomNavigationAction
          label="Compras"
          icon={<ShoppingIcon />}
          value="shopping"
        />
      </BottomNavigation>
    </Paper>
  );
}
