"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  Fab,
  Grid,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import { useState } from "react";
import { mockAppointments } from "../data/mockData";

export default function CalendarScreen() {
  const [appointments] = useState(mockAppointments);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const getTypeIcon = (type) => {
    const iconMap = {
      medical: <MedicalServicesIcon />,
      school: <SchoolIcon />,
      work: <WorkIcon />,
      personal: <PersonIcon />,
    };
    return iconMap[type] || <CalendarTodayIcon />;
  };

  const getTypeColor = (type) => {
    const colorMap = {
      medical: "#f44336",
      school: "#2196f3",
      work: "#4caf50",
      personal: "#ff9800",
    };
    return colorMap[type] || "#757575";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Simular alguns dias do mês
  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(i).padStart(2, "0")}`;
      const dayAppointments = appointments.filter(
        (apt) => apt.date === dateStr
      );
      days.push({
        date: i,
        dateStr,
        appointments: dayAppointments,
        isToday: dateStr === new Date().toISOString().split("T")[0],
      });
    }
    return days.slice(0, 14); // Mostrar apenas as próximas 2 semanas
  };

  const calendarDays = generateCalendarDays();
  const selectedAppointments = appointments.filter(
    (apt) => apt.date === selectedDate
  );

  return (
    <Box sx={{ p: 2, pb: 10 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 1, color: "#1976d2" }}
        >
          Agenda Familiar 📅
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Acompanhe os compromissos da família
        </Typography>
      </Box>

      {/* Mini calendário */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Dezembro 2025
          </Typography>
          <Grid container spacing={1}>
            {calendarDays.map((day) => (
              <Grid item xs={2} key={day.date}>
                <Button
                  variant={day.dateStr === selectedDate ? "contained" : "text"}
                  onClick={() => setSelectedDate(day.dateStr)}
                  sx={{
                    width: "100%",
                    minWidth: "auto",
                    height: 40,
                    borderRadius: 2,
                    backgroundColor:
                      day.isToday && day.dateStr !== selectedDate
                        ? "#e3f2fd"
                        : "inherit",
                    position: "relative",
                  }}
                  size="small"
                >
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {day.date}
                    </Typography>
                    {day.appointments.length > 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 2,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 6,
                          height: 6,
                          backgroundColor: "#f44336",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </Box>
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Compromissos do dia selecionado */}
      <Card>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            {formatDate(selectedDate)}
          </Typography>

          {selectedAppointments.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Nenhum compromisso para este dia
              </Typography>
            </Box>
          ) : (
            <List dense>
              {selectedAppointments.map((appointment) => (
                <ListItem
                  key={appointment.id}
                  sx={{
                    px: 0,
                    backgroundColor: "#f8f9fa",
                    borderRadius: 2,
                    mb: 1,
                    borderLeft: `4px solid ${getTypeColor(appointment.type)}`,
                  }}
                >
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: getTypeColor(appointment.type),
                        "& .MuiSvgIcon-root": { fontSize: 18 },
                      }}
                    >
                      {getTypeIcon(appointment.type)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {appointment.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 0.5,
                          }}
                        >
                          <AccessTimeIcon
                            sx={{ fontSize: 14, color: "text.secondary" }}
                          />
                          <Typography variant="caption">
                            {appointment.time}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 0.5,
                          }}
                        >
                          <PersonIcon
                            sx={{ fontSize: 14, color: "text.secondary" }}
                          />
                          <Typography variant="caption">
                            {appointment.member}
                          </Typography>
                        </Box>
                        {appointment.location && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mt: 0.5,
                            }}
                          >
                            <LocationOnIcon
                              sx={{ fontSize: 14, color: "text.secondary" }}
                            />
                            <Typography variant="caption">
                              {appointment.location}
                            </Typography>
                          </Box>
                        )}
                        <Box sx={{ mt: 1 }}>
                          <Chip
                            label={appointment.status}
                            size="small"
                            color="primary"
                            sx={{ height: 18 }}
                          />
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Próximos compromissos */}
      <Card sx={{ mt: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            🔔 Próximos Compromissos
          </Typography>
          <List dense>
            {appointments.slice(0, 3).map((appointment) => (
              <ListItem key={appointment.id} sx={{ px: 0 }}>
                <ListItemIcon>
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: getTypeColor(appointment.type),
                      "& .MuiSvgIcon-root": { fontSize: 14 },
                    }}
                  >
                    {getTypeIcon(appointment.type)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2">{appointment.title}</Typography>
                  }
                  secondary={
                    <Typography variant="caption">
                      {formatDate(appointment.date)} às {appointment.time}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Botão para adicionar compromisso */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 80,
          right: 16,
        }}
        size="medium"
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
