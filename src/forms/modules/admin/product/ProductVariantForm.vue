<!-- src/components/admin/product/ProductVariantForm.vue -->
<template>
  <div class="space-y-4">
    <h3 class="text-md font-semibold">Variantes</h3>

    <!-- Formulaire pour ajouter ou éditer une variante -->
    <div class="flex flex-wrap gap-4 items-center">
      <FilterSelect
        v-model="currentVariant.sizeId"
        :options="sizeOptions"
        placeholder="Sélectionner une taille"
        :isMultiple="false"
      />
      <FilterSelect
        v-model="currentVariant.colorId"
        :options="colorOptions"
        placeholder="Sélectionner une couleur"
        :isMultiple="false"
      />
      <InputField
        v-model.number="currentVariant.priceEtx"
        name="priceEtx"
        label="Prix TTC"
        type="number"
        placeholder="Saisir le prix TTC"
        :error="currentVariantErrors.priceEtx"
      />
      <BaseButton
        type="button"
        :color="isEditingMode ? 'blue' : 'green'"
        @click="handleSubmit"
        :title="isEditingMode ? 'Enregistrer les modifications' : 'Ajouter une variante'"
        :label="isEditingMode ? 'Enregistrer' : 'Ajouter'"
        class="h-10"
      />

      <!-- Bouton Annuler (visible uniquement en mode édition) -->
      <BaseButton
        v-if="isEditingMode"
        type="button"
        color="gray"
        @click="cancelEdit"
        title="Annuler les modifications"
        label="Annuler"
        class="h-10"
      />

    </div>
    <p v-if="currentVariantErrors.general" class="text-sm text-red-600">
      {{ currentVariantErrors.general }}
    </p>

    <!-- Erreur générale pour les variantes -->
    <p v-if="variantsError" class="text-sm text-red-600">{{ variantsError }}</p>

    <!-- Liste des variantes ajoutées -->
    <ul class="space-y-2">
      <li
        v-for="(variant, index) in variants"
        :key="variant.id || index"
        class="flex items-center justify-between p-4 bg-gray-100 rounded shadow"
      >
        <div class="flex items-center space-x-4">
          <span class="font-medium">{{ getSizeName(variant.sizeId) }}</span>
          <span class="font-medium">{{ getColorName(variant.colorId) }}</span>
          <span class="font-medium">{{ variant.priceEtx }} €</span>
        </div>
        <div class="flex space-x-2">
          <button
            type="button"
            class="text-blue-500 hover:text-blue-700"
            @click="startEdit(index)"
            title="Modifier la variante"
          >
            <PencilIcon class="w-5 h-5" />
          </button>
          <button
            type="button"
            class="text-red-500 hover:text-red-700"
            @click="removeVariant(index)"
            title="Supprimer la variante"
          >
            <TrashIcon class="w-5 h-5" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, reactive, ref, watch } from "vue";
import FilterSelect from "../../../../components/FilterSelect.vue";
import InputField from "../../../../components/form/InputField.vue";
import { variantFormSchema } from "../../../schema/productVariant.schema";
import { useFormValidation } from "../../../../composables/useFormValidation";
import { TrashIcon, PencilIcon } from "@heroicons/vue/24/solid";
import BaseButton from "../../../../components/form/BaseButton.vue";

interface Variant {
  sizeId: string | number | null;
  colorId: string | number | null;
  priceEtx: number;
  id?: string; // Optionnel, peut être utilisé pour le suivi
}

const props = defineProps<{
  variants: Variant[];
  sizeOptions: { label: string; value: string | number }[];
  colorOptions: { label: string; value: string | number }[];
  variantsError?: string; // Ajout du prop pour les erreurs générales
}>();

const emit = defineEmits<{
  (e: "update:variants", variants: Variant[]): void;
}>();

// Validation des Variantes
const { errors, validate } = useFormValidation(variantFormSchema);

// Variante courante pour l'ajout ou l'édition
const currentVariant = reactive<Variant>({
  sizeId: null,
  colorId: null,
  priceEtx: 0,
});

// Erreurs pour la variante courante
const currentVariantErrors = reactive<{
  sizeId?: string;
  colorId?: string;
  priceEtx?: string;
  general?: string;
}>({});

// Gestion de l'état d'édition
const isEditingMode = ref<boolean>(false);
const editingIndex = ref<number | null>(null);

// Fonction pour démarrer l'édition d'une variante
const startEdit = (index: number) => {
  isEditingMode.value = true;
  editingIndex.value = index;
  Object.assign(currentVariant, props.variants[index]);
};

// Fonction pour annuler l'édition
const cancelEdit = () => {
  isEditingMode.value = false;
  editingIndex.value = null;
  // Réinitialiser le formulaire
  currentVariant.sizeId = null;
  currentVariant.colorId = null;
  currentVariant.priceEtx = 0;
  currentVariantErrors.sizeId = undefined;
  currentVariantErrors.colorId = undefined;
  currentVariantErrors.priceEtx = undefined;
  currentVariantErrors.general = undefined;
};

// Fonction pour gérer l'ajout ou l'édition
const handleSubmit = () => {
  // Valider la variante courante
  const isValid = validate(currentVariant);

  if (!isValid) {
    // Collecter les erreurs spécifiques
    if (errors.value.sizeId) {
      currentVariantErrors.sizeId = errors.value.sizeId;
    }
    if (errors.value.colorId) {
      currentVariantErrors.colorId = errors.value.colorId;
    }
    if (errors.value.priceEtx) {
      currentVariantErrors.priceEtx = errors.value.priceEtx;
    }
    currentVariantErrors.general = isEditingMode.value
      ? "Veuillez corriger les erreurs de modification."
      : "Veuillez corriger les erreurs ci-dessus.";
    return;
  }

  // Effacer les erreurs précédentes
  currentVariantErrors.sizeId = undefined;
  currentVariantErrors.colorId = undefined;
  currentVariantErrors.priceEtx = undefined;
  currentVariantErrors.general = undefined;

  if (isEditingMode.value && editingIndex.value !== null) {
    // Mettre à jour la variante existante
    const updatedVariants = [...props.variants];
    updatedVariants[editingIndex.value] = { ...currentVariant };
    emit("update:variants", updatedVariants);
    // Réinitialiser l'état d'édition
    isEditingMode.value = false;
    editingIndex.value = null;
  } else {
    // Ajouter une nouvelle variante
    const variantToAdd = { ...currentVariant };
    emit("update:variants", [...props.variants, variantToAdd]);
    // Réinitialiser le formulaire
    currentVariant.sizeId = null;
    currentVariant.colorId = null;
    currentVariant.priceEtx = 0;
  }
};

// Fonction pour supprimer une variante
const removeVariant = (index: number) => {
  const updatedVariants = [...props.variants];
  updatedVariants.splice(index, 1);
  emit("update:variants", updatedVariants);
};

// Fonctions utilitaires pour obtenir les noms basés sur les IDs
const getSizeName = (sizeId: string | number | null) => {
  const size = props.sizeOptions.find((opt) => opt.value === sizeId);
  return size ? size.label : "Taille inconnue";
};

const getColorName = (colorId: string | number | null) => {
  const color = props.colorOptions.find((opt) => opt.value === colorId);
  return color ? color.label : "Couleur inconnue";
};

// Réinitialiser le formulaire lors de l'annulation de l'édition
watch(isEditingMode, (newVal) => {
  if (!newVal) {
    currentVariant.sizeId = null;
    currentVariant.colorId = null;
    currentVariant.priceEtx = 0;
    currentVariantErrors.sizeId = undefined;
    currentVariantErrors.colorId = undefined;
    currentVariantErrors.priceEtx = undefined;
    currentVariantErrors.general = undefined;
  }
});
</script>

<style scoped>
.space-y-4 > * + * {
  margin-top: 1rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
</style>
