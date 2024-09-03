import { Estados } from "./estados.enum";

class Processo {
  pid: string;
  estado: Estados;
  tempoRestante: number;

  constructor() {
    this.pid = this.gerarPidAleatorio();
    this.estado = Estados.Novo;
    this.tempoRestante = Math.floor(5 + Math.random() * 10); // Tempo de execução entre 5 e 15 segundos
  }

  private gerarPidAleatorio(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  mostrar(): void {
    console.log(
      `PID: ${this.pid}, Estado: ${this.estado}, Tempo Restante: ${this.tempoRestante}s`
    );
  }
}

const NUMERO_DE_PROCESSOS = 5;
const QUANTUM = 3;

let processos = inicializarProcessos(NUMERO_DE_PROCESSOS);

function inicializarProcessos(n: number): Processo[] {
  return Array.from({ length: n }, () => {
    return new Processo();
  });
}

let iteracao = 0;
while (!todosProcessosForamTerminados(processos)) {
  processos.forEach((processo) => {
    if (processo.estado !== Estados.Terminado) {
      console.log(`\n-- Iteração ${iteracao} --`);
      iteracao += 1;

      processo.estado = Estados.Executando;

      const tempoExecutado = Math.min(QUANTUM, processo.tempoRestante);
      processo.tempoRestante -= tempoExecutado;

      if (processo.tempoRestante > 0) {
        processo.estado = Estados.Pronto;
      } else {
        processo.estado = Estados.Terminado;
      }

      processo.mostrar();
    }
  });
}

console.log(
  `\nTodos processos foram finalizados! Total de ${iteracao} iterações.`
);

function todosProcessosForamTerminados(processos: Processo[]): boolean {
  for (let i = 0; i < processos.length; i++) {
    if (processos[i].estado != Estados.Terminado) {
      return false;
    }
  }
  return true;
}
