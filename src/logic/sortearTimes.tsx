type Jogador = {
  nome: string;
  estrelas: number;
};

type Time = {
  goleiro: Jogador | null;
  jogadores: Jogador[];
};

// =====================================================
// EMBARALHAR
// =====================================================

function embaralhar<T>(lista: T[]): T[] {
  return [...lista].sort(() => Math.random() - 0.5);
}

// =====================================================
// SORTEAR TIMES
// =====================================================

export function sortearTimes(
  jogadores: Jogador[],

  goleiros: Jogador[],

  jogadoresPorTime: number,
): Time[] {
  // ===================================================
  // QUANTIDADE DE TIMES
  // ===================================================

  const quantidadeTimes = Math.ceil(jogadores.length / jogadoresPorTime);

  // ===================================================
  // CRIAR TIMES
  // ===================================================

  const times: Time[] = Array.from(
    {
      length: quantidadeTimes,
    },

    () => ({
      goleiro: null,
      jogadores: [],
    }),
  );

  // ===================================================
  // EMBARALHAR JOGADORES
  // ===================================================

  const jogadoresEmbaralhados = embaralhar(jogadores);

  // ===================================================
  // ORDENAR POR ESTRELAS
  //
  // Os melhores jogadores são
  // distribuídos primeiro.
  // ===================================================

  jogadoresEmbaralhados.sort((a, b) => b.estrelas - a.estrelas);

  // ===================================================
  // DISTRIBUIR JOGADORES
  // ===================================================

  jogadoresEmbaralhados.forEach((jogador) => {
    let melhorTime = -1;

    let menorForca = Infinity;

    times.forEach((time, index) => {
      // Quantidade atual
      const quantidade = time.jogadores.length;

      // Força atual
      const forca = time.jogadores.reduce(
        (total, jogadorAtual) => {
          return total + jogadorAtual.estrelas;
        },

        0,
      );

      // -----------------------------------------
      // Só pode receber se ainda tiver espaço
      // -----------------------------------------

      if (quantidade >= jogadoresPorTime) {
        return;
      }

      // -----------------------------------------
      // Procurar o time mais fraco
      // -----------------------------------------

      if (forca < menorForca) {
        menorForca = forca;

        melhorTime = index;
      }
    });

    // ---------------------------------------------
    // Adicionar jogador
    // ---------------------------------------------

    if (melhorTime !== -1) {
      times[melhorTime].jogadores.push(jogador);
    }
  });

  // ===================================================
  // DISTRIBUIR GOLEIROS
  // ===================================================

  const goleirosEmbaralhados = embaralhar(goleiros);

  goleirosEmbaralhados.forEach((goleiro, index) => {
    const timeIndex = index % times.length;

    times[timeIndex].goleiro = goleiro;
  });

  // ===================================================
  // RETORNAR
  // ===================================================

  return times;
}
