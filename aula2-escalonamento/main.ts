import { Estados } from "./estados.enum";

class Processo {
  pid: string;
  estado: Estados;
  tempoRestante: number;

  constructor() {
    this.pid = this.gerarPidAleatorio();
    this.estado = Estados.Novo;
    this.tempoRestante = Math.floor(5 + Math.random() * 10);
  }

  private gerarPidAleatorio(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  mostrar(): void {
    console.log(
      `PID: ${this.pid}, Estado: ${this.estado}, Tempo Restante: ${this.tempoRestante}`
    );
  }
}

const NUMERO_DE_PROCESSOS = 5;
let processos = inicializarProcessos(NUMERO_DE_PROCESSOS);
let EXISTE_PROCESSO_EXECUTANDO = false;
const QUANTUM = 3;

function inicializarProcessos(n: number): Processo[] {
  return Array.from({ length: n }, () => {
    return new Processo();
  });
}

let iteracoes = 0;
while (!todosProcessosForamTerminados(processos)) {
  iteracoes = iteracoes + 1;
  console.log(`\n-- Iteração ${iteracoes} --`);

  processos.map((processo) => {
    const alterarEstado = Math.random();
    if (alterarEstado < 0.5) {
      proximoEstado(processo);
    }
    if (processo.estado == Estados.Executando) {
      console.log(
        `PID: ${processo.pid}, Estado: ${processo.estado}, Tempo Restante: ${processo.tempoRestante}`
      );
      processo.tempoRestante = processo.tempoRestante - QUANTUM;

      if (processo.tempoRestante <= 0) {
        processo.tempoRestante = 0;
        processo.estado = Estados.Terminado;
      } else {
        processo.estado = Estados.Pronto;
      }
    } else {
      processo.mostrar();
    }

    EXISTE_PROCESSO_EXECUTANDO = false;
  });
}

function proximoEstado(processo: Processo) {
  if (processo.estado == Estados.Novo) {
    processo.estado = Estados.Pronto;
  } else if (processo.estado == Estados.Pronto) {
    const probabilidadeExecutar = Math.random();
    if (probabilidadeExecutar < 0.5) {
      if (EXISTE_PROCESSO_EXECUTANDO == false) {
        processo.estado = Estados.Executando;
        EXISTE_PROCESSO_EXECUTANDO = true;
      }
    } else {
      processo.estado = Estados.Bloqueado;
    }
  } else if (processo.estado == Estados.Bloqueado) {
    processo.estado = Estados.Pronto;
  }
}

console.log(
  `\nTodos processos foram finalizados! Total de ${iteracoes} iterações.`
);

function todosProcessosForamTerminados(processos: Processo[]): boolean {
  for (let i = 0; i < processos.length; i++) {
    if (processos[i].estado != Estados.Terminado) {
      return false;
    }
  }
  return true;
}
