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
  const [busca, setBusca] = useState("");

  const jogadoresFiltrados = jogadores.filter((jogador) =>
    jogador.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="slide"
      onRequestClose={onFechar}
    >
      <View style={styles.fundo}>
        <View style={styles.modal}>
          {/* CABEÇALHO */}

          <View style={styles.cabecalho}>
            <Text style={styles.titulo}>👥 JOGADORES</Text>

            <Pressable onPress={onFechar}>
              <Text style={styles.fechar}>✕</Text>
            </Pressable>
          </View>

          {/* PESQUISA */}

          <TextInput
            style={styles.input}
            placeholder="🔍 Procurar jogador..."
            placeholderTextColor="#888"
            value={busca}
            onChangeText={setBusca}
          />

          {/* LISTA */}

          <ScrollView style={styles.lista}>
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
                  <View>
                    <Text style={styles.nome}>
                      {selecionado ? "☑" : "☐"} {jogador.goleiro ? "🧤" : "⚽"}{" "}
                      {jogador.nome}
                    </Text>

                    <Text style={styles.estrelas}>
                      {"⭐".repeat(jogador.estrelas)}
                    </Text>
                  </View>
                </Pressable>
              );
            })}

            {jogadoresFiltrados.length === 0 && (
              <Text style={styles.nenhum}>Nenhum jogador encontrado.</Text>
            )}
          </ScrollView>

          {/* RODAPÉ */}

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

const styles = {
  fundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center" as const,
    padding: 20,
  },

  modal: {
    backgroundColor: "#0B3D20",
    borderRadius: 20,
    padding: 20,
    maxHeight: "85%" as const,
  },

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

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
  },

  lista: {
    marginBottom: 15,
  },

  jogador: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },

  jogadorSelecionado: {
    backgroundColor: "#D9F2E3",
  },

  nome: {
    color: "#0B3D20",
    fontSize: 17,
    fontWeight: "bold" as const,
  },

  estrelas: {
    fontSize: 15,
    marginTop: 4,
  },

  nenhum: {
    color: "#FFFFFF",
    textAlign: "center" as const,
    padding: 20,
  },

  rodape: {
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF",
    paddingTop: 15,
  },

  contador: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center" as const,
  },

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
