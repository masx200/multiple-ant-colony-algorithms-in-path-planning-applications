<template>
    <div style="width: 100%">
        <el-select
            style="width: 100%"
            :disabled="disabled"
            :value="value"
            v-model="value"
            class="m-2"
            placeholder="Select"
            size="large"
            @change="handleChange"
        >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
    </div>
</template>
<script setup lang="ts">
const { options, disabled } = defineProps<
    Partial<{
        options: Array<{ value: string; label: string }>;
        disabled: boolean;
    }>
>();

const value = defineModel<string>();

const emit = defineEmits<{ change: [value: any] }>();

function handleChange(value: string) {
    emit("change", value);
}
</script>
