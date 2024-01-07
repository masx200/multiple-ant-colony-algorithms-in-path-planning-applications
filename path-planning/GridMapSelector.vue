<template>
    <div>
        <el-select
            :disabled="disabled"
            :value="value"
            v-model="value"
            class="m-2"
            placeholder="Select"
            size="large"
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
</script>
