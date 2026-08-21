import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // =========================================================
  // CONTAINER
  // =========================================================

  container: {
    flexGrow: 1,
    backgroundColor: "#0B3D20",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },

  // =========================================================
  // VOLTAR
  // =========================================================

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

  // =========================================================
  // TÍTULOS
  // =========================================================

  titulo: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  subtitulo: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 15,
  },

  tituloLista: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  // =========================================================
  // FORMULÁRIO
  // =========================================================

  formulario: {
    backgroundColor: "#174F2D",
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    color: "#222222",
    marginBottom: 20,
  },

  // =========================================================
  // AVALIAÇÃO / ESTRELAS
  // =========================================================

  estrelasContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  estrela: {
    fontSize: 32,
    marginRight: 5,
  },

  // =========================================================
  // GOLEIRO
  // =========================================================

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
    fontSize: 16,
    fontWeight: "bold",
  },

  textoGoleiroAtivo: {
    color: "#FFFFFF",
  },

  // =========================================================
  // BOTÕES DO FORMULÁRIO
  // =========================================================

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

  // =========================================================
  // LISTA
  // =========================================================

  nenhumJogador: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },

  // =========================================================
  // CARD DO JOGADOR
  // =========================================================

  cardJogador: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },

  cabecalhoJogador: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  identidadeJogador: {
    flex: 1,
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

  linhaInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  estrelasJogador: {
    fontSize: 17,
    marginBottom: 3,
  },

  tipoJogador: {
    color: "#666666",
    fontSize: 13,
    marginLeft: 8,
  },

  // =========================================================
  // ESTATÍSTICAS
  // =========================================================

  estatisticasContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },

  estatisticaBox: {
    flex: 1,
    backgroundColor: "#F2F5F3",
    borderRadius: 10,
    padding: 10,
  },

  estatistica: {
    marginTop: 12,
  },

  tituloEstatistica: {
    color: "#0B3D20",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
  },

  textoEstatistica: {
    color: "#0B3D20",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },

  contadorEstatistica: {
    flexDirection: "row",
    alignItems: "center",
  },

  numeroEstatistica: {
    minWidth: 45,
    color: "#0B3D20",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  // =========================================================
  // BOTÕES DE ESTATÍSTICA
  // =========================================================

  botaoMenos: {
    width: 35,
    height: 35,
    backgroundColor: "#0B3D20",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  botaoMais: {
    width: 35,
    height: 35,
    backgroundColor: "#0B3D20",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  textoContadorEstatistica: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  // =========================================================
  // AÇÕES DO JOGADOR
  // =========================================================

  acoes: {
    flexDirection: "row",
    marginLeft: 10,
  },

  botaoEditar: {
    width: 45,
    height: 45,
    backgroundColor: "#05868F",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  botaoExcluir: {
    width: 45,
    height: 45,
    backgroundColor: "#E41E1E",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  textoAcao: {
    fontSize: 20,
  },
  botoesExportacao: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  botaoExportar: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
  },

  botaoImportar: {
    flex: 1,
    backgroundColor: "#D4AF37",
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
  },

  textoBotaoExportar: {
    color: "#0B3D20",
    fontSize: 14,
    fontWeight: "bold",
  },

  textoBotaoImportar: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  inputImportacao: {
    height: 180,
    textAlignVertical: "top",
  },
});
