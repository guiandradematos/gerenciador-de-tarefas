
# Gerenciador de Tarefas - Vue.js

Versão independente do Gerenciador de Tarefas, desenvolvida com Vue 3 e Vite.

## Como executar no GitHub Codespaces

1. Abra o terminal dentro desta pasta `vue`.
2. Execute `npm install`.
3. Execute `npm run dev -- --host 0.0.0.0`.
4. Abra a porta indicada pelo Codespaces (normalmente 5173).

## Como gerar a versão de produção

Execute `npm run build`. Os arquivos finais serão gerados na pasta `dist`.

## Componentes Vue implementados

- `Accordion.vue`: perguntas frequentes expansíveis.
- `Pagination.vue`: navegação entre páginas.
- `ProgressBar.vue`: percentual de tarefas concluídas.
- `Tabs.vue`: filtros Todas, Pendentes e Concluídas.
- `DropdownMenu.vue`: ações rápidas e fechamento ao clicar fora.
- `ToastNotification.vue`: notificações temporárias com tipos diferentes.

O componente principal `App.vue` coordena os demais componentes e mantém os dados das tarefas.
