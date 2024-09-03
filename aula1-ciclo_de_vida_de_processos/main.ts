import { Estados } from "./estados.enum";

class Processo {
  pid: string;
  estado: Estados;

  constructor() {
    this.pid = this.gerarPidAleatorio();
    this.estado = Estados.Novo;
  }

  private gerarPidAleatorio(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  mostrar(): void {
    console.log(`PID: ${this.pid}, Estado: ${this.estado}`);
  }
}

const NUMERO_DE_PROCESSOS = 5;
let processos = inicializarProcessos(NUMERO_DE_PROCESSOS);

function inicializarProcessos(n: number): Processo[] {
  return Array.from({ length: n }, () => {
    return new Processo();
  });
}

let iteracoes = 0;
while (!todosProcessosForamTerminados(processos)) {
  processos.map((processo) => {
    const alterarEstado = Math.random();
    if (alterarEstado < 0.5) {
      proximoEstado(processo);
    }
  });
  iteracoes = iteracoes + 1;

  console.log(`\n-- Iteração ${iteracoes} --`);
  processos.forEach((processo) => {
    processo.mostrar();
  });
}

function proximoEstado(processo: Processo) {
  if (processo.estado == Estados.Novo) {
    processo.estado = Estados.Pronto;
  } else if (processo.estado == Estados.Pronto) {
    const probabilidadeExecutar = Math.random();
    if (probabilidadeExecutar < 0.5) {
      processo.estado = Estados.Executando;
    } else {
      processo.estado = Estados.Bloqueado;
    }
  } else if (processo.estado == Estados.Executando) {
    const probabilidade = Math.random();
    if (probabilidade < 0.3) {
      processo.estado = Estados.Pronto;
    } else if (probabilidade < 0.6) {
      processo.estado = Estados.Bloqueado;
    } else {
      processo.estado = Estados.Terminado;
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
