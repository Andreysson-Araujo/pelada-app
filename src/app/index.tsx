import * as Clipboard from "expo-clipboard";
import { useState } from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { sortearTimes } from "../logic/sortearTimes";

export default function Home() {
  // Quantidade de jogadores por time
  const [jogadoresPorTime, setJogadoresPorTime] = useState(5);

  // Texto digitado nos campos
  const [goleiros, setGoleiros] = useState("");
  const [jogadores, setJogadores] = useState("");

  // Times gerados pelo algoritmo
  const [times, setTimes] = useState<
    { goleiros: string; jogadores: string[] }[]
  >([]);

  function separarTimes() {
    const listaGoleiros = goleiros
      .split("\n")
      .map((nome) => nome.trim())
      .filter((nome) => nome !== "");

    const listaJogadores = jogadores
      .split("\n")
      .map((nome) => nome.trim())
      .filter((nome) => nome !== "");

    if (listaJogadores.length === 0) {
      console.log("Nenhum jogador foi informado.");
      return;
    }

    const resultado = sortearTimes(
      listaJogadores,
      listaGoleiros,
      jogadoresPorTime,
    );

    setTimes(resultado);

    console.log("TIMES:", resultado);
  }

  async function copiarTimes() {
    if (times.length === 0) {
      console.log("Nenhum time foi gerado.");
      return;
    }

    let texto = "⚽ PELADA\n\n";

    times.forEach((time, index) => {
      texto += `TIME ${index + 1}\n`;

      texto += `🧤 ${time.goleiros}\n`;

      time.jogadores.forEach((jogador) => {
        texto += `⚽ ${jogador}\n`;
      });

      texto += "\n";
    });

    await Clipboard.setStringAsync(texto);

    console.log("Times copiados!");
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* TÍTULO */}

      <Text style={styles.titulo}>⚽ PELADA DOS MORTOS 🧟</Text>

      {/* JOGADORES POR TIME */}

      <Text style={styles.titulo}>Jogadores por time</Text>

      <View style={styles.contador}>
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

        <Text style={styles.numeroJogadores}>{jogadoresPorTime}</Text>

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

      {/* GOLEIROS */}

      <Text style={styles.subtitulo}>Goleiros</Text>

      <TextInput
        style={styles.input}
        placeholder="Um goleiro por linha..."
        placeholderTextColor="#888"
        multiline
        value={goleiros}
        onChangeText={setGoleiros}
      />

      {/* JOGADORES DE LINHA */}

      <Text style={styles.subtitulo}>Jogadores de linha</Text>

      <TextInput
        style={styles.inputGrande}
        placeholder="Um jogador por linha..."
        placeholderTextColor="#888"
        multiline
        value={jogadores}
        onChangeText={setJogadores}
      />

      {/* BOTÃO SEPARAR */}

      <Pressable style={styles.botao} onPress={separarTimes}>
        <Text style={styles.textoBotao}>⚽ SEPARAR TIMES</Text>
      </Pressable>

      {/* RESULTADO DOS TIMES */}

      {times.length > 0 && (
        <View style={styles.resultado}>
          <Text style={styles.tituloResultado}>TIMES</Text>

          {times.map((time, index) => (
            <View key={index} style={styles.cardTime}>
              <Text style={styles.nomeTime}>TIME {index + 1}</Text>
              <Text style={styles.jogador}>🥅 Goleiro: {time.goleiros}</Text>

              {time.jogadores.map((jogador, jogadorIndex) => (
                <Text key={jogadorIndex} style={styles.jogador}>
                  ⚽ {jogador}
                </Text>
              ))}
            </View>
          ))}

          <Pressable style={styles.botao} onPress={copiarTimes}>
            <Text style={styles.textoBotao}>📋 COPIAR TIMES</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0B3D20",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 40,
  },

  subtitulo: {
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },

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
    fontSize: 18,
    marginBottom: 8,
  },
});
