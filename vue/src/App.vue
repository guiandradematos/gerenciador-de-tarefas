
<template>
    <div class="aplicacao">
        <header class="cabecalho">
            <h1>Gerenciador de Tarefas</h1>
            <p>{{ mensagem }}</p>
        </header>

        <ToastNotification
            :mensagem="mensagemNotificacao"
            :tipo="tipoNotificacao"
            :visivel="notificacaoVisivel"
            @fechar="fecharNotificacao"
        />

        <main class="conteudo-principal">
            <section class="cartao-progresso">
                <h2>Meu Progresso</h2>
                <ProgressBar :progresso="progresso" />
            </section>

            <section class="secao-organizacao">
                <h2>Organização das tarefas</h2>

                <DropdownMenu
                    :opcoes="opcoesMenu"
                    @selecionar="selecionarOpcao"
                />

                <Tabs
                    :abas="abas"
                    :aba-ativa="abaSelecionada"
                    @selecionar="selecionarAba"
                />
            </section>

            <section class="secao-tarefas">
                <h2>Minhas Tarefas</h2>

                <p v-if="tarefasFiltradas.length === 0" class="mensagem-vazia">
                    Não há tarefas nesta categoria.
                </p>

                <article
                    v-for="tarefa in tarefasPaginadas"
                    :key="tarefa.id"
                    class="cartao-tarefa"
                    :class="{ 'cartao-concluido': tarefa.concluida }"
                >
                    <h3>{{ tarefa.titulo }}</h3>
                    <p>{{ tarefa.descricao }}</p>
                    <p class="prioridade">
                        Prioridade: {{ tarefa.prioridade }}
                    </p>
                    <p class="status-tarefa">
                        Status: {{ tarefa.concluida ? 'Concluída' : 'Pendente' }}
                    </p>

                    <button
                        v-if="!tarefa.concluida"
                        class="botao-concluir"
                        type="button"
                        @click="concluirTarefa(tarefa)"
                    >
                        Concluir tarefa
                    </button>

                    <span v-else class="tarefa-finalizada">
                        ✓ Tarefa concluída
                    </span>
                </article>

                <Pagination
                    v-if="totalPaginas > 1"
                    :pagina-atual="paginaAtual"
                    :total-paginas="totalPaginas"
                    @mudar-pagina="mudarPagina"
                />
            </section>

            <section class="secao-duvidas">
                <h2>Dúvidas frequentes</h2>
                <Accordion :itens="perguntas" />
            </section>
        </main>

        <footer class="rodape">
            <p>Gerenciador de Tarefas — versão Vue.js</p>
        </footer>
    </div>
</template>

<script>
import Accordion from './components/Accordion.vue';
import Pagination from './components/Pagination.vue';
import ProgressBar from './components/ProgressBar.vue';
import Tabs from './components/Tabs.vue';
import DropdownMenu from './components/DropdownMenu.vue';
import ToastNotification from './components/ToastNotification.vue';

export default {
    name: 'App',

    components: {
        Accordion,
        Pagination,
        ProgressBar,
        Tabs,
        DropdownMenu,
        ToastNotification
    },

    data() {
        return {
            mensagem: 'Organize suas atividades e acompanhe seu progresso!',
            tarefas: [
                {
                    id: 1,
                    titulo: 'Estudar Vue.js',
                    descricao: 'Revisar os conceitos de componentes e propriedades.',
                    prioridade: 'Alta',
                    concluida: false
                },
                {
                    id: 2,
                    titulo: 'Fazer atividade de programação',
                    descricao: 'Desenvolver os componentes solicitados.',
                    prioridade: 'Alta',
                    concluida: false
                },
                {
                    id: 3,
                    titulo: 'Revisar conteúdo da faculdade',
                    descricao: 'Estudar os assuntos das aulas.',
                    prioridade: 'Média',
                    concluida: true
                },
                {
                    id: 4,
                    titulo: 'Organizar trabalhos',
                    descricao: 'Verificar as atividades pendentes.',
                    prioridade: 'Baixa',
                    concluida: false
                }
            ],
            perguntas: [
                {
                    titulo: 'Como cadastrar uma tarefa?',
                    conteudo: 'As tarefas são apresentadas na lista principal do gerenciador.'
                },
                {
                    titulo: 'Como identificar uma tarefa concluída?',
                    conteudo: 'Uma tarefa concluída aparece com o status Concluída.'
                },
                {
                    titulo: 'Para que serve a prioridade?',
                    conteudo: 'A prioridade indica a importância de cada tarefa: Alta, Média ou Baixa.'
                }
            ],
            abas: [
                { titulo: 'Todas as tarefas', valor: 'todas' },
                { titulo: 'Pendentes', valor: 'pendentes' },
                { titulo: 'Concluídas', valor: 'concluidas' }
            ],
            abaSelecionada: 'todas',
            opcoesMenu: [
                'Limpar filtros',
                'Mostrar total de tarefas',
                'Mostrar progresso'
            ],
            paginaAtual: 1,
            itensPorPagina: 2,
            mensagemNotificacao: '',
            tipoNotificacao: 'sucesso',
            notificacaoVisivel: false,
            temporizadorNotificacao: null
        };
    },

    computed: {
        tarefasFiltradas() {
            if (this.abaSelecionada === 'pendentes') {
                return this.tarefas.filter(tarefa => !tarefa.concluida);
            }

            if (this.abaSelecionada === 'concluidas') {
                return this.tarefas.filter(tarefa => tarefa.concluida);
            }

            return this.tarefas;
        },

        totalPaginas() {
            return Math.max(
                1,
                Math.ceil(this.tarefasFiltradas.length / this.itensPorPagina)
            );
        },

        tarefasPaginadas() {
            const inicio = (this.paginaAtual - 1) * this.itensPorPagina;

            return this.tarefasFiltradas.slice(
                inicio,
                inicio + this.itensPorPagina
            );
        },

        progresso() {
            if (this.tarefas.length === 0) {
                return 0;
            }

            const concluidas = this.tarefas.filter(
                tarefa => tarefa.concluida
            ).length;

            return Math.round((concluidas / this.tarefas.length) * 100);
        }
    },

    watch: {
        totalPaginas(novoTotal) {
            if (this.paginaAtual > novoTotal) {
                this.paginaAtual = novoTotal;
            }
        }
    },

    mounted() {
        document.title = 'Gerenciador de Tarefas - Vue.js';
    },

    beforeUnmount() {
        if (this.temporizadorNotificacao) {
            clearTimeout(this.temporizadorNotificacao);
        }
    },

    methods: {
        selecionarAba(valor) {
            this.abaSelecionada = valor;
            this.paginaAtual = 1;
        },

        mudarPagina(pagina) {
            if (pagina >= 1 && pagina <= this.totalPaginas) {
                this.paginaAtual = pagina;
            }
        },

        concluirTarefa(tarefa) {
            if (tarefa.concluida) {
                return;
            }

            tarefa.concluida = true;
            this.paginaAtual = 1;

            this.mostrarNotificacao(
                `Tarefa "${tarefa.titulo}" concluída com sucesso!`,
                'sucesso'
            );
        },

        selecionarOpcao(opcao) {
            if (opcao === 'Limpar filtros') {
                this.selecionarAba('todas');

                this.mostrarNotificacao(
                    'Filtros removidos com sucesso!',
                    'sucesso'
                );
            } else if (opcao === 'Mostrar total de tarefas') {
                this.mostrarNotificacao(
                    `Você possui ${this.tarefas.length} tarefas cadastradas.`,
                    'informacao'
                );
            } else if (opcao === 'Mostrar progresso') {
                this.mostrarNotificacao(
                    `Seu progresso atual é de ${this.progresso}%.`,
                    'informacao'
                );
            }
        },

        mostrarNotificacao(mensagem, tipo = 'sucesso') {
            if (this.temporizadorNotificacao) {
                clearTimeout(this.temporizadorNotificacao);
            }

            this.mensagemNotificacao = mensagem;
            this.tipoNotificacao = tipo;
            this.notificacaoVisivel = true;

            this.temporizadorNotificacao = setTimeout(() => {
                this.notificacaoVisivel = false;
                this.mensagemNotificacao = '';
                this.temporizadorNotificacao = null;
            }, 3000);
        },

        fecharNotificacao() {
            if (this.temporizadorNotificacao) {
                clearTimeout(this.temporizadorNotificacao);
                this.temporizadorNotificacao = null;
            }

            this.notificacaoVisivel = false;
            this.mensagemNotificacao = '';
        }
    }
};
</script>
