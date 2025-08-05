<script setup lang="ts">
import type { MonthModel } from '@/models/MonthModel';
import Card from './ui/card/Card.vue';
import CardContent from './ui/card/CardContent.vue';
import CardDescription from './ui/card/CardDescription.vue';
import CardHeader from './ui/card/CardHeader.vue';
import CardTitle from './ui/card/CardTitle.vue';
import CardFooter from './ui/card/CardFooter.vue';
import Button from './ui/button/Button.vue';
import { Check } from 'lucide-vue-next';

defineProps<{
    month: MonthModel
}>();


</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>{{month.name}}</CardTitle>
            <CardDescription>Temp desc</CardDescription>
        </CardHeader>
        <CardContent>

        </CardContent>
        <CardFooter>
            <Button class="w-full">
                <Check class="mr-2 h-4 w-4" /> Mark all as read
            </Button>
        </CardFooter>
    </Card>

</template>
