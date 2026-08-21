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
  // VALIDAÇÕES
  // ===================================================

  if (jogadoresPorTime <= 0) {
    return [];
  }

  // ===================================================
  // QUANTIDADE DE TIMES PRINCIPAIS
  // ===================================================
  //
  // Cada goleiro representa um time principal.
  //
  // Exemplo:
  //
  // 4 goleiros → 4 times principais
  // 5 goleiros → 5 times principais
  //
  // ===================================================

  const quantidadeTimesPrincipais = goleiros.length;

  // ===================================================
  // CRIAR TIMES PRINCIPAIS
  // ===================================================

  const times: Time[] = goleiros.map((goleiro) => ({
    goleiro,
    jogadores: [],
  }));

  // ===================================================
  // SE NÃO EXISTIR GOLEIRO
  // ===================================================
  //
  // Ainda podemos criar um time sem goleiro para
  // acomodar os jogadores.
  //
  // ===================================================

  if (times.length === 0 && jogadores.length > 0) {
    times.push({
      goleiro: null,
      jogadores: [],
    });
  }

  // ===================================================
  // EMBARALHAR JOGADORES
  // ===================================================

  const jogadoresEmbaralhados = embaralhar(jogadores);

  // ===================================================
  // ORDENAR POR ESTRELAS
  // ===================================================

  jogadoresEmbaralhados.sort((a, b) => b.estrelas - a.estrelas);

  // ===================================================
  // DISTRIBUIR JOGADORES NOS TIMES PRINCIPAIS
  // ===================================================

  jogadoresEmbaralhados.forEach((jogador) => {
    let melhorTime = -1;

    let menorQuantidade = Infinity;

    let menorForca = Infinity;

    // =================================================
    // PROCURAR UM TIME COM ESPAÇO
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
      // PRIMEIRO:
      // MENOR QUANTIDADE
      // -----------------------------------------------

      if (quantidade < menorQuantidade) {
        menorQuantidade = quantidade;

        menorForca = forca;

        melhorTime = index;

        return;
      }

      // -----------------------------------------------
      // SEGUNDO:
      // MENOR FORÇA
      // -----------------------------------------------

      if (quantidade === menorQuantidade && forca < menorForca) {
        menorForca = forca;

        melhorTime = index;
      }
    });

    // =================================================
    // SE ENCONTROU TIME COM ESPAÇO
    // =================================================

    if (melhorTime !== -1) {
      times[melhorTime].jogadores.push(jogador);

      return;
    }

    // =================================================
    // TODOS OS TIMES ESTÃO CHEIOS
    // =================================================
    //
    // Criar novo time SEM GOLEIRO.
    //
    // Esse time será completado posteriormente.
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
