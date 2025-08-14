<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as z from 'zod'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import Button from './ui/button/Button.vue';
import { Input } from '@components/ui/input';

const props = defineProps<{
    type: string,
    monthId: number
}>();

const formSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().optional(),
    amount: z.number().min(0, "El monto debe ser positivo"),
    monthId: z.number().transform(() => props.monthId),
    category: z.object({
        id: z.number().int().positive(),
        importance: z.number().int().min(1).max(5),
        name: z.string().min(1),
        description: z.string().optional(),
    }),

    date: z.date()
});

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
    console.log('trans type:', props.type);
    console.log('Form submitted!', values)
})

</script>
<template>
    <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
            <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="shadcn" v-bind="componentField" />
                </FormControl>
                <FormDescription>
                    This is your public display name.
                </FormDescription>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit">
            Submit
        </Button>
    </form>

</template>