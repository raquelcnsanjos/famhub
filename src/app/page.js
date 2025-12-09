"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  CircularProgress,
  Chip,
  Stack,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnterApp = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/famhub");
    }, 800);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Logo */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                width: 96,
                height: 96,
                mx: "auto",
                mb: 3,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
              }}
            >
              <HomeIcon sx={{ fontSize: 48, color: "white" }} />
            </Box>

            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: "bold",
                color: "#333",
                mb: 1,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              FamHub
            </Typography>

            <Typography variant="h6" sx={{ color: "#666", fontWeight: 300 }}>
              Gerenciador Familiar
            </Typography>
          </Box>

          {/* Description */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="body1"
              sx={{
                color: "#555",
                mb: 3,
                lineHeight: 1.6,
                fontSize: "1.1rem",
              }}
            >
              Organize a rotina da sua família de forma simples e eficiente
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              flexWrap="wrap"
              sx={{ gap: 1 }}
            >
              <Chip
                icon={<span>📅</span>}
                label="Agenda"
                size="small"
                variant="outlined"
                sx={{ borderColor: "#667eea", color: "#667eea" }}
              />
              <Chip
                icon={<span>💊</span>}
                label="Medicamentos"
                size="small"
                variant="outlined"
                sx={{ borderColor: "#667eea", color: "#667eea" }}
              />
              <Chip
                icon={<span>✅</span>}
                label="Tarefas"
                size="small"
                variant="outlined"
                sx={{ borderColor: "#667eea", color: "#667eea" }}
              />
              <Chip
                icon={<span>🛒</span>}
                label="Compras"
                size="small"
                variant="outlined"
                sx={{ borderColor: "#667eea", color: "#667eea" }}
              />
            </Stack>
          </Box>

          {/* CTA Button */}
          <Button
            onClick={handleEnterApp}
            disabled={isLoading}
            variant="contained"
            size="large"
            endIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <ArrowForwardIcon />
              )
            }
            sx={{
              py: 2,
              px: 4,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: 3,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
              },
              "&:disabled": {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                opacity: 0.7,
              },
              transition: "all 0.3s ease",
            }}
            fullWidth
          >
            {isLoading ? "Carregando..." : "Acessar o FamHub"}
          </Button>

          {/* Footer */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="caption" color="text.secondary">
              Protótipo desenvolvido para PIU - UFRN
            </Typography>
            <br />
            <Typography variant="caption" color="text.secondary">
              Dezembro 2025
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
