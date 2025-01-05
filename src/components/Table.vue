<template>
  <div class="bg-white border border-gray-200 rounded-md shadow-sm">
    <div
      class="px-4 py-3 border-b border-gray-200 flex items-center justify-between"
    >
      <slot name="table-controls" />
    </div>

    <!-- Tableau -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm text-gray-700">
        <thead class="border-b bg-gray-50">
          <tr>
            <!-- Case “sélectionner tout” si multi-select -->
            <th v-if="enableMultiSelect" class="w-12 px-2 py-3 text-left">
              <input
                type="checkbox"
                class="cursor-pointer accent-primary"
                :checked="allSelected"
                @change="toggleSelectAll"
              />
            </th>

            <!-- Colonnes -->
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3 font-semibold uppercase text-xs text-gray-500"
              :class="{
                'cursor-pointer select-none': col.sortable,
                'text-left': col.align !== 'center',
                'text-center': col.align === 'center',
              }"
              @click="col.sortable && handleSort(col.key)"
            >
              {{ col.label }}
              <span v-if="col.sortable && sortKey === col.key">
                {{ sortOrder === "asc" ? "▲" : "▼" }}
              </span>
            </th>

            <th v-if="enableActions" class="px-4 py-3 text-right"></th>
          </tr>
        </thead>

        <tbody>
          <template v-if="!paginatedItems.length">
            <tr>
              <td
                :colspan="
                  columns.length +
                  (enableMultiSelect ? 1 : 0) +
                  (enableActions ? 1 : 0)
                "
                class="text-center py-4 text-gray-500"
              >
                Aucun résultat trouvé.
              </td>
            </tr>
          </template>

          <!-- Lignes de données -->
          <template v-else>
            <tr
              v-for="(rowData, rowIndex) in paginatedItems"
              :key="itemUniqueKey(rowData, rowIndex)"
              class="border-b hover:bg-gray-50 transition-colors group"
            >
              <!-- Checkbox par ligne si multiSelect -->
              <td v-if="enableMultiSelect" class="w-12 px-2 py-3">
                <input
                  type="checkbox"
                  class="cursor-pointer accent-primary"
                  :checked="selectedKeys.includes(getItemKey(rowData, rowIndex))"
                  @change="() => toggleRowSelect(rowData, rowIndex)"
                  @click.stop
                />
              </td>

              <!-- Cellules -->
              <td
                v-for="col in columns"
                :key="col.key"
                class="px-4 py-3"
                :class="{
                  'text-left': col.align !== 'center',
                  'text-center': col.align === 'center',
                }"
                @click="onRowClick(rowData)"
              >
                <slot
                  v-if="$slots[col.key]"
                  :name="col.key"
                  :item="rowData"
                  :value="rowData[col.key]"
                />
                <span v-else>
                  {{
                    col.format ? col.format(rowData[col.key]) : rowData[col.key]
                  }}
                </span>
              </td>

              <!-- Actions -->
              <td v-if="enableActions" class="px-4 py-3 text-right">
                <button
                  v-if="actions.length || $slots['row-actions']"
                  class="text-gray-400 hover:text-gray-700 p-2 focus:outline-none"
                  @click.stop="openActionMenu(rowData, $event)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 5v.01M12 12v.01M12 19v.01"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      class="flex items-center justify-between px-4 py-3"
      v-if="shouldShowPagination"
    >
      <div class="text-sm text-gray-500">
        Affichage
        <span class="font-medium">{{ startIndex + 1 }}</span>
        à
        <span class="font-medium">{{ Math.min(endIndex, totalItems) }}</span>
        sur
        <span class="font-medium">{{ totalItems }}</span>
        résultats
      </div>

      <div class="flex items-center gap-1">
        <button
          class="px-2 py-1 rounded border text-sm disabled:opacity-50"
          :disabled="currentPage <= 1"
          @click="goToPage(currentPage - 1)"
        >
          Précédent
        </button>

        <button
          v-for="p in pagesArray"
          :key="p"
          class="px-3 py-1 rounded border text-sm"
          :class="{
            'bg-primary text-white border-primary': p === currentPage,
            'hover:bg-gray-100': p !== currentPage,
          }"
          @click="goToPage(p)"
        >
          {{ p }}
        </button>

        <button
          class="px-2 py-1 rounded border text-sm disabled:opacity-50"
          :disabled="currentPage >= totalPagesComputed"
          @click="goToPage(currentPage + 1)"
        >
          Suivant
        </button>
      </div>
    </div>

    <!-- Menu d'actions -->
    <teleport to="body">
      <div
        v-if="openActionData"
        class="fixed z-50 w-48 bg-white border border-gray-200 shadow-md rounded-md overflow-hidden"
        :style="{ left: menuPosition.x + 'px', top: menuPosition.y + 'px' }"
      >
        <div
          class="flex items-center justify-between px-3 py-2 border-b bg-gray-50"
        >
          <span class="text-sm font-semibold text-gray-700">Actions</span>
          <button
            class="text-gray-400 hover:text-gray-700"
            @click="closeActionMenu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="py-1">
          <!-- Slot row-actions -->
          <slot
            name="row-actions"
            :item="openActionData"
            :closeActionMenu="closeActionMenu"
            v-if="$slots['row-actions']"
          />
          <!-- Sinon, on affiche actions[] -->
          <div
            v-else
            v-for="(act, i) in actions"
            :key="i"
            class="px-3 py-2 hover:bg-gray-100 text-sm text-gray-700 cursor-pointer flex items-center gap-2"
            @click="handleActionClick(act, openActionData)"
          >
            <span v-if="act.icon" class="text-gray-500">
              <component :is="act.icon" class="w-4 h-4" />
            </span>
            <span>{{ act.label }}</span>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { TableColumn } from "../types/TableColumn";

import { useSorting } from "../composables/table/useSorting";
import { usePagination } from "../composables/table/usePagination";
import { useSelection } from "../composables/table/useSelection";
import { useActions } from "../composables/table/useActions";

interface TableItem {
  _id: string;
  [key: string]: any;
}

export default defineComponent({
  name: "Table",

  props: {
    columns: {
      type: Array as () => TableColumn[],
      required: true,
    },
    items: {
      type: Array as () => TableItem[],
      required: true,
    },
    itemKey: {
      type: String,
      default: "_id",
    },
    enableSort: {
      type: Boolean,
      default: true,
    },
    enablePagination: {
      type: Boolean,
      default: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    defaultPage: {
      type: Number,
      default: 1,
    },
    enableMultiSelect: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: Array as () => {
        label: string;
        onClick: (item: any) => void;
        icon?: any;
      }[],
      default: () => [],
    },
    enableActions: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["row-click", "sort-change", "page-change", "selection-change"],

  setup(props, { emit }) {
    const { sortKey, sortOrder, handleSort, sortedItems } = useSorting(props, emit);
    const {
      currentPage,
      totalItems,
      totalPagesComputed,
      paginatedItems,
      shouldShowPagination,
      goToPage,
      pagesArray,
      startIndex,
      endIndex,
    } = usePagination(props, emit, sortedItems);
    const {
      selectedKeys,
      toggleSelectAll,
      toggleRowSelect,
      allSelected,
      getItemKey,
    } = useSelection(props, emit, paginatedItems);
    const {
      openActionData,
      menuPosition,
      openActionMenu,
      closeActionMenu,
      handleActionClick,
      itemUniqueKey,
    } = useActions(props, emit);

    function onRowClick(rowData: TableItem) {
      emit("row-click", rowData);
    }

    return {
      ...props,
      sortKey,
      sortOrder,
      handleSort,
      sortedItems,
      currentPage,
      totalItems,
      totalPagesComputed,
      paginatedItems,
      shouldShowPagination,
      goToPage,
      pagesArray,
      startIndex,
      endIndex,
      selectedKeys,
      toggleSelectAll,
      toggleRowSelect,
      allSelected,
      getItemKey,
      onRowClick,
      openActionData,
      menuPosition,
      openActionMenu,
      closeActionMenu,
      handleActionClick,
      itemUniqueKey,
    };
  },
});
</script>

