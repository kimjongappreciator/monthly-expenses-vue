<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import Button from './ui/button/Button.vue';
import { Input } from './ui/input';
import Textarea from './ui/textarea/Textarea.vue';
import Select from './ui/select/Select.vue';
import SelectValue from './ui/select/SelectValue.vue';
import SelectContent from './ui/select/SelectContent.vue';
import SelectGroup from './ui/select/SelectGroup.vue';
import SelectItem from './ui/select/SelectItem.vue';
import SelectTrigger from './ui/select/SelectTrigger.vue';
import { computed, onMounted, ref } from 'vue';
import Calendar from './ui/calendar/Calendar.vue';
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from "@internationalized/date"
import Popover from './ui/popover/Popover.vue';
import PopoverTrigger from './ui/popover/PopoverTrigger.vue';
import { CalendarIcon } from 'lucide-vue-next';
import { toDate } from "reka-ui/date"
import PopoverContent from './ui/popover/PopoverContent.vue';
import { useMonthStore } from '@/models/monthsStore';
import { toast } from 'vue-sonner';

const placeholder = ref();
const df = new DateFormatter("en-US", {
    dateStyle: "long",
})

const value = computed({
    get: () => form.values.date ? parseDate(form.values.date) : undefined,
    set: val => val,
})

const props = defineProps<{
    type: string,
    monthId: number
}>();

const generateId = () => Math.floor(Math.random() * 1000000) + Date.now();

const store = useMonthStore();

const success = ref(false);

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
    if (props.type === 'income') {
        store.newIncome(props.monthId, values);
        success.value = true;
        toast.success('Ingreso guardado correctamente');
    } else if (props.type === 'expense') {
        store.newExpense(props.monthId, values);
        success.value = true;
        toast.success('Gasto guardado correctamente');
    }
})

const expensesOptions = [
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

const incomeOptions = [
    'Salario',
    'Freelance',
    'Inversiones',
    'Regalos',
    'Otros'
];

// Categorías predefinidas comunes
const categoryOptions: string[] = [];

onMounted(()=>{
    if (props.type === 'income') {
        categoryOptions.push(...incomeOptions);
    } else {
        categoryOptions.push(...expensesOptions);
    }
})

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
                            <Input type="number" step="0.1" min="0" placeholder="0.00" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

            </div>

            <div class="space-y-6">

                <FormField v-slot="{ componentField }" name="category">
                    <FormItem>
                        <FormLabel>Categoría</FormLabel>
                        <FormControl>
                            <Select v-bind="componentField">
                                <SelectTrigger class="w-auto">
                                    <SelectValue placeholder="Selecciona una categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem v-for="cat in categoryOptions" :key="cat" :value="cat">
                                            {{ cat }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField name="date">
                    <FormItem>
                        <FormLabel>Fecha</FormLabel>
                        <Popover>
                            <PopoverTrigger as-child>
                                <FormControl>
                                    <Button class="w-auto ps-3 text-start font-normal" variant="outline">
                                        <span>{{ value ? df.format(toDate(value)) : "Selecciona una fecha" }}</span>
                                        <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                                    </Button>
                                    <input hidden type="text" name="date"/>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto p-0">
                                <Calendar v-model:placeholder="placeholder" :model-value="value"
                                    calendar-label="Date of birth" initial-focus
                                    :min-value="new CalendarDate(1900, 1, 1)" :max-value="today(getLocalTimeZone())"
                                    @update:model-value="(v) => {
                                        if (v) {
                                            form.setFieldValue('date', v.toString())
                                        }
                                        else {
                                            form.setFieldValue('date', undefined)
                                        }
                                    }">
                                </Calendar>
                            </PopoverContent>

                        </Popover>
                        <FormMessage />
                    </FormItem>
                </FormField>

            </div>
        </div>

        <!-- Descripción - Campo completo en la parte inferior -->
        <div class="mb-8">
            <FormField v-slot="{ componentField }" name="description">
                <FormItem>
                    <FormLabel>Descripción (opcional)</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Detalles adicionales sobre la transacción..." v-bind="componentField"
                            class="min-h-[100px]" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </div>

        <!-- Botón de envío -->
        <div class="flex justify-end space-x-4">
            <Button :disabled="success" type="submit" class="px-8 py-2">
                Guardar
            </Button>
        </div>
    </form>
</template>