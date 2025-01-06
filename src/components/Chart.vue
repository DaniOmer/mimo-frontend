<template>
  <div>
    <component :is="chartComponent" :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { Line, Bar, Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, BarElement, PointElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, BarElement, PointElement, CategoryScale, LinearScale, ArcElement);

interface Dataset {
  label: string;
  data: number[];
  borderColor?: string;
  fill?: boolean;
  backgroundColor?: string | string[];
}

interface ChartProps {
  type: 'line' | 'bar' | 'pie';
  data: {
    labels: string[];
    datasets: Dataset[];
  };
  options?: {
    responsive: boolean;
    scales?: {
      x?: {
        title: {
          display: boolean;
          text: string;
        };
      };
      y?: {
        title: {
          display: boolean;
          text: string;
        };
        beginAtZero: boolean;
      };
    };
  };
}

const props = defineProps<ChartProps>();

const chartComponent = computed(() => {
  switch (props.type) {
    case 'line':
      return Line;
    case 'bar':
      return Bar;
    case 'pie':
      return Pie;
    default:
      return Line;
  }
});

const options = computed(() => ({
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
      }
    },
    y: {
      title: {
        display: true,
      },
      beginAtZero: true
    }
  }
}));
</script>