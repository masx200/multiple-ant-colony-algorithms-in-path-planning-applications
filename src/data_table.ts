import { defineComponent, PropType } from "vue";

export default defineComponent({
    props: {
        title: { required: true, type: String },
        tableheads: { type: Array as PropType<string[]>, required: true },
        tablebody: {
            required: true,
            type: Array as PropType<Array<string | number | boolean>[]>,
        },
    },
});
