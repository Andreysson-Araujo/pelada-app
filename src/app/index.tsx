import { useEffect, useRef, useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Clipboard from "expo-clipboard";

import { router } from "expo-router";

import { sortearTimes } from "../logic/sortearTimes";

import { styles } from "../styles/homeStyles";

import ModalJogadores from "../components/ModalJogadores";

// =====================================================
// TIPOS
// =====================================================

type Jogador = {
  id: string;
  nome: string;
  estrelas: number;
  goleiro: boolean;
};

type JogadorTime = {
  nome: string;
  estrelas: number;
};

type Time = {
  goleiro: JogadorTime | null;
  jogadores: JogadorTime[];
};

// =====================================================
// HOME
// =====================================================

export default function Home() {
  // ===================================================
  // REFERÊNCIA DA TELA
  // ===================================================

  const scrollViewRef = useRef<ScrollView>(null);

  // ===================================================
  // QUANTIDADE DE JOGADORES POR TIME
  // ===================================================

  const [jogadoresPorTime, setJogadoresPorTime] = useState(5);

  // ===================================================
  // JOGADORES ADICIONAIS
  // ===================================================

  const [goleiros, setGoleiros] = useState("");

  const [jogadores, setJogadores] = useState("");

  // ===================================================
  // JOGADORES CADASTRADOS
  // ===================================================

  const [jogadoresCadastrados, setJogadoresCadastrados] = useState<Jogador[]>(
    [],
  );

  // ===================================================
  // JOGADORES SELECIONADOS
  // ===================================================

  const [jogadoresSelecionados, setJogadoresSelecionados] = useState<string[]>(
    [],
  );

  // ===================================================
  // MODAL
  // ===================================================

  const [modalJogadores, setModalJogadores] = useState(false);

  // ===================================================
  // TIMES
  // ===================================================

  const [times, setTimes] = useState<Time[]>([]);

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
        const lista: Jogador[] = JSON.parse(dados);

        setJogadoresCadastrados(lista);
      }
    } catch (error) {
      console.log("Erro ao carregar jogadores:", error);
    }
  }

  // ===================================================
  // SELECIONAR / DESELECIONAR JOGADOR
  // ===================================================

  function selecionarJogador(id: string) {
    if (jogadoresSelecionados.includes(id)) {
      setJogadoresSelecionados(
        jogadoresSelecionados.filter((jogadorId) => jogadorId !== id),
      );
    } else {
      setJogadoresSelecionados([...jogadoresSelecionados, id]);
    }
  }

  // ===================================================
  // COPIAR TIMES
  // ===================================================

  async function copiarTimes() {
    if (times.length === 0) {
      return;
    }

    let texto = "⚽ TIMES DA PELADA ⚽\n\n";

    times.forEach((time, index) => {
      texto += `🏆 TIME ${index + 1}\n`;

      // -----------------------------------------------
      // GOLEIRO
      // -----------------------------------------------

      if (time.goleiro) {
        texto += `🧤 ${time.goleiro.nome} ${"⭐".repeat(
          time.goleiro.estrelas,
        )}\n`;
      }

      // -----------------------------------------------
      // JOGADORES
      // -----------------------------------------------

      time.jogadores.forEach((jogador) => {
        texto += `⚽ ${jogador.nome} ${"⭐".repeat(jogador.estrelas)}\n`;
      });

      texto += "\n";
    });

    // -----------------------------------------------
    // COPIAR PARA ÁREA DE TRANSFERÊNCIA
    // -----------------------------------------------

    await Clipboard.setStringAsync(texto);

    Alert.alert(
      "Copiado! ⚽",
      "Os times foram copiados. Agora é só colar no grupo.",
    );
  }

  // ===================================================
  // SEPARAR TIMES
  // ===================================================

  function separarTimes() {
    // -----------------------------------------------
    // JOGADORES CADASTRADOS SELECIONADOS
    // -----------------------------------------------

    const selecionados = jogadoresCadastrados.filter((jogador) =>
      jogadoresSelecionados.includes(jogador.id),
    );

    // -----------------------------------------------
    // JOGADORES DE LINHA CADASTRADOS
    // -----------------------------------------------

    const jogadoresBase = selecionados
      .filter((jogador) => !jogador.goleiro)
      .map((jogador) => ({
        nome: jogador.nome,
        estrelas: jogador.estrelas,
      }));

    // -----------------------------------------------
    // GOLEIROS CADASTRADOS
    // -----------------------------------------------

    const goleirosBase = selecionados
      .filter((jogador) => jogador.goleiro)
      .map((jogador) => ({
        nome: jogador.nome,
        estrelas: jogador.estrelas,
      }));

    // -----------------------------------------------
    // JOGADORES ADICIONAIS
    // RECEBEM 1 ESTRELA
    // -----------------------------------------------

    const jogadoresAdicionais = jogadores
      .split("\n")
      .map((nome) => nome.trim())
      .filter((nome) => nome !== "")
      .map((nome) => ({
        nome,
        estrelas: 1,
      }));

    // -----------------------------------------------
    // GOLEIROS ADICIONAIS
    // RECEBEM 1 ESTRELA
    // -----------------------------------------------

    const goleirosAdicionais = goleiros
      .split("\n")
      .map((nome) => nome.trim())
      .filter((nome) => nome !== "")
      .map((nome) => ({
        nome,
        estrelas: 1,
      }));

    // -----------------------------------------------
    // JUNTAR JOGADORES
    // -----------------------------------------------

    const todosJogadores = [...jogadoresBase, ...jogadoresAdicionais];

    const todosGoleiros = [...goleirosBase, ...goleirosAdicionais];

    // -----------------------------------------------
    // VERIFICAR JOGADORES
    // -----------------------------------------------

    if (todosJogadores.length === 0) {
      Alert.alert("Atenção", "Adicione pelo menos um jogador de linha.");

      return;
    }

    // -----------------------------------------------
    // SORTEAR TIMES
    // -----------------------------------------------

    const resultado = sortearTimes(
      todosJogadores,
      todosGoleiros,
      jogadoresPorTime,
    );

    // -----------------------------------------------
    // MOSTRAR RESULTADO
    // -----------------------------------------------

    setTimes(resultado);

    console.log("TIMES:", resultado);

    // -----------------------------------------------
    // ROLAR AUTOMATICAMENTE PARA O RESULTADO
    // -----------------------------------------------

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  }

  // ===================================================
  // TELA
  // ===================================================

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* ============================================= */}
      {/* TÍTULO */}
      {/* ============================================= */}

      <Text style={styles.titulo}>⚽ PELADA DOS MORTOS 🧟</Text>

      {/* ============================================= */}
      {/* SELECIONAR JOGADORES */}
      {/* ============================================= */}

      <Pressable
        style={styles.botaoJogadores}
        onPress={() => setModalJogadores(true)}
      >
        <Text style={styles.textoBotaoJogadores}>👥 SELECIONAR JOGADORES</Text>

        <Text style={styles.quantidadeSelecionados}>
          {jogadoresSelecionados.length} selecionado
          {jogadoresSelecionados.length !== 1 ? "s" : ""}
        </Text>
      </Pressable>

      {/* ============================================= */}
      {/* GERENCIAR JOGADORES */}
      {/* ============================================= */}

      <Pressable
        style={styles.botaoGerenciar}
        onPress={() => router.push("/jogadores")}
      >
        <Text style={styles.textoGerenciar}>⚙️ GERENCIAR JOGADORES</Text>
      </Pressable>

      {/* ============================================= */}
      {/* QUANTIDADE DE JOGADORES */}
      {/* ============================================= */}

      <Text style={styles.titulo}>Jogadores por time (sem goleiro)</Text>

      <View style={styles.contador}>
        {/* DIMINUIR */}

        <Pressable
          style={styles.botaoContador}
          onPress={() => {
            if (jogadoresPorTime > 1) {
              setJogadoresPorTime(jogadoresPorTime - 1);
            }
          }}
        >
          <Text style={styles.textoContador}>−</Text>
        </Pressable>

        {/* NÚMERO */}

        <Text style={styles.numeroJogadores}>{jogadoresPorTime}</Text>

        {/* AUMENTAR */}

        <Pressable
          style={styles.botaoContador}
          onPress={() => {
            if (jogadoresPorTime < 11) {
              setJogadoresPorTime(jogadoresPorTime + 1);
            }
          }}
        >
          <Text style={styles.textoContador}>+</Text>
        </Pressable>
      </View>

      {/* ============================================= */}
      {/* GOLEIROS ADICIONAIS */}
      {/* ============================================= */}

      <Text style={styles.subtitulo}>Goleiros adicionais</Text>

      <TextInput
        style={styles.input}
        placeholder="Um goleiro por linha..."
        placeholderTextColor="#888"
        multiline
        value={goleiros}
        onChangeText={setGoleiros}
      />

      {/* ============================================= */}
      {/* JOGADORES ADICIONAIS */}
      {/* ============================================= */}

      <Text style={styles.subtitulo}>Jogadores adicionais</Text>

      <TextInput
        style={styles.inputGrande}
        placeholder="Um jogador por linha..."
        placeholderTextColor="#888"
        multiline
        value={jogadores}
        onChangeText={setJogadores}
      />

      {/* ============================================= */}
      {/* BOTÃO SEPARAR */}
      {/* ============================================= */}

      <Pressable style={styles.botao} onPress={separarTimes}>
        <Text style={styles.textoBotao}>⚽ SEPARAR TIMES</Text>
      </Pressable>

      {/* ============================================= */}
      {/* RESULTADO */}
      {/* ============================================= */}

      {times.length > 0 && (
        <View style={styles.resultado}>
          <Text style={styles.tituloResultado}>TIMES</Text>

          {/* ========================================= */}
          {/* TIMES */}
          {/* ========================================= */}

          {times.map((time, index) => (
            <View key={index} style={styles.cardTime}>
              {/* NOME DO TIME */}

              <Text style={styles.nomeTime}>TIME {index + 1}</Text>

              {/* ================================= */}
              {/* GOLEIRO */}
              {/* ================================= */}

              {time.goleiro && (
                <Text style={styles.jogador}>
                  🧤 {time.goleiro.nome}
                  {"  "}
                  {"⭐".repeat(time.goleiro.estrelas)}
                </Text>
              )}

              {/* ================================= */}
              {/* JOGADORES */}
              {/* ================================= */}

              {time.jogadores.map((jogador, jogadorIndex) => (
                <Text key={jogadorIndex} style={styles.jogador}>
                  ⚽ {jogador.nome}
                  {"  "}
                  {"⭐".repeat(jogador.estrelas)}
                </Text>
              ))}
            </View>
          ))}

          {/* ========================================= */}
          {/* BOTÃO COPIAR TIMES */}
          {/* ========================================= */}

          <Pressable style={styles.botaoCopiar} onPress={copiarTimes}>
            <Text style={styles.textoBotaoCopiar}>📋 COPIAR TIMES</Text>
          </Pressable>
        </View>
      )}

      {/* ============================================= */}
      {/* MODAL DE JOGADORES */}
      {/* ============================================= */}

      <ModalJogadores
        visivel={modalJogadores}
        jogadores={jogadoresCadastrados}
        selecionados={jogadoresSelecionados}
        onSelecionar={selecionarJogador}
        onFechar={() => setModalJogadores(false)}
      />
    </ScrollView>
  );
}
