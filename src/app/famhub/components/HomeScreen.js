"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import {
  mockFamily,
  mockAppointments,
  mockMedications,
  mockTasks,
} from "../data/mockData";

export default function HomeScreen() {
  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = mockAppointments.filter(
    (apt) => apt.date === today
  );
  const activeMedications = mockMedications.filter(
    (med) => med.status === "ativo"
  );
  const completedTasks = mockTasks.filter(
    (task) => task.status === "concluido"
  );
  const tasksProgress = (completedTasks.length / mockTasks.length) * 100;

  return (
    <Box sx={{ p: 2, pb: 10 }}>
      {/* Header com saudação */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 1, color: "#1976d2" }}
        >
          Olá, {mockFamily.members[0].name}! 👋
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Aqui está o resumo da sua família hoje
        </Typography>
      </Box>

      {/* Cards de resumo */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Card sx={{ backgroundColor: "#e8f5e8" }}>
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarTodayIcon sx={{ color: "#2e7d32", fontSize: 20 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {todayAppointments.length}
                  </Typography>
                  <Typography variant="caption">Compromissos hoje</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card sx={{ backgroundColor: "#e3f2fd" }}>
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocalPharmacyIcon sx={{ color: "#1565c0", fontSize: 20 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {activeMedications.length}
                  </Typography>
                  <Typography variant="caption">Medicamentos ativos</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progresso das tarefas */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <AssignmentIcon sx={{ color: "#f57c00" }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Tarefas de Hoje
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography variant="body2">
              {completedTasks.length}/{mockTasks.length} concluídas
            </Typography>
            <Chip
              label={`${Math.round(tasksProgress)}%`}
              size="small"
              color={tasksProgress === 100 ? "success" : "primary"}
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={tasksProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#f0f0f0",
            }}
          />
        </CardContent>
      </Card>

      {/* Próximos medicamentos */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <LocalPharmacyIcon sx={{ color: "#d32f2f" }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Próximos Medicamentos
            </Typography>
          </Box>
          <List dense>
            {activeMedications.map((med, index) => (
              <Box key={med.id}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "#ffebee" }}>
                      💊
                    </Avatar>
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
                          {med.name}
                        </Typography>
                        {med.id === 1 && (
                          <Chip
                            label="Agora!"
                            size="small"
                            color="error"
                            sx={{ height: 20 }}
                          />
                        )}
                      </Box>
                    }
                    secondary={`${med.patient} - ${med.dosage}`}
                  />
                </ListItem>
                {index < activeMedications.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Membros da família */}
      <Card>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <FamilyRestroomIcon sx={{ color: "#7b1fa2" }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Família Conectada
            </Typography>
          </Box>
          <Grid container spacing={1}>
            {mockFamily.members.map((member) => (
              <Grid item xs={6} key={member.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: 1,
                    backgroundColor: "#f8f9fa",
                    borderRadius: 2,
                  }}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {member.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                      {member.name.split(" ")[0]}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {member.role}
                    </Typography>
                  </Box>
                  {member.id === 1 && (
                    <Box sx={{ ml: "auto" }}>
                      <Chip
                        label="Online"
                        size="small"
                        color="success"
                        sx={{ height: 20 }}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
