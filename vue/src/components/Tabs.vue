
<template>
    <div class="abas">
        <div class="abas-botoes" role="tablist" aria-label="Filtrar tarefas">
            <button
                v-for="aba in abas"
                :key="aba.valor"
                type="button"
                role="tab"
                :aria-selected="abaAtiva === aba.valor"
                :class="{ ativa: abaAtiva === aba.valor }"
                @click="$emit('selecionar', aba.valor)"
            >
                {{ aba.titulo }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Tabs',

    props: {
        abas: {
            type: Array,
            required: true
        },
        abaAtiva: {
            type: String,
            required: true
        }
    },

    emits: ['selecionar']
};
</script>
