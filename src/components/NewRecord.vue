<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
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
import { Input } from './ui/input';
import Textarea from './ui/textarea/Textarea.vue';

const props = defineProps<{
    type: string,
    monthId: number
}>();

// Función para generar ID único
const generateId = () => Math.floor(Math.random() * 1000000) + Date.now();

const formSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().optional(),
    amount: z.number().min(0, "El monto debe ser positivo"),
    monthId: z.number(),
    category: z.string().min(1, "La categoría es requerida"),
    date: z.string().transform((val) => new Date(val))
});

const form = useForm({
    validationSchema: toTypedSchema(formSchema),
    initialValues: {
        id: generateId(),
        name: '',
        description: '',
        amount: 0,
        monthId: props.monthId,
        category: '',
        date: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD para input date
    }
})

const onSubmit = form.handleSubmit((values) => {
    console.log('trans type:', props.type);
    console.log('Form submitted!', values)
})

// Categorías predefinidas comunes
const categoryOptions = [
    'Alimentación',
    'Transporte',
    'Entretenimiento',
    'Salud',
    'Educación',
    'Servicios',
    'Compras',
    'Vivienda',
    'Otros'
];

</script>

<template>
    <form @submit="onSubmit" class="max-w-4xl mx-auto p-6">
        <!-- IDs generados automáticamente (ocultos) -->
        <input type="hidden" name="id" :value="form.values.id" />        
        <input type="hidden" name="monthId" :value="props.monthId" />

        <!-- Información Principal -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div class="space-y-6">
                
                
                <!-- Nombre -->
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel>Nombre de la transacción</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Ej: Compra de supermercado" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- Monto -->
                <FormField v-slot="{ componentField }" name="amount">
                    <FormItem>
                        <FormLabel>Monto</FormLabel>
                        <FormControl>
                            <Input type="number" step="0.01" min="0" placeholder="0.00" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- Fecha -->
                <FormField v-slot="{ componentField }" name="date">
                    <FormItem>
                        <FormLabel>Fecha</FormLabel>
                        <FormControl>
                            <Input type="date" v-bind="componentField" />
                        </FormControl>                        
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>

            <div class="space-y-6">                
                
                <!-- Categoría con datalist para autocompletado -->
                <FormField v-slot="{ componentField }" name="category">
                    <FormItem>
                        <FormLabel>Categoría</FormLabel>
                        <FormControl>
                            <Input 
                                type="text" 
                                placeholder="Selecciona o escribe una categoría" 
                                v-bind="componentField"
                                list="categories"
                            />
                        </FormControl>
                        <datalist id="categories">
                            <option v-for="cat in categoryOptions" :key="cat" :value="cat">{{ cat }}</option>
                        </datalist>
                        <FormDescription>
                            Puedes seleccionar de las opciones o escribir una nueva categoría.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>
                
            </div>
        </div>

        <!-- Descripción - Campo completo en la parte inferior -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold text-foreground border-b pb-2 mb-6">Detalles Adicionales</h2>
            
            <FormField v-slot="{ componentField }" name="description">
                <FormItem>
                    <FormLabel>Descripción (opcional)</FormLabel>
                    <FormControl>
                        <Textarea 
                            placeholder="Detalles adicionales sobre la transacción..." 
                            v-bind="componentField" 
                            class="min-h-[100px]"
                        />
                    </FormControl>
                    <FormDescription>
                        Información adicional sobre la transacción.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>
        </div>        

        <!-- Botón de envío -->
        <div class="flex justify-end space-x-4">
            <Button type="button" variant="outline" class="px-6 py-2">
                Cancelar
            </Button>
            <Button type="submit" class="px-8 py-2">
                Guardar
            </Button>
        </div>
    </form>
</template>