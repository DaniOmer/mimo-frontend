<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Administration des utilisateurs</h1>

    <p class="mt-4 mb-4 text-sm">
      Vous pouvez gérer les utilisateurs de l'application ici. Vous pouvez inviter,
      rechercher, filtrer, éditer, supprimer, activer ou désactiver les
      utilisateurs.
    </p>

    <div
      v-if="userStore.error"
      class="mb-4 p-4 bg-red-100 text-red-700 rounded"
    >
      {{ userStore.error.message || "An error occurred while fetching users." }}
    </div>

    <div
      v-if="userStore.isLoading"
      class="flex justify-center items-center mb-4"
    >
      <Loader :visible="true" class="w-6 h-6 text-primary animate-spin" />
    </div>

    <Table
      :columns="columns"
      :items="filteredUsers"
      :enableSort="true"
      :enablePagination="true"
      :pageSize="6"
      :enableMultiSelect="true"
      :enableActions="true"
      @row-click="openEditModal"
      @bulk-delete="bulkDeleteUsers"
    >
    <template #table-controls>
        <div class="flex flex-wrap gap-4 items-center justify-between">
        

          <div class="flex flex-wrap gap-4 items-center justify-between w-full lg:w-auto">
            <SearchBar
              v-model="searchQuery"
              placeholder="Rechercher par nom ou email"
              :searchMode="'front'"
              @search="handleSearch"
            />

            <div class="flex gap-4">
              <FilterSelect
                v-model="selectedRole"
                :options="roleOptions"
                placeholder="Filtrer par Rôle"
                @update:model-value="handleRoleChange"
              />

              <FilterSelect
                v-model="selectedStatus"
                :options="statusOptions"
                placeholder="Filtrer par Statut"
                @update:model-value="handleStatusChange"
              />

              <BaseButton
                color="primary"
                @click="openInviteModal"
                label="Inviter un utilisateur"
              />
            </div>
          </div>
        </div>
      </template>
      <template #row-actions="{ item, closeActionMenu }">
        <div class="flex flex-col px-2 gap-2 items-start">
          <button
            class="flex items-center text-blue-500 hover:text-blue-700"
            @click.stop="openEditModal(item); closeActionMenu()"
          >
            <PencilSquareIcon class="w-4 h-4 mr-1" /> Editer
          </button>

          <button
            class="flex items-center text-red-500 hover:text-red-700"
            @click.stop="confirmDelete(item); closeActionMenu()"
          >
            <TrashIcon class="w-4 h-4 mr-1" /> Supprimer
          </button>

          <button
            v-if="!item.isDisabled"
            class="flex items-center text-yellow-500 hover:text-yellow-700"
            @click.stop="confirmDeactivate(item); closeActionMenu()"
          >
            <NoSymbolIcon class="w-4 h-4 mr-1" /> Désactiver
          </button>
          <button
            v-else
            class="flex items-center text-green-500 hover:text-green-700"
            @click.stop="confirmActivate(item)"
          >
            <CheckCircleIcon class="w-4 h-4 mr-1" /> Activer
          </button>
        </div>
      </template>

      <template #profile="{ item }">
        <div class="flex items-center">
          <img
            v-if="item.avatar"
            :src="item.avatar"
            alt="Avatar de l'utilisateur"
            class="w-8 h-8 rounded-full object-cover"
          />
          <UserIcon
            v-else
            class="w-8 h-8 text-gray-400"
          />
        </div>
      </template>

      <template #status="{ item }">
        <span
          :class="[
            'px-4 py-1 rounded text-white text-xs',
            item.isDisabled ? 'bg-red-500' : 'bg-green-500',
          ]"
        >
          {{ item.isDisabled ? "Inactive" : "Active" }}
        </span>
      </template>

      <template #roles="{ item }">
        <span>
          {{ item.roles.map((role: IRole) => role.name).join(", ") }}
        </span>
      </template>
    </Table>

    <ConfirmationDialog
      :visible="isConfirmDeleteVisible"
      @close="isConfirmDeleteVisible = false"
      @confirm="deleteUser"
      title="Confirmer la Suppression"
      :message="`Êtes-vous sûr de vouloir supprimer ${userToDelete?.firstName} ${userToDelete?.lastName} ? Cette action est irréversible.`"
      confirmText="Supprimer"
      cancelText="Annuler"
    />

    <ConfirmationDialog
      :visible="isConfirmDeactivateVisible"
      @close="isConfirmDeactivateVisible = false"
      @confirm="deactivateUser"
      title="Confirmer la Désactivation"
      :message="`Êtes-vous sûr de vouloir désactiver ${userToDeactivate?.firstName} ${userToDeactivate?.lastName} ?`"
      confirmText="Désactiver"
      cancelText="Annuler"
    />

    <ConfirmationDialog
      :visible="isConfirmActivateVisible"
      @close="isConfirmActivateVisible = false"
      @confirm="activateUser"
      title="Confirmer l'Activation"
      :message="`Êtes-vous sûr de vouloir activer ${userToActivate?.firstName} ${userToActivate?.lastName} ?`"
      confirmText="Activer"
      cancelText="Annuler"
    />

   
    <EditUserFormModal
      v-if="userToEdit"
      :visible="isEditModalVisible"
      :userData="userDataForEdit"
      :roles="roleOptions"
      @submit="handleUpdateUser"
      @close="isEditModalVisible = false"
      submitLabel="Update"
      :loading="isLoadingEdit"
    />

    <InviteUserModal
      :visible="isInviteModalVisible"
      :initialData="{ email: '', role: '', firstName: '', lastName: '' }"
      :roles="roleOptions"
      @submit="inviteUser"
      @close="isInviteModalVisible = false"
      submitLabel="Invite"
      :loading="isLoadingInvite"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useUserAdminStore } from "../../stores";
import SearchBar from "../../components/SearchBar.vue";
import FilterSelect from "../../components/FilterSelect.vue";
import Table from "../../components/Table.vue";
import ConfirmationDialog from "../../components/ConfirmationDialog.vue";
import EditUserFormModal from "../../forms/modules/admin/userAdmin/EditUserFormModal.vue";
import InviteUserModal from "../../forms/modules/admin/userAdmin/InviteUserFormModal.vue";
import Loader from "../../components/BaseLoader.vue";

import {
  PencilSquareIcon,
  TrashIcon,
  NoSymbolIcon,
  CheckCircleIcon,
  UserIcon,
} from "@heroicons/vue/24/solid";

import { IRole, IUser } from "../../api";
import { useToast } from "vue-toast-notification";
import { formatDateTime } from "../../utils/date.ts";
import BaseButton from "../../components/form/BaseButton.vue";

interface Option {
  label: string;
  value: string;
}

const userStore = useUserAdminStore();

const $toast = useToast();

const searchQuery = ref("");
const selectedRole = ref<string | null>(null);
const selectedStatus = ref<string | null>(null);

const selectedUserIds = ref<string[]>([]);

const roleOptions = computed<Option[]>(() =>
  userStore.allRoles.map((role) => ({
    label: role.name,
    value: role.name,
  }))
);

const statusOptions = ref<Option[]>([
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
]);

const columns = [
  { key: "profile", label: "Profil", sortable: false },
  { key: "firstName", label: "Prénom", sortable: true },
  { key: "lastName", label: "Nom", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "roles", label: "Rôle", sortable: true, align: "center" as "center" },
  {
    key: "status",
    label: "Statut",
    sortable: true,
    align: "center" as "center",
  },
  { key: "createdAt", label: "Date Création", sortable: true, format: (value: string) => formatDateTime(new Date(value), false), align: "center" as "center"},
];

onMounted(async () => {
  await userStore.fetchAllUsers();
  await userStore.fetchAllRoles();
});

const filteredUsers = computed(() => {
  return userStore.users.filter((user) => {
    const matchesSearch =
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRole =
      !selectedRole.value ||
      user.roles.some((role) => role.name === selectedRole.value);
    const matchesStatus =
      !selectedStatus.value ||
      (selectedStatus.value === "Active" && !user.isDisabled) ||
      (selectedStatus.value === "Inactive" && user.isDisabled);
    return matchesSearch && matchesRole && matchesStatus;
  });
});

const isConfirmDeleteVisible = ref(false);
const isConfirmDeactivateVisible = ref(false);
const isConfirmActivateVisible = ref(false);
const isEditModalVisible = ref(false);
const isInviteModalVisible = ref(false);
// const isConfirmBulkDeleteVisible = ref(false); 


const userToDelete = ref<IUser | null>(null);
const userToDeactivate = ref<IUser | null>(null);
const userToActivate = ref<IUser | null>(null);
const userToEdit = ref<IUser | null>(null);

const isLoadingEdit = ref(false);
const isLoadingInvite = ref(false);

const userDataForEdit = computed(() => {
  if (userToEdit.value) {
    return {
      firstName: userToEdit.value.firstName,
      lastName: userToEdit.value.lastName,
      email: userToEdit.value.email,
      role: userToEdit.value.roles[0]?.name || "",
    };
  }
  return { firstName: "", lastName: "", email: "", role: "" };
});

function handleSearch(query: string) {
  searchQuery.value = query;
}

function handleRoleChange(
  selected: string | number | (string | number)[] | null
) {
  if (typeof selected === "string" || selected === null) {
    selectedRole.value = selected;
  }
}

function handleStatusChange(
  selected: string | number | (string | number)[] | null
) {
  if (typeof selected === "string" || selected === null) {
    selectedStatus.value = selected;
  }
}

function openEditModal(user: IUser) {
  userToEdit.value = user;
  isEditModalVisible.value = true;
}

async function handleUpdateUser(updatedData: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}) {
  if (userToEdit.value) {
    isLoadingEdit.value = true;
    const role = userStore.roles.find((role) => role.name === updatedData.role);
    if (!role) {
      isLoadingEdit.value = false;
      $toast.error("Le rôle sélectionné n'existe pas.", {
        position: "top",
        duration: 3000,
      });
      return;
    }
    const userData: Partial<IUser> = {
      firstName: updatedData.firstName,
      lastName: updatedData.lastName,
      email: updatedData.email,
      roles: role ? [role] : [],
    };
    try {
      await userStore.updateUser(userToEdit.value._id, userData);
      $toast.success("Utilisateur mis à jour avec succès!", {
        position: "top",
        duration: 3000,
      });
    } catch (error) {
      $toast.error("Erreur lors de la mise à jour de l'utilisateur.", {
        position: "top",
        duration: 3000,
      });
    } finally {
      isLoadingEdit.value = false;
      isEditModalVisible.value = false;
      userToEdit.value = null;
    }
  }
}

function openInviteModal() {
  isInviteModalVisible.value = true;
}

async function inviteUser(inviteData: {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}) {
  isLoadingInvite.value = true;
  const role = userStore.roles.find((role) => role.name === inviteData.role);
  if (!role) {
    isLoadingInvite.value = false;
    $toast.error("Le rôle sélectionné n'existe pas.", {
      position: "top",
      duration: 3000,
    });
    return;
  }
  try {
    await userStore.createInvitation({
      firstName: inviteData.firstName,
      lastName: inviteData.lastName,
      email: inviteData.email,
      roleId: role._id,
    });
    $toast.success("Invitation envoyée avec succès!", {
      position: "top",
      duration: 3000,
    });
  } catch (error) {
    $toast.error("Erreur lors de l'envoi de l'invitation.", {
      position: "top",
      duration: 3000,
    });
  } finally {
    isLoadingInvite.value = false;
    isInviteModalVisible.value = false;
  }
}

function confirmDelete(user: IUser) {
  userToDelete.value = user;
  isConfirmDeleteVisible.value = true;
}

async function deleteUser() {
  if (userToDelete.value) {
    try {
      await userStore.deleteUser(userToDelete.value._id);
      $toast.success("Utilisateur supprimé avec succès!", {
        position: "top",
        duration: 3000,
      });
    } catch (error) {
      $toast.error("Erreur lors de la suppression de l'utilisateur.", {
        position: "top",
        duration: 3000,
      });
    } finally {
      isConfirmDeleteVisible.value = false;
      userToDelete.value = null;
    }
  }
}

function confirmDeactivate(user: IUser) {
  userToDeactivate.value = user;
  isConfirmDeactivateVisible.value = true;
}

async function deactivateUser() {
  if (userToDeactivate.value) {
    try {
      await userStore.toggleUserStatus(userToDeactivate.value._id, true);
      $toast.success("Utilisateur désactivé avec succès!", {
        position: "top",
        duration: 3000,
      });
    } catch (error) {
      $toast.error("Erreur lors de la désactivation de l'utilisateur.", {
        position: "top",
        duration: 3000,
      });
    } finally {
      isConfirmDeactivateVisible.value = false;
      userToDeactivate.value = null;
    }
  }
}

function confirmActivate(user: IUser) {
  userToActivate.value = user;
  isConfirmActivateVisible.value = true;
}

async function activateUser() {
  if (userToActivate.value) {
    try {
      await userStore.toggleUserStatus(userToActivate.value._id, false);
      $toast.success("Utilisateur activé avec succès!", {
        position: "top",
        duration: 3000,
      });
    } catch (error) {
      $toast.error("Erreur lors de l'activation de l'utilisateur.", {
        position: "top",
        duration: 3000,
      });
    } finally {
      isConfirmActivateVisible.value = false;
      userToActivate.value = null;
    }
  }
}


async function bulkDeleteUsers() {
  if (selectedUserIds.value.length > 0) {
    try {
      await userStore.deleteMultipleUsersAction(selectedUserIds.value);
      $toast.success(`${selectedUserIds.value.length} utilisateur(s) supprimé(s) avec succès!`, {
        position: "top",
        duration: 3000,
      });
      selectedUserIds.value = [];
    } catch (error) {
      $toast.error("Erreur lors de la suppression des utilisateurs.", {
        position: "top",
        duration: 3000,
      });
    } 
  }
}


</script>
