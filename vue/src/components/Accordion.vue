
<template>
    <div class="accordion">
        <div
            v-for="(item, indice) in itens"
            :key="indice"
            class="accordion-item"
        >
            <button
                class="accordion-titulo"
                type="button"
                :aria-expanded="indiceAberto === indice"
                @click="alternar(indice)"
            >
                {{ item.titulo }}
                <span>{{ indiceAberto === indice ? '−' : '+' }}</span>
            </button>

            <transition name="deslizar">
                <div v-if="indiceAberto === indice" class="accordion-conteudo">
                    <p>{{ item.conteudo }}</p>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Accordion',

    props: {
        itens: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            indiceAberto: -1
        };
    },

    methods: {
        alternar(indice) {
            this.indiceAberto = this.indiceAberto === indice ? -1 : indice;
        }
    }
};
</script>
