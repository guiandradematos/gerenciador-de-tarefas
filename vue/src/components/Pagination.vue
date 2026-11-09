
<template>
    <nav class="paginacao" aria-label="Paginação das tarefas">
        <button
            type="button"
            :disabled="paginaAtual === 1"
            @click="$emit('mudar-pagina', paginaAtual - 1)"
        >
            Anterior
        </button>

        <button
            v-for="pagina in paginas"
            :key="pagina"
            type="button"
            :class="{ ativa: paginaAtual === pagina }"
            :aria-current="paginaAtual === pagina ? 'page' : null"
            @click="$emit('mudar-pagina', pagina)"
        >
            {{ pagina }}
        </button>

        <button
            type="button"
            :disabled="paginaAtual === totalPaginas"
            @click="$emit('mudar-pagina', paginaAtual + 1)"
        >
            Próxima
        </button>
    </nav>
</template>

<script>
export default {
    name: 'Pagination',

    props: {
        paginaAtual: {
            type: Number,
            required: true
        },
        totalPaginas: {
            type: Number,
            required: true
        }
    },

    emits: ['mudar-pagina'],

    computed: {
        paginas() {
            return Array.from(
                { length: this.totalPaginas },
                (_, indice) => indice + 1
            );
        }
    }
};
</script>
