"use client";

import { Box } from "@mui/material";

export default function FamHubLayout({ children }) {
  return (
    <Box
    // sx={{
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   minHeight: "100vh",
    //   backgroundColor: "#f0f2f5",
    //   padding: 2,
    // }}
    >
      {/* Simulador de celular */}
      <Box
      // sx={{
      //   width: 375,
      //   height: 812,
      //   backgroundColor: "#000",
      //   borderRadius: "30px",
      //   padding: "8px",
      //   boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      //   position: "relative",
      // }}
      >
        {/* Tela do celular */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            borderRadius: "22px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Status bar */}
          <Box
            sx={{
              height: 44,
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            <Box color={"black"}>9:41</Box>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Box>📶</Box>
              <Box>📶</Box>
              <Box>🔋</Box>
            </Box>
          </Box>

          {/* Conteúdo da app */}
          <Box
            sx={{
              height: "calc(100% - 44px)",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
