"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function AddShoppingListForm({ open, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    items: [{ name: "", note: "" }],
  });
  const [currentItem, setCurrentItem] = useState("");
  const [currentNote, setCurrentNote] = useState("");

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const addItem = () => {
    if (!currentItem.trim()) return;

    const newItem = {
      id: Date.now(),
      name: currentItem.trim(),
      note: currentNote.trim(),
      completed: false,
    };

    setFormData({
      ...formData,
      items: [...formData.items, newItem],
    });

    setCurrentItem("");
    setCurrentNote("");
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: newItems,
    });
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || formData.items.length === 0) {
      return;
    }

    const newShoppingList = {
      id: Date.now(),
      title: formData.title,
      createdBy: "Usuário", // Você pode pegar do contexto de autenticação
      status: "pendente",
      items: formData.items.map((item, index) => ({
        ...item,
        id: Date.now() + index,
      })),
      comments: [],
    };

    onAdd(newShoppingList);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: "",
      items: [],
    });
    setCurrentItem("");
    setCurrentNote("");
    onClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addItem();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          🛒
          <Typography variant="h6" component="span">
            Nova Lista de Compras
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nome da lista"
            fullWidth
            value={formData.title}
            onChange={handleChange("title")}
            placeholder="Ex: Compras da semana, Festa de aniversário..."
            required
          />

          <Divider />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
              Adicionar itens
            </Typography>

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}
            >
              <TextField
                label="Item"
                value={currentItem}
                onChange={(e) => setCurrentItem(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ex: Leite, Pão, Ovos..."
                size="small"
              />
              <TextField
                label="Observação (opcional)"
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ex: Marca específica, quantidade..."
                size="small"
              />
              <Button
                variant="outlined"
                onClick={addItem}
                disabled={!currentItem.trim()}
                startIcon={<AddIcon />}
                size="small"
              >
                Adicionar item
              </Button>
            </Box>

            {formData.items.length > 0 && (
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: "bold" }}
                >
                  Itens da lista ({formData.items.length})
                </Typography>
                <List
                  dense
                  sx={{
                    bgcolor: "#f8f9fa",
                    borderRadius: 1,
                    maxHeight: 200,
                    overflow: "auto",
                  }}
                >
                  {formData.items.map((item, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={item.name}
                        secondary={
                          item.note && (
                            <Alert
                              severity="info"
                              sx={{
                                mt: 0.5,
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
                      <ListItemSecondaryAction>
                        <IconButton
                          size="small"
                          onClick={() => removeItem(index)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
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
          disabled={!formData.title.trim() || formData.items.length === 0}
        >
          Criar Lista
        </Button>
      </DialogActions>
    </Dialog>
  );
}
