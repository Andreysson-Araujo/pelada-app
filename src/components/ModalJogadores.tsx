import { useState } from "react";

import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

type Jogador = {
  id: string;
  nome: string;
  estrelas: number;
  goleiro: boolean;
};

type Props = {
  visivel: boolean;
  jogadores: Jogador[];
  selecionados: string[];
  onSelecionar: (id: string) => void;
  onFechar: () => void;
};

export default function ModalJogadores({
  visivel,
  jogadores,
  selecionados,
  onSelecionar,
  onFechar,
}: Props) {
  // =====================================================
  // ESTADOS
  // =====================================================

  const [busca, setBusca] = useState("");

  // null = todos
  // 1 = ⭐
  // 2 = ⭐⭐
  // 3 = ⭐⭐⭐
  // 4 = ⭐⭐⭐⭐
  // 5 = ⭐⭐⭐⭐⭐

  const [filtroEstrelas, setFiltroEstrelas] = useState<number | null>(null);

  // =====================================================
  // FILTRAR JOGADORES
  // =====================================================

  const jogadoresFiltrados = jogadores.filter((jogador) => {
    // ---------------------------------------------------
    // BUSCA POR NOME
    // ---------------------------------------------------

    const correspondeBusca = jogador.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    // ---------------------------------------------------
    // FILTRO POR ESTRELAS
    // ---------------------------------------------------

    const correspondeEstrelas =
      filtroEstrelas === null || jogador.estrelas === filtroEstrelas;

    // ---------------------------------------------------
    // OS DOIS FILTROS PRECISAM SER ATENDIDOS
    // ---------------------------------------------------

    return correspondeBusca && correspondeEstrelas;
  });

  // =====================================================
  // LIMPAR FILTROS
  // =====================================================

  function limparFiltros() {
    setBusca("");
    setFiltroEstrelas(null);
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="slide"
      onRequestClose={onFechar}
    >
      <View style={styles.fundo}>
        <View style={styles.modal}>
          {/* ================================================= */}
          {/* CABEÇALHO */}
          {/* ================================================= */}

          <View style={styles.cabecalho}>
            <Text style={styles.titulo}>👥 JOGADORES</Text>

            <Pressable onPress={onFechar}>
              <Text style={styles.fechar}>✕</Text>
            </Pressable>
          </View>

          {/* ================================================= */}
          {/* PESQUISA */}
          {/* ================================================= */}

          <TextInput
            style={styles.input}
            placeholder="🔍 Procurar jogador..."
            placeholderTextColor="#888"
            value={busca}
            onChangeText={setBusca}
          />

          {/* ================================================= */}
          {/* FILTRO DE ESTRELAS */}
          {/* ================================================= */}

          <Text style={styles.labelFiltro}>FILTRAR POR NÍVEL</Text>

          <View style={styles.filtros}>
            {/* ------------------------------------------------ */}
            {/* TODOS */}
            {/* ------------------------------------------------ */}

            <Pressable
              style={[
                styles.filtro,
                filtroEstrelas === null && styles.filtroAtivo,
              ]}
              onPress={() => setFiltroEstrelas(null)}
            >
              <Text
                style={[
                  styles.textoFiltro,
                  filtroEstrelas === null && styles.textoFiltroAtivo,
                ]}
              >
                TODOS
              </Text>
            </Pressable>

            {/* ------------------------------------------------ */}
            {/* FILTROS DE ESTRELAS */}
            {/* ------------------------------------------------ */}

            {[1, 2, 3, 4, 5].map((quantidade) => {
              const ativo = filtroEstrelas === quantidade;

              return (
                <Pressable
                  key={quantidade}
                  style={[styles.filtro, ativo && styles.filtroAtivo]}
                  onPress={() => setFiltroEstrelas(quantidade)}
                >
                  <Text
                    style={[
                      styles.textoFiltro,
                      ativo && styles.textoFiltroAtivo,
                    ]}
                  >
                    {"⭐".repeat(quantidade)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* ================================================= */}
          {/* FILTROS ATIVOS */}
          {/* ================================================= */}

          {(busca.length > 0 || filtroEstrelas !== null) && (
            <View style={styles.filtroSelecionado}>
              <Text style={styles.filtroSelecionadoTexto}>
                {jogadoresFiltrados.length} jogador
                {jogadoresFiltrados.length !== 1 ? "es" : ""}
              </Text>

              <Pressable onPress={limparFiltros}>
                <Text style={styles.limpar}>LIMPAR</Text>
              </Pressable>
            </View>
          )}

          {/* ================================================= */}
          {/* LISTA DE JOGADORES */}
          {/* ================================================= */}

          <ScrollView style={styles.lista} showsVerticalScrollIndicator={false}>
            {jogadoresFiltrados.map((jogador) => {
              const selecionado = selecionados.includes(jogador.id);

              return (
                <Pressable
                  key={jogador.id}
                  style={[
                    styles.jogador,
                    selecionado && styles.jogadorSelecionado,
                  ]}
                  onPress={() => onSelecionar(jogador.id)}
                >
                  <View style={styles.informacoes}>
                    {/* ------------------------------------------------ */}
                    {/* NOME */}
                    {/* ------------------------------------------------ */}

                    <Text style={styles.nome}>
                      {selecionado ? "☑" : "☐"} {jogador.goleiro ? "🧤" : "⚽"}{" "}
                      {jogador.nome}
                    </Text>

                    {/* ------------------------------------------------ */}
                    {/* ESTRELAS */}
                    {/* ------------------------------------------------ */}

                    <Text style={styles.estrelas}>
                      {"⭐".repeat(jogador.estrelas)}
                    </Text>
                  </View>
                </Pressable>
              );
            })}

            {/* ================================================= */}
            {/* NENHUM RESULTADO */}
            {/* ================================================= */}

            {jogadoresFiltrados.length === 0 && (
              <View style={styles.semResultado}>
                <Text style={styles.iconeNenhum}>🔎</Text>

                <Text style={styles.nenhum}>Nenhum jogador encontrado.</Text>

                <Pressable style={styles.botaoLimpar} onPress={limparFiltros}>
                  <Text style={styles.textoBotaoLimpar}>LIMPAR FILTROS</Text>
                </Pressable>
              </View>
            )}
          </ScrollView>

          {/* ================================================= */}
          {/* RODAPÉ */}
          {/* ================================================= */}

          <View style={styles.rodape}>
            <Text style={styles.contador}>
              {selecionados.length} selecionado
              {selecionados.length !== 1 ? "s" : ""}
            </Text>

            <Pressable style={styles.botao} onPress={onFechar}>
              <Text style={styles.textoBotao}>CONFIRMAR</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// =====================================================
// ESTILOS
// =====================================================

const styles = {
  // ===================================================
  // FUNDO
  // ===================================================

  fundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center" as const,
    padding: 20,
  },

  // ===================================================
  // MODAL
  // ===================================================

  modal: {
    backgroundColor: "#0B3D20",
    borderRadius: 20,
    padding: 20,
    maxHeight: "85%" as const,
  },

  // ===================================================
  // CABEÇALHO
  // ===================================================

  cabecalho: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    marginBottom: 20,
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold" as const,
  },

  fechar: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold" as const,
  },

  // ===================================================
  // INPUT
  // ===================================================

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
  },

  // ===================================================
  // FILTRO
  // ===================================================

  labelFiltro: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold" as const,
    marginBottom: 8,
    opacity: 0.8,
  },

  // ===================================================
  // CONTAINER DOS FILTROS
  // ===================================================

  filtros: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 8,
    marginBottom: 12,
  },

  // ===================================================
  // BOTÃO DO FILTRO
  // ===================================================

  filtro: {
    backgroundColor: "#146B3A",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: "#2B8050",
  },

  // ===================================================
  // FILTRO ATIVO
  // ===================================================

  filtroAtivo: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },

  // ===================================================
  // TEXTO DO FILTRO
  // ===================================================

  textoFiltro: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold" as const,
  },

  textoFiltroAtivo: {
    color: "#0B3D20",
  },

  // ===================================================
  // FILTRO SELECIONADO
  // ===================================================

  filtroSelecionado: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    backgroundColor: "#092E18",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },

  filtroSelecionadoTexto: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold" as const,
  },

  limpar: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold" as const,
  },

  // ===================================================
  // LISTA
  // ===================================================

  lista: {
    marginBottom: 15,
  },

  // ===================================================
  // JOGADOR
  // ===================================================

  jogador: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },

  jogadorSelecionado: {
    backgroundColor: "#D9F2E3",
  },

  informacoes: {
    flexDirection: "column" as const,
  },

  // ===================================================
  // NOME
  // ===================================================

  nome: {
    color: "#0B3D20",
    fontSize: 17,
    fontWeight: "bold" as const,
  },

  // ===================================================
  // ESTRELAS
  // ===================================================

  estrelas: {
    fontSize: 15,
    marginTop: 4,
  },

  // ===================================================
  // SEM RESULTADO
  // ===================================================

  semResultado: {
    alignItems: "center" as const,
    paddingVertical: 25,
  },

  iconeNenhum: {
    fontSize: 30,
    marginBottom: 8,
  },

  nenhum: {
    color: "#FFFFFF",
    textAlign: "center" as const,
    fontSize: 15,
    marginBottom: 12,
  },

  // ===================================================
  // BOTÃO LIMPAR
  // ===================================================

  botaoLimpar: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 8,
  },

  textoBotaoLimpar: {
    color: "#0B3D20",
    fontSize: 12,
    fontWeight: "bold" as const,
  },

  // ===================================================
  // RODAPÉ
  // ===================================================

  rodape: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.3)",
    paddingTop: 15,
  },

  contador: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center" as const,
  },

  // ===================================================
  // BOTÃO CONFIRMAR
  // ===================================================

  botao: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center" as const,
  },

  textoBotao: {
    color: "#0B3D20",
    fontSize: 17,
    fontWeight: "bold" as const,
  },
};
