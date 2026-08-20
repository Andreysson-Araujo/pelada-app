export function sortearTimes(
  jogadores: string[],
  goleiros: string[],
  jogadoresPorTime: number,
) {
  // Copia a lista para não alterar a lista original
  const jogadoresEmbaralhados = [...jogadores];

  // Embaralha os jogadores
  jogadoresEmbaralhados.sort(() => Math.random() - 0.5);

  // Descobre quantos times serão necessários
  const quantidadeTimes = Math.ceil(
    jogadoresEmbaralhados.length / jogadoresPorTime,
  );

  // Cria os times
  const times: {
    goleiros: string;
    jogadores: string[];
  }[] = [];

  for (let i = 0; i < quantidadeTimes; i++) {
    const goleiro =
      goleiros.length > 0 ? goleiros[i % goleiros.length] : "Sem Goleiros";
    times.push({
      goleiros: goleiro,
      jogadores: [],
    });
  }

  // Distribui os jogadores de Linha
  jogadoresEmbaralhados.forEach((jogador, index) => {
    const numeroDoTime = index % quantidadeTimes;

    times[numeroDoTime].jogadores.push(jogador);
  });

  return times;
}
