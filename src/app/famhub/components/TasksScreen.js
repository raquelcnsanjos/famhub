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
  Checkbox,
  Avatar,
  Chip,
  IconButton,
  Fab,
  Badge,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import PetsIcon from "@mui/icons-material/Pets";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import { mockTasks } from "../data/mockData";

export default function TasksScreen() {
  const [tasks, setTasks] = useState(mockTasks);

  const handleTaskComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "concluido" ? "pendente" : "concluido",
            }
          : task
      )
    );
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      limpeza: <CleaningServicesIcon />,
      pets: <PetsIcon />,
      compras: <ShoppingCartIcon />,
      casa: <HomeIcon />,
    };
    return iconMap[category] || <HomeIcon />;
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      limpeza: "#4caf50",
      pets: "#ff9800",
      compras: "#2196f3",
      casa: "#9c27b0",
    };
    return colorMap[category] || "#757575";
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      alta: "#f44336",
      normal: "#2196f3",
      baixa: "#4caf50",
    };
    return colorMap[priority] || "#757575";
  };

  const pendingTasks = tasks.filter((task) => task.status === "pendente");
  const completedTasks = tasks.filter((task) => task.status === "concluido");

  return (
    <Box sx={{ p: 2, pb: 10 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 1, color: "#1976d2" }}
        >
          Tarefas da Família 📝
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip
            label={`${pendingTasks.length} pendentes`}
            color="warning"
            size="small"
          />
          <Chip
            label={`${completedTasks.length} concluídas`}
            color="success"
            size="small"
          />
        </Box>
      </Box>

      {/* Tarefas Pendentes */}
      {pendingTasks.length > 0 && (
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "#f57c00" }}
            >
              ⏰ Pendentes
            </Typography>
            <List dense>
              {pendingTasks.map((task) => (
                <ListItem
                  key={task.id}
                  sx={{
                    px: 0,
                    backgroundColor: "#fff8e1",
                    borderRadius: 2,
                    mb: 1,
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={false}
                      onChange={() => handleTaskComplete(task.id)}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "medium" }}
                        >
                          {task.title}
                        </Typography>
                        {task.priority === "alta" && (
                          <Badge
                            badgeContent="!"
                            color="error"
                            sx={{ "& .MuiBadge-badge": { fontSize: "10px" } }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 16,
                            height: 16,
                            bgcolor: getCategoryColor(task.category),
                            "& .MuiSvgIcon-root": { fontSize: 12 },
                          }}
                        >
                          {getCategoryIcon(task.category)}
                        </Avatar>
                        <Typography variant="caption">
                          {task.assignedTo}
                        </Typography>
                        <Chip
                          label={task.priority}
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: "10px",
                            backgroundColor: getPriorityColor(task.priority),
                            color: "white",
                          }}
                        />
                      </Box>
                    }
                  />
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Tarefas Concluídas */}
      {completedTasks.length > 0 && (
        <Card>
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "#4caf50" }}
            >
              ✅ Concluídas
            </Typography>
            <List dense>
              {completedTasks.map((task) => (
                <ListItem
                  key={task.id}
                  sx={{
                    px: 0,
                    backgroundColor: "#e8f5e8",
                    borderRadius: 2,
                    mb: 1,
                    opacity: 0.7,
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={true}
                      onChange={() => handleTaskComplete(task.id)}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "medium",
                          textDecoration: "line-through",
                        }}
                      >
                        {task.title}
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 16,
                            height: 16,
                            bgcolor: getCategoryColor(task.category),
                            "& .MuiSvgIcon-root": { fontSize: 12 },
                          }}
                        >
                          {getCategoryIcon(task.category)}
                        </Avatar>
                        <Typography variant="caption">
                          {task.assignedTo}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Botão para adicionar tarefa */}
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
