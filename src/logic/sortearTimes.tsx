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
// CALCULAR FORÇA
// =====================================================

function calcularForca(time: Time): number {
  return time.jogadores.reduce((total, jogador) => total + jogador.estrelas, 0);
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
  // VALIDAÇÃO
  // ===================================================

  if (jogadoresPorTime <= 0) {
    return [];
  }

  if (jogadores.length === 0) {
    return goleiros.map((goleiro) => ({
      goleiro,
      jogadores: [],
    }));
  }

  // ===================================================
  // CRIAR TIMES PRINCIPAIS
  // ===================================================
  //
  // Cada goleiro = 1 time.
  //
  // ===================================================

  const times: Time[] = goleiros.map((goleiro) => ({
    goleiro,
    jogadores: [],
  }));

  // ===================================================
  // SE NÃO HOUVER GOLEIROS
  // ===================================================

  if (times.length === 0) {
    times.push({
      goleiro: null,
      jogadores: [],
    });
  }

  // ===================================================
  // EMBARALHAR
  // ===================================================

  const jogadoresEmbaralhados = embaralhar(jogadores);

  // ===================================================
  // ORDENAR POR ESTRELAS
  // ===================================================
  //
  // Os jogadores mais fortes entram primeiro.
  //
  // ===================================================

  jogadoresEmbaralhados.sort((a, b) => b.estrelas - a.estrelas);

  // ===================================================
  // DISTRIBUIR JOGADORES
  // ===================================================

  jogadoresEmbaralhados.forEach((jogador) => {
    let melhorTime = -1;

    let menorQuantidade = Infinity;

    let menorForca = Infinity;

    // =================================================
    // PROCURAR O TIME MAIS ADEQUADO
    // =================================================

    times.forEach((time, index) => {
      const quantidade = time.jogadores.length;

      const forca = calcularForca(time);

      // -----------------------------------------------
      // TIME CHEIO
      // -----------------------------------------------

      if (quantidade >= jogadoresPorTime) {
        return;
      }

      // -----------------------------------------------
      // PRIMEIRO CRITÉRIO:
      // MENOR QUANTIDADE
      // -----------------------------------------------

      if (quantidade < menorQuantidade) {
        menorQuantidade = quantidade;
        menorForca = forca;
        melhorTime = index;

        return;
      }

      // -----------------------------------------------
      // SEGUNDO CRITÉRIO:
      // MENOR FORÇA
      // -----------------------------------------------

      if (quantidade === menorQuantidade && forca < menorForca) {
        menorForca = forca;
        melhorTime = index;
      }
    });

    // =================================================
    // ENCONTROU UM TIME COM ESPAÇO
    // =================================================

    if (melhorTime !== -1) {
      times[melhorTime].jogadores.push(jogador);

      return;
    }

    // =================================================
    // TODOS OS TIMES ESTÃO CHEIOS
    // =================================================
    //
    // Criar novo time sem goleiro.
    //
    // =================================================

    times.push({
      goleiro: null,
      jogadores: [jogador],
    });
  });

  // ===================================================
  // RETORNAR
  // ===================================================

  return times;
}
