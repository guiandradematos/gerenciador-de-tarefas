
angular.module('gerenciadorTarefas')
    .controller('ControladorPrincipal', function($scope) {

        $scope.mensagem = 'Organize suas atividades e acompanhe seu progresso!';

        // Lista de tarefas
        $scope.tarefas = [
            {
                titulo: 'Estudar AngularJS',
                descricao: 'Revisar os conceitos de módulos e diretivas.',
                prioridade: 'Alta',
                concluida: false
            },
            {
                titulo: 'Fazer atividade de programação',
                descricao: 'Desenvolver os componentes solicitados.',
                prioridade: 'Alta',
                concluida: false
            },
            {
                titulo: 'Revisar conteúdo da faculdade',
                descricao: 'Estudar os assuntos das aulas.',
                prioridade: 'Média',
                concluida: true
            },
            {
                titulo: 'Organizar trabalhos',
                descricao: 'Verificar as atividades pendentes.',
                prioridade: 'Baixa',
                concluida: false
            }
        ];

        // Informações do Accordion
        $scope.informacoes = [
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
        ];

        // Configurações da paginação
        $scope.paginaAtual = 1;
        $scope.itensPorPagina = 2;
        $scope.totalPaginas = 1;

        // Filtra as tarefas conforme a aba selecionada
        $scope.tarefasFiltradas = function() {

            if ($scope.abaSelecionada === 'Pendentes') {
                return $scope.tarefas.filter(function(tarefa) {
                    return !tarefa.concluida;
                });
            }

            if ($scope.abaSelecionada === 'Concluídas') {
                return $scope.tarefas.filter(function(tarefa) {
                    return tarefa.concluida;
                });
            }

            return $scope.tarefas;
        };

        // Atualiza a paginação
        $scope.atualizarPaginacao = function() {

            $scope.totalPaginas = Math.max(
                1,
                Math.ceil(
                    $scope.tarefasFiltradas().length / $scope.itensPorPagina
                )
            );

            $scope.paginaAtual = 1;
        };

        // Muda de página
        $scope.mudarPagina = function(pagina) {

            if (pagina >= 1 && pagina <= $scope.totalPaginas) {
                $scope.paginaAtual = pagina;
            }

        };

        // Marca uma tarefa como concluída
        $scope.concluirTarefa = function(tarefa) {

            if (!tarefa.concluida) {

                tarefa.concluida = true;

                $scope.atualizarPaginacao();

                $scope.mostrarNotificacao(
                    'Tarefa "' + tarefa.titulo + '" concluída com sucesso!',
                    'sucesso'
                );

            }

        };

        // Calcula o progresso das tarefas
        $scope.calcularProgresso = function() {

            var concluidas = $scope.tarefas.filter(function(tarefa) {
                return tarefa.concluida;
            }).length;

            return Math.round(
                (concluidas / $scope.tarefas.length) * 100
            );

        };

        // Configurações das abas
        $scope.abas = [
            { titulo: 'Todas as tarefas' },
            { titulo: 'Pendentes' },
            { titulo: 'Concluídas' }
        ];

        $scope.abaSelecionada = 'Todas as tarefas';

        $scope.selecionarAba = function(titulo) {

            $scope.abaSelecionada = titulo;

            $scope.atualizarPaginacao();

        };

        // Configurações do menu suspenso
        $scope.opcoesMenu = [
            'Limpar filtros',
            'Mostrar total de tarefas',
            'Mostrar progresso'
        ];

        // Executa as ações do menu
        $scope.selecionarOpcao = function(opcao) {

            if (opcao === 'Limpar filtros') {

                $scope.selecionarAba('Todas as tarefas');

                $scope.mostrarNotificacao(
                    'Filtros removidos com sucesso!',
                    'sucesso'
                );

            }

            if (opcao === 'Mostrar total de tarefas') {

                $scope.mostrarNotificacao(
                    'Você possui ' + $scope.tarefas.length + ' tarefas cadastradas.',
                    'sucesso'
                );

            }

            if (opcao === 'Mostrar progresso') {

                $scope.mostrarNotificacao(
                    'Seu progresso atual é de ' + $scope.calcularProgresso() + '%.',
                    'sucesso'
                );

            }

        };

        // Configurações da notificação
        $scope.mensagemNotificacao = '';
        $scope.tipoNotificacao = 'sucesso';

        $scope.mostrarNotificacao = function(mensagem, tipo) {

            $scope.mensagemNotificacao = mensagem;
            $scope.tipoNotificacao = tipo || 'sucesso';

        };

    });
