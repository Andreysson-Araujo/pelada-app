import { useEffect, useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";

import { styles } from "../styles/jogadoresStyles";

// =====================================================
// TIPO DO JOGADOR
// =====================================================

type Jogador = {
  id: string;
  nome: string;
  estrelas: number;
  goleiro: boolean;
};

// =====================================================
// TELA DE JOGADORES
// =====================================================

export default function Jogadores() {
  // ===================================================
  // LISTA DE JOGADORES
  // ===================================================

  const [jogadores, setJogadores] = useState<Jogador[]>([]);

  // ===================================================
  // NOME
  // ===================================================

  const [nome, setNome] = useState("");

  // ===================================================
  // ESTRELAS
  // ===================================================

  const [estrelas, setEstrelas] = useState(3);

  // ===================================================
  // GOLEIRO
  // ===================================================

  const [goleiro, setGoleiro] = useState(false);

  // ===================================================
  // JOGADOR SENDO EDITADO
  // ===================================================

  const [jogadorEditando, setJogadorEditando] = useState<string | null>(null);

  // ===================================================
  // CARREGAR JOGADORES
  // ===================================================

  useEffect(() => {
    carregarJogadores();
  }, []);

  async function carregarJogadores() {
    try {
      const dados = await AsyncStorage.getItem("jogadores");

      if (dados) {
        setJogadores(JSON.parse(dados));
      }
    } catch (error) {
      console.log("Erro ao carregar jogadores:", error);
    }
  }

  // ===================================================
  // SALVAR LISTA
  // ===================================================

  async function salvarJogadores(novaLista: Jogador[]) {
    try {
      await AsyncStorage.setItem("jogadores", JSON.stringify(novaLista));

      setJogadores(novaLista);
    } catch (error) {
      console.log("Erro ao salvar jogadores:", error);

      Alert.alert("Erro", "Não foi possível salvar os jogadores.");
    }
  }

  // ===================================================
  // LIMPAR FORMULÁRIO
  // ===================================================

  function limparFormulario() {
    setNome("");

    setEstrelas(3);

    setGoleiro(false);

    setJogadorEditando(null);
  }

  // ===================================================
  // CADASTRAR / EDITAR
  // ===================================================

  async function salvarJogador() {
    const nomeLimpo = nome.trim();

    // -----------------------------------------------
    // VERIFICAR NOME
    // -----------------------------------------------

    if (!nomeLimpo) {
      Alert.alert("Atenção", "Digite o nome do jogador.");

      return;
    }

    // =================================================
    // EDITANDO
    // =================================================

    if (jogadorEditando) {
      const novaLista = jogadores.map((jogador) => {
        if (jogador.id === jogadorEditando) {
          return {
            ...jogador,

            nome: nomeLimpo,

            estrelas,

            goleiro,
          };
        }

        return jogador;
      });

      await salvarJogadores(novaLista);

      Alert.alert("Sucesso", "Jogador atualizado!");

      limparFormulario();

      return;
    }

    // =================================================
    // NOVO JOGADOR
    // =================================================

    const jogadorExistente = jogadores.some(
      (jogador) => jogador.nome.toLowerCase() === nomeLimpo.toLowerCase(),
    );

    if (jogadorExistente) {
      Alert.alert("Atenção", "Esse jogador já está cadastrado.");

      return;
    }

    const novoJogador: Jogador = {
      id: Date.now().toString(),

      nome: nomeLimpo,

      estrelas,

      goleiro,
    };

    const novaLista = [...jogadores, novoJogador];

    await salvarJogadores(novaLista);

    limparFormulario();
  }

  // ===================================================
  // EDITAR
  // ===================================================

  function editarJogador(jogador: Jogador) {
    setNome(jogador.nome);

    setEstrelas(jogador.estrelas);

    setGoleiro(jogador.goleiro);

    setJogadorEditando(jogador.id);
  }

  // ===================================================
  // EXCLUIR
  // ===================================================

  function excluirJogador(jogador: Jogador) {
    Alert.alert(
      "Excluir jogador",

      `Deseja realmente excluir ${jogador.nome}?`,

      [
        // -------------------------------------------
        // CANCELAR
        // -------------------------------------------

        {
          text: "Cancelar",

          style: "cancel",
        },

        // -------------------------------------------
        // EXCLUIR
        // -------------------------------------------

        {
          text: "Excluir",

          style: "destructive",

          onPress: async () => {
            try {
              const novaLista = jogadores.filter(
                (item) => item.id !== jogador.id,
              );

              await AsyncStorage.setItem(
                "jogadores",

                JSON.stringify(novaLista),
              );

              setJogadores(novaLista);

              // Se estava editando
              // esse jogador,
              // limpa o formulário.

              if (jogadorEditando === jogador.id) {
                limparFormulario();
              }
            } catch (error) {
              console.log("Erro ao excluir jogador:", error);

              Alert.alert(
                "Erro",

                "Não foi possível excluir o jogador.",
              );
            }
          },
        },
      ],
    );
  }

  // ===================================================
  // ESTRELAS
  // ===================================================

  function renderEstrelas(quantidade: number) {
    return "⭐".repeat(quantidade);
  }

  // ===================================================
  // TELA
  // ===================================================

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* ============================================= */}
      {/* VOLTAR */}
      {/* ============================================= */}

      <Pressable style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.textoVoltar}>← VOLTAR</Text>
      </Pressable>

      {/* ============================================= */}
      {/* TÍTULO */}
      {/* ============================================= */}

      <Text style={styles.titulo}>👥 JOGADORES</Text>

      {/* ============================================= */}
      {/* FORMULÁRIO */}
      {/* ============================================= */}

      <View style={styles.formulario}>
        <Text style={styles.subtitulo}>
          {jogadorEditando ? "Editar jogador" : "Novo jogador"}
        </Text>

        {/* NOME */}

        <TextInput
          style={styles.input}
          placeholder="Nome do jogador"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
        />

        {/* ========================================= */}
        {/* ESTRELAS */}
        {/* ========================================= */}

        <Text style={styles.label}>Nível do jogador</Text>

        <View style={styles.estrelasContainer}>
          {[1, 2, 3, 4, 5].map((numero) => (
            <Pressable key={numero} onPress={() => setEstrelas(numero)}>
              <Text style={styles.estrela}>
                {numero <= estrelas ? "⭐" : "☆"}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* ========================================= */}
        {/* GOLEIRO */}
        {/* ========================================= */}

        <Pressable
          style={[styles.botaoGoleiro, goleiro && styles.botaoGoleiroAtivo]}
          onPress={() => setGoleiro(!goleiro)}
        >
          <Text
            style={[styles.textoGoleiro, goleiro && styles.textoGoleiroAtivo]}
          >
            🧤 {goleiro ? "GOLEIRO" : "JOGADOR DE LINHA"}
          </Text>
        </Pressable>

        {/* ========================================= */}
        {/* SALVAR */}
        {/* ========================================= */}

        <Pressable style={styles.botaoSalvar} onPress={salvarJogador}>
          <Text style={styles.textoBotaoSalvar}>
            {jogadorEditando ? "💾 SALVAR ALTERAÇÕES" : "➕ CADASTRAR JOGADOR"}
          </Text>
        </Pressable>

        {/* ========================================= */}
        {/* CANCELAR EDIÇÃO */}
        {/* ========================================= */}

        {jogadorEditando && (
          <Pressable style={styles.botaoCancelar} onPress={limparFormulario}>
            <Text style={styles.textoCancelar}>CANCELAR EDIÇÃO</Text>
          </Pressable>
        )}
      </View>

      {/* ============================================= */}
      {/* LISTA */}
      {/* ============================================= */}

      <Text style={styles.tituloLista}>Jogadores cadastrados</Text>

      {jogadores.length === 0 && (
        <Text style={styles.nenhumJogador}>Nenhum jogador cadastrado.</Text>
      )}

      {/* ============================================= */}
      {/* CARDS */}
      {/* ============================================= */}

      {jogadores.map((jogador) => (
        <View key={jogador.id} style={styles.cardJogador}>
          {/* INFORMAÇÕES */}

          <View style={styles.infoJogador}>
            <Text style={styles.nomeJogador}>
              {jogador.goleiro ? "🧤 " : "⚽ "}

              {jogador.nome}
            </Text>

            <Text style={styles.estrelasJogador}>
              {renderEstrelas(jogador.estrelas)}
            </Text>

            <Text style={styles.tipoJogador}>
              {jogador.goleiro ? "Goleiro" : "Jogador de linha"}
            </Text>
          </View>

          {/* BOTÕES */}

          <View style={styles.acoes}>
            {/* EDITAR */}

            <Pressable
              style={styles.botaoEditar}
              onPress={() => editarJogador(jogador)}
            >
              <Text style={styles.textoAcao}>✏️</Text>
            </Pressable>

            {/* EXCLUIR */}

            <Pressable
              style={styles.botaoExcluir}
              onPress={() => excluirJogador(jogador)}
            >
              <Text style={styles.textoAcao}>🗑️</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
