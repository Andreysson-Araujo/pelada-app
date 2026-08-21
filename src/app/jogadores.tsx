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

import { styles } from "../styles/jogadoresStyles";

// =====================================================
// TIPO DO JOGADOR
// =====================================================

type Jogador = {
  id: string;
  nome: string;
  estrelas: number;
  goleiro: boolean;
  gols: number;
  assistencias: number;
};

// =====================================================
// TELA DE JOGADORES
// =====================================================

export default function Jogadores() {
  // ===================================================
  // REFERÊNCIA DO SCROLL
  // ===================================================

  const scrollRef = useRef<ScrollView>(null);

  // ===================================================
  // LISTA DE JOGADORES
  // ===================================================

  const [jogadores, setJogadores] = useState<Jogador[]>([]);

  // ===================================================
  // FORMULÁRIO
  // ===================================================

  const [nome, setNome] = useState("");

  const [estrelas, setEstrelas] = useState(3);

  const [goleiro, setGoleiro] = useState(false);

  // ===================================================
  // JOGADOR SENDO EDITADO
  // ===================================================

  const [jogadorEditando, setJogadorEditando] = useState<string | null>(null);

  // ===================================================
  // PESQUISA
  // ===================================================

  const [busca, setBusca] = useState("");

  // ===================================================
  // FILTRO DE ESTRELAS
  // null = todos
  // ===================================================

  const [filtroEstrelas, setFiltroEstrelas] = useState<number | null>(null);

  // ===================================================
  // IMPORTAÇÃO
  // ===================================================

  const [mostrarImportacao, setMostrarImportacao] = useState(false);

  const [textoImportacao, setTextoImportacao] = useState("");

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
        const lista = JSON.parse(dados);

        const listaCorrigida = lista.map((jogador: Jogador) => ({
          ...jogador,
          gols: jogador.gols ?? 0,
          assistencias: jogador.assistencias ?? 0,
        }));

        setJogadores(listaCorrigida);

        await AsyncStorage.setItem("jogadores", JSON.stringify(listaCorrigida));
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
            gols: jogador.gols ?? 0,
            assistencias: jogador.assistencias ?? 0,
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
    // VERIFICAR DUPLICADO
    // =================================================

    const jogadorExistente = jogadores.some(
      (jogador) => jogador.nome.toLowerCase() === nomeLimpo.toLowerCase(),
    );

    if (jogadorExistente) {
      Alert.alert("Atenção", "Esse jogador já está cadastrado.");

      return;
    }

    // =================================================
    // NOVO JOGADOR
    // =================================================

    const novoJogador: Jogador = {
      id: Date.now().toString(),

      nome: nomeLimpo,

      estrelas,

      goleiro,

      gols: 0,

      assistencias: 0,
    };

    const novaLista = [...jogadores, novoJogador];

    await salvarJogadores(novaLista);

    limparFormulario();
  }

  // ===================================================
  // EDITAR
  // ===================================================

  function editarJogador(jogador: Jogador) {
    // -----------------------------------------------
    // CARREGAR DADOS NO FORMULÁRIO
    // -----------------------------------------------

    setNome(jogador.nome);

    setEstrelas(jogador.estrelas);

    setGoleiro(jogador.goleiro);

    setJogadorEditando(jogador.id);

    // -----------------------------------------------
    // SUBIR PARA O FORMULÁRIO
    // -----------------------------------------------

    setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }, 100);
  }

  // ===================================================
  // EXCLUIR
  // ===================================================

  function excluirJogador(jogador: Jogador) {
    Alert.alert(
      "Excluir jogador",

      `Deseja realmente excluir ${jogador.nome}?`,

      [
        {
          text: "Cancelar",
          style: "cancel",
        },

        {
          text: "Excluir",

          style: "destructive",

          onPress: async () => {
            try {
              const novaLista = jogadores.filter(
                (item) => item.id !== jogador.id,
              );

              await salvarJogadores(novaLista);

              if (jogadorEditando === jogador.id) {
                limparFormulario();
              }
            } catch (error) {
              console.log("Erro ao excluir jogador:", error);

              Alert.alert("Erro", "Não foi possível excluir o jogador.");
            }
          },
        },
      ],
    );
  }

  // ===================================================
  // ALTERAR GOLS
  // ===================================================

  async function alterarGols(jogador: Jogador, quantidade: number) {
    const novaQuantidade = Math.max(0, (jogador.gols ?? 0) + quantidade);

    const novaLista = jogadores.map((item) => {
      if (item.id === jogador.id) {
        return {
          ...item,
          gols: novaQuantidade,
        };
      }

      return item;
    });

    await salvarJogadores(novaLista);
  }

  // ===================================================
  // ALTERAR ASSISTÊNCIAS
  // ===================================================

  async function alterarAssistencias(jogador: Jogador, quantidade: number) {
    const novaQuantidade = Math.max(
      0,
      (jogador.assistencias ?? 0) + quantidade,
    );

    const novaLista = jogadores.map((item) => {
      if (item.id === jogador.id) {
        return {
          ...item,
          assistencias: novaQuantidade,
        };
      }

      return item;
    });

    await salvarJogadores(novaLista);
  }

  // ===================================================
  // ESTRELAS
  // ===================================================

  function renderEstrelas(quantidade: number) {
    return "⭐".repeat(quantidade);
  }

  // ===================================================
  // EXPORTAR JOGADORES
  // ===================================================

  async function exportarJogadores() {
    if (jogadores.length === 0) {
      Alert.alert("Atenção", "Não existem jogadores para exportar.");

      return;
    }

    let texto = "";

    texto += "⚽ PELADA APP\n";

    texto += "📋 LISTA DE JOGADORES\n";

    texto += "━━━━━━━━━━━━━━━━━━━━\n\n";

    jogadores.forEach((jogador) => {
      texto +=
        `👤 ${jogador.nome} | ` +
        `⭐ ${jogador.estrelas} | ` +
        `${jogador.goleiro ? "GOLEIRO" : "LINHA"} | ` +
        `⚽ ${jogador.gols ?? 0} | ` +
        `🅰️ ${jogador.assistencias ?? 0}\n`;
    });

    texto += "\n";

    texto += "━━━━━━━━━━━━━━━━━━━━\n";

    texto += "🔐 PELADA_APP_V1";

    try {
      await Clipboard.setStringAsync(texto);

      Alert.alert(
        "Lista exportada!",
        "A lista foi copiada. Agora você pode colar no WhatsApp e enviar para outro celular.",
      );
    } catch (error) {
      console.log("Erro ao exportar:", error);

      Alert.alert("Erro", "Não foi possível copiar a lista.");
    }
  }

  // ===================================================
  // ABRIR IMPORTAÇÃO
  // ===================================================

  function abrirImportacao() {
    setTextoImportacao("");

    setMostrarImportacao(true);
  }

  // ===================================================
  // IMPORTAR JOGADORES
  // ===================================================

  async function importarJogadores() {
    if (!textoImportacao.trim()) {
      Alert.alert("Atenção", "Cole a lista de jogadores primeiro.");

      return;
    }

    // =================================================
    // VERIFICAR FORMATO
    // =================================================

    if (!textoImportacao.includes("PELADA_APP_V1")) {
      Alert.alert(
        "Lista inválida",
        "Esse texto não parece ser uma lista exportada pelo Pelada App.",
      );

      return;
    }

    try {
      const linhas = textoImportacao.split("\n");

      const jogadoresImportados: Jogador[] = [];

      // =================================================
      // LER CADA JOGADOR
      // =================================================

      for (const linha of linhas) {
        if (!linha.startsWith("👤")) {
          continue;
        }

        const partes = linha.split("|");

        if (partes.length < 5) {
          continue;
        }

        const nome = partes[0].replace("👤", "").trim();

        const estrelasTexto = partes[1].replace("⭐", "").trim();

        const estrelas = parseInt(estrelasTexto);

        const tipo = partes[2].trim();

        const golsTexto = partes[3].replace("⚽", "").trim();

        const gols = parseInt(golsTexto);

        const assistenciasTexto = partes[4].replace("🅰️", "").trim();

        const assistencias = parseInt(assistenciasTexto);

        // =============================================
        // VALIDAR
        // =============================================

        if (!nome || isNaN(estrelas)) {
          continue;
        }

        jogadoresImportados.push({
          id: Date.now().toString() + Math.random(),

          nome,

          estrelas,

          goleiro: tipo === "GOLEIRO",

          gols: isNaN(gols) ? 0 : gols,

          assistencias: isNaN(assistencias) ? 0 : assistencias,
        });
      }

      // =================================================
      // NENHUM JOGADOR
      // =================================================

      if (jogadoresImportados.length === 0) {
        Alert.alert("Erro", "Nenhum jogador válido foi encontrado.");

        return;
      }

      // =================================================
      // EVITAR DUPLICADOS
      // =================================================

      const jogadoresSemDuplicados = [...jogadores];

      for (const jogador of jogadoresImportados) {
        const jaExiste = jogadoresSemDuplicados.some(
          (existente) =>
            existente.nome.toLowerCase() === jogador.nome.toLowerCase(),
        );

        if (!jaExiste) {
          jogadoresSemDuplicados.push(jogador);
        }
      }

      // =================================================
      // SALVAR
      // =================================================

      await salvarJogadores(jogadoresSemDuplicados);

      setMostrarImportacao(false);

      setTextoImportacao("");

      Alert.alert(
        "Importação concluída!",
        `${jogadoresImportados.length} jogador(es) encontrado(s).`,
      );
    } catch (error) {
      console.log("Erro ao importar jogadores:", error);

      Alert.alert("Erro", "Não foi possível interpretar a lista.");
    }
  }

  // ===================================================
  // FILTRAR JOGADORES
  // ===================================================

  const jogadoresFiltrados = jogadores.filter((jogador) => {
    // -----------------------------------------------
    // PESQUISA POR NOME
    // -----------------------------------------------

    const correspondeNome = jogador.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    // -----------------------------------------------
    // FILTRO DE ESTRELAS
    // -----------------------------------------------

    const correspondeEstrelas =
      filtroEstrelas === null || jogador.estrelas === filtroEstrelas;

    return correspondeNome && correspondeEstrelas;
  });

  // ===================================================
  // TELA
  // ===================================================

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* =================================================
          VOLTAR
      ================================================= */}

      <Pressable style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.textoVoltar}>← VOLTAR</Text>
      </Pressable>

      {/* =================================================
          TÍTULO
      ================================================= */}

      <Text style={styles.titulo}>👥 JOGADORES</Text>

      {/* =================================================
          FORMULÁRIO
      ================================================= */}

      <View style={styles.formulario}>
        <Text style={styles.subtitulo}>
          {jogadorEditando ? "Editar jogador" : "Novo jogador"}
        </Text>

        {/* NOME */}

        <Text style={styles.label}>Nome do jogador</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do jogador"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
        />

        {/* ESTRELAS */}

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

        {/* GOLEIRO */}

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

        {/* SALVAR */}

        <Pressable style={styles.botaoSalvar} onPress={salvarJogador}>
          <Text style={styles.textoBotaoSalvar}>
            {jogadorEditando ? "💾 SALVAR ALTERAÇÕES" : "➕ CADASTRAR JOGADOR"}
          </Text>
        </Pressable>

        {/* CANCELAR */}

        {jogadorEditando && (
          <Pressable style={styles.botaoCancelar} onPress={limparFormulario}>
            <Text style={styles.textoCancelar}>CANCELAR EDIÇÃO</Text>
          </Pressable>
        )}
      </View>

      {/* =================================================
          TÍTULO DA LISTA
      ================================================= */}

      <Text style={styles.tituloLista}>Jogadores cadastrados</Text>

      {/* =================================================
          EXPORTAR / IMPORTAR
      ================================================= */}

      <View style={styles.botoesExportacao}>
        <Pressable style={styles.botaoExportar} onPress={exportarJogadores}>
          <Text style={styles.textoBotaoExportar}>📤 EXPORTAR</Text>
        </Pressable>

        <Pressable style={styles.botaoImportar} onPress={abrirImportacao}>
          <Text style={styles.textoBotaoImportar}>📥 IMPORTAR</Text>
        </Pressable>
      </View>

      {/* =================================================
          PESQUISA
      ================================================= */}

      <View style={styles.filtroContainer}>
        <TextInput
          style={styles.inputBusca}
          placeholder="🔍 Procurar jogador..."
          placeholderTextColor="#888"
          value={busca}
          onChangeText={setBusca}
        />

        {/* =================================================
            FILTRO DE ESTRELAS
        ================================================= */}

        <Text style={styles.labelFiltro}>Filtrar por nível</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtroEstrelasScroll}
          contentContainerStyle={styles.filtroEstrelasContainer}
        >
          {/* TODOS */}

          <Pressable
            style={[
              styles.botaoFiltro,

              filtroEstrelas === null && styles.botaoFiltroAtivo,
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

          {/* ESTRELAS */}

          {[1, 2, 3, 4, 5].map((numero) => (
            <Pressable
              key={numero}
              style={[
                styles.botaoFiltro,

                filtroEstrelas === numero && styles.botaoFiltroAtivo,
              ]}
              onPress={() => setFiltroEstrelas(numero)}
            >
              <Text
                style={[
                  styles.textoFiltro,

                  filtroEstrelas === numero && styles.textoFiltroAtivo,
                ]}
              >
                {"⭐".repeat(numero)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* =================================================
          ÁREA DE IMPORTAÇÃO
      ================================================= */}

      {mostrarImportacao && (
        <View style={styles.formulario}>
          <Text style={styles.subtitulo}>📥 Importar jogadores</Text>

          <Text style={styles.label}>
            Cole aqui a lista recebida pelo WhatsApp
          </Text>

          <TextInput
            style={[styles.input, styles.inputImportacao]}
            placeholder="Cole a mensagem aqui..."
            placeholderTextColor="#888"
            value={textoImportacao}
            onChangeText={setTextoImportacao}
            multiline
            textAlignVertical="top"
          />

          <Pressable style={styles.botaoSalvar} onPress={importarJogadores}>
            <Text style={styles.textoBotaoSalvar}>📥 IMPORTAR JOGADORES</Text>
          </Pressable>

          <Pressable
            style={styles.botaoCancelar}
            onPress={() => setMostrarImportacao(false)}
          >
            <Text style={styles.textoCancelar}>CANCELAR</Text>
          </Pressable>
        </View>
      )}

      {/* =================================================
          NENHUM JOGADOR
      ================================================= */}

      {jogadores.length === 0 && (
        <Text style={styles.nenhumJogador}>Nenhum jogador cadastrado.</Text>
      )}

      {/* =================================================
          NENHUM RESULTADO DO FILTRO
      ================================================= */}

      {jogadores.length > 0 && jogadoresFiltrados.length === 0 && (
        <Text style={styles.nenhumJogador}>Nenhum jogador encontrado.</Text>
      )}

      {/* =================================================
          CARDS
      ================================================= */}

      {jogadoresFiltrados.map((jogador) => (
        <View key={jogador.id} style={styles.cardJogador}>
          <View style={styles.infoJogador}>
            {/* CABEÇALHO */}

            <View style={styles.cabecalhoJogador}>
              <View style={styles.identidadeJogador}>
                <Text style={styles.nomeJogador}>
                  {jogador.goleiro ? "🧤 " : "⚽ "}

                  {jogador.nome}
                </Text>

                <View style={styles.linhaInfo}>
                  <Text style={styles.estrelasJogador}>
                    {renderEstrelas(jogador.estrelas)}
                  </Text>

                  <Text style={styles.tipoJogador}>
                    {jogador.goleiro ? "Goleiro" : "Jogador de linha"}
                  </Text>
                </View>
              </View>

              {/* EDITAR / EXCLUIR */}

              <View style={styles.acoes}>
                <Pressable
                  style={styles.botaoEditar}
                  onPress={() => editarJogador(jogador)}
                >
                  <Text style={styles.textoAcao}>✏️</Text>
                </Pressable>

                <Pressable
                  style={styles.botaoExcluir}
                  onPress={() => excluirJogador(jogador)}
                >
                  <Text style={styles.textoAcao}>🗑️</Text>
                </Pressable>
              </View>
            </View>

            {/* =================================================
                  ESTATÍSTICAS
              ================================================= */}

            <View style={styles.estatisticasContainer}>
              {/* GOLS */}

              <View style={styles.estatisticaBox}>
                <Text style={styles.tituloEstatistica}>⚽ GOLS</Text>

                <View style={styles.contadorEstatistica}>
                  <Pressable
                    style={styles.botaoMenos}
                    onPress={() => alterarGols(jogador, -1)}
                  >
                    <Text style={styles.textoContadorEstatistica}>−</Text>
                  </Pressable>

                  <Text style={styles.numeroEstatistica}>
                    {jogador.gols ?? 0}
                  </Text>

                  <Pressable
                    style={styles.botaoMais}
                    onPress={() => alterarGols(jogador, 1)}
                  >
                    <Text style={styles.textoContadorEstatistica}>+</Text>
                  </Pressable>
                </View>
              </View>

              {/* ASSISTÊNCIAS */}

              <View style={styles.estatisticaBox}>
                <Text style={styles.tituloEstatistica}>🅰️ ASSIST.</Text>

                <View style={styles.contadorEstatistica}>
                  <Pressable
                    style={styles.botaoMenos}
                    onPress={() => alterarAssistencias(jogador, -1)}
                  >
                    <Text style={styles.textoContadorEstatistica}>−</Text>
                  </Pressable>

                  <Text style={styles.numeroEstatistica}>
                    {jogador.assistencias ?? 0}
                  </Text>

                  <Pressable
                    style={styles.botaoMais}
                    onPress={() => alterarAssistencias(jogador, 1)}
                  >
                    <Text style={styles.textoContadorEstatistica}>+</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
