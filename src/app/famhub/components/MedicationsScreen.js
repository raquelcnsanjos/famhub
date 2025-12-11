"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Fab,
  Alert,
  LinearProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import MedicationIcon from "@mui/icons-material/Medication";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { useState } from "react";
import { mockMedications } from "../data/mockData";
import AddMedicationForm from "./AddMedicationForm";

export default function MedicationsScreen() {
  const [medications, setMedications] = useState(mockMedications);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleTakeMedication = (medId) => {
    // Simular tomar medicamento
    setMedications((prev) =>
      prev.map((med) =>
        med.id === medId ? { ...med, nextDose: getNextDoseTime(med) } : med
      )
    );
  };

  const getNextDoseTime = (medication) => {
    const now = new Date();
    const hoursToAdd = medication.frequency.includes("12") ? 12 : 24;
    now.setHours(now.getHours() + hoursToAdd);
    return now.toISOString().slice(0, 16).replace("T", " ");
  };

  const isTimeToTake = (medication) => {
    if (!medication.nextDose) return false;
    const nextDoseTime = new Date(medication.nextDose.replace(" ", "T"));
    const now = new Date();
    return now >= nextDoseTime;
  };

  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const activeMedications = medications.filter((med) => med.status === "ativo");

  const handleAddMedication = (newMedication) => {
    setMedications((prev) => [...prev, newMedication]);
  };

  return (
    <Box sx={{ p: 2, pb: 10 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 1, color: "#1976d2" }}
        >
          Medicamentos 💊
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Acompanhe os horários de medicação da família
        </Typography>
      </Box>

      {/* Alertas de medicamentos urgentes */}
      {activeMedications.some((med) => isTimeToTake(med)) && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          icon={<NotificationImportantIcon />}
        >
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Hora do medicamento! Ana deve tomar Dipirona agora.
          </Typography>
        </Alert>
      )}

      {/* Lista de medicamentos ativos */}
      {activeMedications.map((medication) => (
        <Card key={medication.id} sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {medication.name}
                </Typography>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Avatar sx={{ width: 24, height: 24, bgcolor: "#e3f2fd" }}>
                    <PersonIcon sx={{ fontSize: 14, color: "#1565c0" }} />
                  </Avatar>
                  <Typography variant="body2">{medication.patient}</Typography>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Avatar sx={{ width: 24, height: 24, bgcolor: "#fff3e0" }}>
                    <MedicationIcon sx={{ fontSize: 14, color: "#ef6c00" }} />
                  </Avatar>
                  <Typography variant="body2">
                    {medication.dosage} - {medication.frequency}
                  </Typography>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Avatar sx={{ width: 24, height: 24, bgcolor: "#f3e5f5" }}>
                    <AccessTimeIcon sx={{ fontSize: 14, color: "#7b1fa2" }} />
                  </Avatar>
                  <Typography variant="body2">
                    Horários: {medication.times.join(", ")}
                  </Typography>
                </Box>

                {/* Progress do tratamento */}
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{ mb: 1, display: "block" }}
                  >
                    Progresso do tratamento
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={65}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#f0f0f0",
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    {getDaysRemaining(medication.endDate)} dias restantes
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    label={medication.status}
                    color="success"
                    size="small"
                  />
                  {isTimeToTake(medication) && (
                    <Chip
                      label="Hora de tomar!"
                      color="error"
                      size="small"
                      sx={{ animation: "pulse 1s infinite" }}
                    />
                  )}
                </Box>
              </Box>
            </Box>

            {isTimeToTake(medication) && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleTakeMedication(medication.id)}
                sx={{ mt: 2 }}
              >
                Marcar como tomado
              </Button>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Medicamentos pausados/finalizados */}
      <Card sx={{ bgcolor: "#f8f9fa" }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2, color: "text.secondary" }}
          >
            📚 Histórico
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", py: 2 }}
          >
            Nenhum medicamento no histórico ainda
          </Typography>
        </CardContent>
      </Card>

      {/* Botão para adicionar medicamento */}
      <Fab
        color="primary"
        onClick={() => setShowAddForm(true)}
        sx={{
          position: "fixed",
          bottom: 80,
          right: 16,
        }}
        size="medium"
      >
        <AddIcon />
      </Fab>

      {/* Formulário para adicionar medicamento */}
      <AddMedicationForm
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        onAdd={handleAddMedication}
      />

      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
}
