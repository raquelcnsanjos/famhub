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
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { mockFamily } from "../data/mockData";

export default function AddMedicationForm({ open, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    patient: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    times: [""],
    status: "ativo",
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleTimeChange = (index, value) => {
    const newTimes = [...formData.times];
    newTimes[index] = value;
    setFormData({
      ...formData,
      times: newTimes,
    });
  };

  const addTimeSlot = () => {
    setFormData({
      ...formData,
      times: [...formData.times, ""],
    });
  };

  const removeTimeSlot = (index) => {
    if (formData.times.length > 1) {
      const newTimes = formData.times.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        times: newTimes,
      });
    }
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.patient ||
      !formData.dosage ||
      !formData.frequency ||
      !formData.startDate
    ) {
      return;
    }

    const validTimes = formData.times.filter((time) => time !== "");
    if (validTimes.length === 0) {
      return;
    }

    const newMedication = {
      id: Date.now(),
      ...formData,
      times: validTimes,
      nextDose: formData.startDate + " " + validTimes[0],
    };

    onAdd(newMedication);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      patient: "",
      dosage: "",
      frequency: "",
      startDate: "",
      endDate: "",
      times: [""],
      status: "ativo",
    });
    onClose();
  };

  const frequencyOptions = [
    "1x ao dia",
    "2x ao dia",
    "3x ao dia",
    "12 em 12 horas",
    "8 em 8 horas",
    "6 em 6 horas",
    "De acordo com a necessidade",
    "Diariamente",
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          💊
          <Typography variant="h6" component="span">
            Novo Medicamento
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nome do medicamento"
            fullWidth
            value={formData.name}
            onChange={handleChange("name")}
            placeholder="Ex: Paracetamol, Dipirona..."
            required
          />

          <FormControl fullWidth required>
            <InputLabel>Paciente</InputLabel>
            <Select
              value={formData.patient}
              onChange={handleChange("patient")}
              label="Paciente"
            >
              {mockFamily.members.map((member) => (
                <MenuItem key={member.id} value={member.name}>
                  {member.avatar} {member.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Dosagem"
              value={formData.dosage}
              onChange={handleChange("dosage")}
              placeholder="Ex: 10ml, 1 comprimido..."
              sx={{ flex: 1 }}
              required
            />
            <FormControl sx={{ flex: 1 }} required>
              <InputLabel>Frequência</InputLabel>
              <Select
                value={formData.frequency}
                onChange={handleChange("frequency")}
                label="Frequência"
              >
                {frequencyOptions.map((freq) => (
                  <MenuItem key={freq} value={freq}>
                    {freq}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Data de início"
              type="date"
              value={formData.startDate}
              onChange={handleChange("startDate")}
              sx={{ flex: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              label="Data de fim"
              type="date"
              value={formData.endDate}
              onChange={handleChange("endDate")}
              sx={{ flex: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
              Horários de administração
            </Typography>
            {formData.times.map((time, index) => (
              <Box
                key={index}
                sx={{ display: "flex", gap: 1, mb: 1, alignItems: "center" }}
              >
                <TextField
                  label={`Horário ${index + 1}`}
                  type="time"
                  value={time}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                  sx={{ flex: 1 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {formData.times.length > 1 && (
                  <Button
                    color="error"
                    onClick={() => removeTimeSlot(index)}
                    sx={{ minWidth: "auto", px: 1 }}
                  >
                    ✕
                  </Button>
                )}
              </Box>
            ))}
            <Button
              variant="outlined"
              size="small"
              onClick={addTimeSlot}
              sx={{ mt: 1 }}
            >
              + Adicionar horário
            </Button>
          </Box>
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
            !formData.name ||
            !formData.patient ||
            !formData.dosage ||
            !formData.frequency ||
            !formData.startDate
          }
        >
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
