import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0B3D20",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 35,
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },

  // ==========================================
  // BOTÃO SELECIONAR
  // ==========================================

  botaoJogadores: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  textoBotaoJogadores: {
    color: "#0B3D20",
    fontSize: 17,
    fontWeight: "bold",
  },

  quantidadeSelecionados: {
    color: "#0B3D20",
    fontSize: 13,
    marginTop: 4,
  },

  // ==========================================
  // GERENCIAR
  // ==========================================

  botaoGerenciar: {
    backgroundColor: "#174F2D",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
  },

  textoGerenciar: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

  // ==========================================
  // CONTADOR
  // ==========================================

  contador: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  botaoContador: {
    backgroundColor: "#FFFFFF",
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  textoContador: {
    color: "#0B3D20",
    fontSize: 30,
    fontWeight: "bold",
  },

  numeroJogadores: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginHorizontal: 25,
  },

  // ==========================================
  // INPUT
  // ==========================================

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 25,
    minHeight: 60,
  },

  inputGrande: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    height: 150,
    textAlignVertical: "top",
  },

  // ==========================================
  // BOTÃO SEPARAR
  // ==========================================

  botao: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },

  textoBotao: {
    color: "#0B3D20",
    fontSize: 18,
    fontWeight: "bold",
  },

  // ==========================================
  // RESULTADO
  // ==========================================

  resultado: {
    marginTop: 40,
  },

  tituloResultado: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  cardTime: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },

  nomeTime: {
    color: "#0B3D20",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  jogador: {
    color: "#222222",
    fontSize: 17,
    marginBottom: 10,
  },
  botaoCopiar: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },

  textoBotaoCopiar: {
    color: "#0B3D20",
    fontSize: 18,
    fontWeight: "bold",
  },
});
