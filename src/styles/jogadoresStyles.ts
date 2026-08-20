import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0B3D20",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },

  // ==========================================
  // VOLTAR
  // ==========================================

  botaoVoltar: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },

  textoVoltar: {
    color: "#0B3D20",
    fontSize: 16,
    fontWeight: "bold",
  },

  // ==========================================
  // TÍTULO
  // ==========================================

  titulo: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  // ==========================================
  // FORMULÁRIO
  // ==========================================

  formulario: {
    backgroundColor: "#174F2D",
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },

  subtitulo: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 15,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
    color: "#222222",
  },

  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  // ==========================================
  // ESTRELAS
  // ==========================================

  estrelasContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  estrela: {
    fontSize: 32,
    marginRight: 5,
  },

  // ==========================================
  // GOLEIRO
  // ==========================================

  botaoGoleiro: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  botaoGoleiroAtivo: {
    backgroundColor: "#D4AF37",
  },

  textoGoleiro: {
    color: "#0B3D20",
    fontWeight: "bold",
    fontSize: 16,
  },

  textoGoleiroAtivo: {
    color: "#FFFFFF",
  },

  // ==========================================
  // SALVAR
  // ==========================================

  botaoSalvar: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  textoBotaoSalvar: {
    color: "#0B3D20",
    fontSize: 16,
    fontWeight: "bold",
  },

  // ==========================================
  // CANCELAR
  // ==========================================

  botaoCancelar: {
    marginTop: 10,
    padding: 12,
    alignItems: "center",
  },

  textoCancelar: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  // ==========================================
  // LISTA
  // ==========================================

  tituloLista: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  nenhumJogador: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },

  // ==========================================
  // CARD
  // ==========================================

  cardJogador: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  infoJogador: {
    flex: 1,
  },

  nomeJogador: {
    color: "#0B3D20",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
  },

  estrelasJogador: {
    fontSize: 17,
    marginBottom: 3,
  },

  tipoJogador: {
    color: "#666666",
    fontSize: 13,
  },

  // ==========================================
  // AÇÕES
  // ==========================================

  acoes: {
    flexDirection: "row",
    marginLeft: 10,
  },

  botaoEditar: {
    backgroundColor: "#05868f",
    width: 45,
    height: 45,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  botaoExcluir: {
    backgroundColor: "#e41e1e",
    width: 45,
    height: 45,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  textoAcao: {
    fontSize: 20,
  },
});
