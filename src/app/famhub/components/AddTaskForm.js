"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import PetsIcon from "@mui/icons-material/Pets";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import { mockFamily } from "../data/mockData";

export default function AddTaskForm({ open, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    assignedTo: "",
    dueDate: "",
    category: "",
    priority: "normal",
    status: "pendente",
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.assignedTo || !formData.category) {
      return;
    }

    const newTask = {
      id: Date.now(),
      ...formData,
    };

    onAdd(newTask);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: "",
      assignedTo: "",
      dueDate: "",
      category: "",
      priority: "normal",
      status: "pendente",
    });
    onClose();
  };

  const categories = [
    {
      value: "limpeza",
      label: "Limpeza",
      icon: <CleaningServicesIcon />,
      color: "#4caf50",
    },
    {
      value: "pets",
      label: "Pets",
      icon: <PetsIcon />,
      color: "#ff9800",
    },
    {
      value: "compras",
      label: "Compras",
      icon: <ShoppingCartIcon />,
      color: "#2196f3",
    },
    {
      value: "casa",
      label: "Casa",
      icon: <HomeIcon />,
      color: "#9c27b0",
    },
  ];

  const priorities = [
    { value: "baixa", label: "Baixa", color: "#4caf50" },
    { value: "normal", label: "Normal", color: "#2196f3" },
    { value: "alta", label: "Alta", color: "#f44336" },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          📝
          <Typography variant="h6" component="span">
            Nova Tarefa
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Título da tarefa"
            fullWidth
            value={formData.title}
            onChange={handleChange("title")}
            placeholder="Ex: Lavar a louça, Passear com o cachorro..."
            required
          />

          <FormControl fullWidth required>
            <InputLabel>Responsável</InputLabel>
            <Select
              value={formData.assignedTo}
              onChange={handleChange("assignedTo")}
              label="Responsável"
            >
              {mockFamily.members.map((member) => (
                <MenuItem key={member.id} value={member.name}>
                  {member.avatar} {member.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={formData.category}
              onChange={handleChange("category")}
              label="Categoria"
            >
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      sx={{
                        width: 20,
                        height: 20,
                        bgcolor: category.color,
                        "& .MuiSvgIcon-root": { fontSize: 12 },
                      }}
                    >
                      {category.icon}
                    </Avatar>
                    {category.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl sx={{ flex: 1 }}>
              <InputLabel>Prioridade</InputLabel>
              <Select
                value={formData.priority}
                onChange={handleChange("priority")}
                label="Prioridade"
              >
                {priorities.map((priority) => (
                  <MenuItem key={priority.value} value={priority.value}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Chip
                        size="small"
                        sx={{
                          backgroundColor: priority.color,
                          color: "white",
                          width: 12,
                          height: 12,
                          "& .MuiChip-label": { px: 0 },
                        }}
                        label=""
                      />
                      {priority.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Data limite (opcional)"
              type="date"
              value={formData.dueDate}
              onChange={handleChange("dueDate")}
              sx={{ flex: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>

          {/* Preview da tarefa */}
          {formData.title && formData.assignedTo && formData.category && (
            <Box
              sx={{
                backgroundColor: "#f8f9fa",
                borderRadius: 2,
                p: 2,
                border: "1px dashed #ddd",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 1, display: "block" }}
              >
                Prévia da tarefa:
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {formData.title}
                </Typography>
                {formData.priority === "alta" && (
                  <Chip
                    label="!"
                    size="small"
                    color="error"
                    sx={{ height: 16, fontSize: 10 }}
                  />
                )}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  sx={{
                    width: 16,
                    height: 16,
                    bgcolor: categories.find(
                      (c) => c.value === formData.category
                    )?.color,
                    "& .MuiSvgIcon-root": { fontSize: 12 },
                  }}
                >
                  {categories.find((c) => c.value === formData.category)?.icon}
                </Avatar>
                <Typography variant="caption">{formData.assignedTo}</Typography>
                <Chip
                  label={formData.priority}
                  size="small"
                  sx={{
                    height: 16,
                    fontSize: 10,
                    backgroundColor: priorities.find(
                      (p) => p.value === formData.priority
                    )?.color,
                    color: "white",
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1 }}>
        <Button onClick={handleClose} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            !formData.title || !formData.assignedTo || !formData.category
          }
        >
          Criar Tarefa
        </Button>
      </DialogActions>
    </Dialog>
  );
}
