<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from '../../../components/Chart.vue';
import { fetchRevenueData, fetchSalesByCategoryData, fetchSalesByProductData, fetchAverageCartValueData, fetchNewCustomersData } from '../../../api/report/report.api';
import { format, parseISO, isValid } from 'date-fns';
import BaseButton from '../../../components/form/BaseButton.vue';

interface RevenueData {
  month: string;
  revenueEtx: number;
  revenueVat: number;
}

interface SalesByCategoryItem {
  category: string;
  totalEtx: number;
  totalVat: number;
}

interface SalesByProductItem {
  product: string;
  totalEtx: number;
  totalVat: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
}

const startDate = ref<string>('2024-01-01');
const endDate = ref<string>('2024-12-31');
const revenueData = ref<ChartData | null>(null);
const salesByCategoryData = ref<ChartData | null>(null);
const salesByProductData = ref<ChartData | null>(null);
const averageCartValueData = ref<ChartData | null>(null);
const newCustomersData = ref<ChartData | null>(null);
const chartOptions = ref({
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Mois'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Montant (€)'
      },
      beginAtZero: true
    }
  }
});

function generateMonthLabels(data: RevenueData[]): string[] {
  return data.map((item: RevenueData) => {
    const parsedDate = parseISO(item.month);
    if (isValid(parsedDate)) {
      return format(parsedDate, 'MMM yyyy');
    } else {
      console.warn(`Date invalide: ${item.month}`);
      return '';
    }
  });
}

async function fetchRevenueDataAndSet() {
  try {
    const data = await fetchRevenueData(startDate.value, endDate.value);
    
    const labels = generateMonthLabels(data);
    const revenueEtxData = data.map((item: RevenueData) => item.revenueEtx);
    const revenueVatData = data.map((item: RevenueData) => item.revenueVat);

    revenueData.value = {
      labels: labels,
      datasets: [
        {
          label: 'Revenu HT',
          data: revenueEtxData,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false
        },
        {
          label: 'Revenu TTC',
          data: revenueVatData,
          borderColor: 'rgba(153, 102, 255, 1)',
          fill: false
        }
      ]
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données de revenu:', error);
  }
}

async function fetchSalesByCategoryAndSet() {
  try {
    const data = await fetchSalesByCategoryData(startDate.value, endDate.value);
    const labels = data.salesByCategory.map((item: SalesByCategoryItem) => item.category);
    const salesEtxData = data.salesByCategory.map((item: SalesByCategoryItem) => item.totalEtx);
    const salesVatData = data.salesByCategory.map((item: SalesByCategoryItem) => item.totalVat);

    salesByCategoryData.value = {
      labels,
      datasets: [
        {
          label: 'Ventes HT',
          data: salesEtxData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Ventes TTC',
          data: salesVatData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données par catégorie:', error);
  }
}

async function fetchSalesByProductAndSet() {
  try {
    const data = await fetchSalesByProductData(startDate.value, endDate.value);
    const labels = data.salesByProduct.map((item: SalesByProductItem) => item.product);
    const salesEtxData = data.salesByProduct.map((item: SalesByProductItem) => item.totalEtx);
    const salesVatData = data.salesByProduct.map((item: SalesByProductItem) => item.totalVat);

    salesByProductData.value = {
      labels: labels,
      datasets: [
        {
          label: 'Ventes HT',
          data: salesEtxData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Ventes TTC',
          data: salesVatData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données par produit:', error);
  }
}

async function fetchAverageCartValueAndSet() {
  try {
    const data = await fetchAverageCartValueData(startDate.value, endDate.value);

    if (data && data.averageEtx !== undefined && data.averageVat !== undefined) {
      const labels = ['Moyenne HT', 'Moyenne TTC'];
      const averageData = [data.averageEtx, data.averageVat];

      averageCartValueData.value = {
        labels: labels,
        datasets: [
          {
            label: 'Moyenne',
            data: averageData,
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }
        ]
      };
    } else {
      console.error('Les données reçues pour la valeur moyenne du panier sont incorrectes.');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données de la valeur moyenne du panier:', error);
  }
}

async function fetchNewCustomersAndSet() {
  try {
    const response = await fetchNewCustomersData(startDate.value, endDate.value);

    if (response && response.newCustomers !== undefined) {
      const labels = ['Nouveaux Clients'];
      const newCustomers = [response.newCustomers];

      newCustomersData.value = {
        labels: labels,
        datasets: [
          {
            label: 'Nouveaux Clients',
            data: newCustomers,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            fill: false,
          }
        ]
      };
    } else {
      console.error('Les données reçues pour les nouveaux clients sont incorrectes. Réponse:', response);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des nouveaux clients:', error);
  }
}

async function fetchAllData() {
  await fetchRevenueDataAndSet();
  await fetchSalesByCategoryAndSet();
  await fetchSalesByProductAndSet();
  await fetchAverageCartValueAndSet();
  await fetchNewCustomersAndSet();
}

onMounted(() => {
  fetchAllData();
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Analyse des Ventes</h1>

    <div class="date-picker mb-6 flex space-x-4 items-end">
      <div>
        <label for="startDate" class="block text-lg font-medium text-gray-700">Date de début:</label>
        <input type="date" id="startDate" v-model="startDate" class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div>
        <label for="endDate" class="block text-lg font-medium text-gray-700">Date de fin:</label>
        <input type="date" id="endDate" v-model="endDate" class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <BaseButton
        :label="'Afficher les données'"
        @click="fetchAllData" 
        classes="bg-indigo-600 hover:bg-indigo-800 text-white py-2 px-4 rounded-md h-[40px]"
      />
    </div>

    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800">Graphique des Revenus</h2>
      <Chart v-if="revenueData" :type="'line'" :data="revenueData" :options="chartOptions" />
    </div>

    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800">Ventes par Catégorie</h2>
      <Chart v-if="salesByCategoryData" :type="'bar'" :data="salesByCategoryData" :options="chartOptions" />
    </div>

    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800">Ventes par Produit</h2>
      <Chart v-if="salesByProductData" :type="'bar'" :data="salesByProductData" :options="chartOptions" />
    </div>

    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800">Valeur Moyenne du Panier</h2>
      <Chart v-if="averageCartValueData" :type="'bar'" :data="averageCartValueData" :options="chartOptions" />
    </div>

    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800">Nouveaux Clients</h2>
      <Chart v-if="newCustomersData" :type="'bar'" :data="newCustomersData" :options="chartOptions" />
    </div>
  </div>
</template>