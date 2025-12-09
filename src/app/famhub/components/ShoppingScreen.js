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
  Fab,
  TextField,
  Button,
  Chip,
  Avatar,
  Divider,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CommentIcon from "@mui/icons-material/Comment";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import { mockShoppingLists } from "../data/mockData";

export default function ShoppingScreen() {
  const [lists, setLists] = useState(mockShoppingLists);
  const [comment, setComment] = useState("");

  const handleItemToggle = (listId, itemId) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : list
      )
    );
  };

  const handleAddComment = (listId) => {
    if (!comment.trim()) return;

    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              comments: [
                ...list.comments,
                {
                  id: Date.now(),
                  author: "Fabrício Neves",
                  text: comment,
                  timestamp: new Date().toLocaleString("pt-BR"),
                },
              ],
            }
          : list
      )
    );
    setComment("");
  };

  const getListProgress = (list) => {
    const completed = list.items.filter((item) => item.completed).length;
    return Math.round((completed / list.items.length) * 100);
  };

  return (
    <Box sx={{ p: 2, pb: 10 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 1, color: "#1976d2" }}
        >
          Lista de Compras 🛒
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Organize as compras da família
        </Typography>
      </Box>

      {lists.map((list) => {
        const progress = getListProgress(list);
        const isCompleted = progress === 100;

        return (
          <Card key={list.id} sx={{ mb: 3 }}>
            <CardContent sx={{ p: 2 }}>
              {/* Header da lista */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {list.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <Avatar sx={{ width: 20, height: 20, bgcolor: "#e3f2fd" }}>
                      <PersonIcon sx={{ fontSize: 12, color: "#1565c0" }} />
                    </Avatar>
                    <Typography variant="caption" color="text.secondary">
                      Criada por {list.createdBy}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ textAlign: "right" }}>
                  <Chip
                    label={`${progress}%`}
                    color={isCompleted ? "success" : "primary"}
                    size="small"
                    icon={
                      isCompleted ? <CheckCircleIcon /> : <ShoppingCartIcon />
                    }
                  />
                  <Typography
                    variant="caption"
                    display="block"
                    color="text.secondary"
                  >
                    {list.items.filter((item) => item.completed).length}/
                    {list.items.length} itens
                  </Typography>
                </Box>
              </Box>

              {/* Lista de itens */}
              <List dense>
                {list.items.map((item) => (
                  <ListItem
                    key={item.id}
                    sx={{
                      px: 0,
                      backgroundColor: item.completed ? "#e8f5e8" : "#fff",
                      borderRadius: 1,
                      mb: 0.5,
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={item.completed}
                        onChange={() => handleItemToggle(list.id, item.id)}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: item.completed
                              ? "line-through"
                              : "none",
                            opacity: item.completed ? 0.7 : 1,
                          }}
                        >
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        item.note && (
                          <Alert
                            severity="info"
                            sx={{
                              mt: 1,
                              "& .MuiAlert-message": {
                                fontSize: "11px",
                                py: 0,
                              },
                            }}
                          >
                            {item.note}
                          </Alert>
                        )
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              {/* Seção de comentários */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  💬 Comentários
                </Typography>

                {list.comments.map((comment) => (
                  <Box
                    key={comment.id}
                    sx={{
                      backgroundColor: "#f8f9fa",
                      borderRadius: 2,
                      p: 1.5,
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                        {comment.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {comment.timestamp}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{comment.text}</Typography>
                  </Box>
                ))}

                {/* Adicionar comentário */}
                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  <TextField
                    size="small"
                    placeholder="Adicionar comentário..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAddComment(list.id)}
                    disabled={!comment.trim()}
                    startIcon={<CommentIcon />}
                  >
                    Enviar
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })}

      {/* Botão para criar nova lista */}
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
