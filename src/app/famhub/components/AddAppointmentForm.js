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
} from "@mui/material";
import { useState } from "react";
import { mockFamily } from "../data/mockData";

export default function AddAppointmentForm({ open, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    member: "",
    type: "",
    location: "",
    status: "agendado",
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.date ||
      !formData.time ||
      !formData.member
    ) {
      return;
    }

    const newAppointment = {
      id: Date.now(),
      ...formData,
    };

    onAdd(newAppointment);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      member: "",
      type: "",
      location: "",
      status: "agendado",
    });
    onClose();
  };

  const appointmentTypes = [
    { value: "medical", label: "Médico", color: "#f44336" },
    { value: "school", label: "Escola", color: "#2196f3" },
    { value: "work", label: "Trabalho", color: "#4caf50" },
    { value: "personal", label: "Pessoal", color: "#ff9800" },
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          📅
          <Typography variant="h6" component="span">
            Novo Compromisso
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Título do compromisso"
            fullWidth
            value={formData.title}
            onChange={handleChange("title")}
            placeholder="Ex: Consulta médica, Reunião..."
            required
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Data"
              type="date"
              value={formData.date}
              onChange={handleChange("date")}
              sx={{ flex: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              label="Horário"
              type="time"
              value={formData.time}
              onChange={handleChange("time")}
              sx={{ flex: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Box>

          <FormControl fullWidth required>
            <InputLabel>Membro da família</InputLabel>
            <Select
              value={formData.member}
              onChange={handleChange("member")}
              label="Membro da família"
            >
              {mockFamily.members.map((member) => (
                <MenuItem key={member.id} value={member.name}>
                  {member.avatar} {member.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Tipo de compromisso</InputLabel>
            <Select
              value={formData.type}
              onChange={handleChange("type")}
              label="Tipo de compromisso"
            >
              {appointmentTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      size="small"
                      sx={{
                        backgroundColor: type.color,
                        color: "white",
                        width: 12,
                        height: 12,
                        "& .MuiChip-label": { px: 0 },
                      }}
                      label=""
                    />
                    {type.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Local (opcional)"
            fullWidth
            value={formData.location}
            onChange={handleChange("location")}
            placeholder="Ex: Clínica, Escola, Escritório..."
          />
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
            !formData.title ||
            !formData.date ||
            !formData.time ||
            !formData.member
          }
        >
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
