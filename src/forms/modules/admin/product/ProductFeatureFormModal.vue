<!-- src/components/modals/ProductFeatureFormModal.vue -->
<template>
  <Modal :visible="visible" @close="close" :title="modalTitle">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Champ Nom -->
      <InputField
        v-model="form.name"
        name="name"
        label="Nom"
        placeholder="Saisir le nom"
        required
        :error="errors.name"
      />

      <!-- Champ Description (Optionnel) -->
      <TextAreaField
        v-model="form.description"
        name="description"
        label="Description"
        placeholder="Saisir la description"
        :rows="3"
        :error="errors.description"
      />

      <!-- Boutons d'Action -->
      <div class="flex justify-end space-x-2">
        <BaseButton
          v-if="isEditing"
          type="button"
          @click="onCancel"
          color="secondary"
          :loading="loading"
          label="Annuler"
        />
        <BaseButton
          type="submit"
          color="primary"
          :loading="loading"
          :label="isEditing ? 'Mettre à Jour' : 'Créer'"
        />
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { computed, watch, reactive } from "vue";
import Modal from "../../../../components/Modal.vue";
import InputField from "../../../../components/form/InputField.vue";
import TextAreaField from "../../../../components/form/TextAreaField.vue";
import BaseButton from "../../../../components/form/BaseButton.vue";
import type { IProductFeature } from "../../../../api/";
import { useFormValidation } from "../../../../composables/useFormValidation";
import { productFeatureFormSchema } from "../../../schema/productFeatureFormSchema";

interface ProductFeatureForm {
  name: string;
  description?: string;
}

const props = defineProps<{
  visible: boolean;
  initialData: Partial<IProductFeature> | null;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "submit", data: Partial<IProductFeature>): void;
  (e: "close"): void;
}>();

const isEditing = computed(() => !!props.initialData);
const modalTitle = computed(() =>
  isEditing.value
    ? "Éditer la Caractéristique Produit"
    : "Créer une Nouvelle Caractéristique Produit"
);

// Initialisation du formulaire
const form = reactive<ProductFeatureForm>({
  name: "",
  description: "",
});

// Remplissage du formulaire si en mode édition
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      form.name = newData.name || "";
      form.description = newData.description || "";
    } else {
      form.name = "";
      form.description = "";
    }
  },
  { immediate: true }
);

// Utilisation du composable de validation
const { errors, validate } = useFormValidation(productFeatureFormSchema);

// Fonction de soumission du formulaire
async function handleSubmit() {
  if (!validate(form)) {
    // Validation échouée, les erreurs sont déjà affichées
    return;
  }

  emit("submit", { ...form });
}

// Fonction d'annulation de l'édition
function onCancel() {
  emit("close");
}

// Fonction de fermeture de la modal
function close() {
  emit("close");
}
</script>

<style scoped>
/* Ajoutez des styles personnalisés si nécessaire */
</style>
