import { defineStore } from "pinia";
import { useApiRequest } from "../../composables";
import {
  fetchAllUsersAdmin,
  fetchUserById,
  updateUserAdmin,
  deleteUserAdmin,
  CreateInvitation,
  createUserFromInvitation,
  toggleUserStatusAdmin,
  fetchAllRoles,
  IRole,
  IUser,
  IuserInvitation,
  IuserFromInvitation,
} from "../../api/"; 

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [] as IUser[],
    roles: [] as IRole[],
    selectedUser: null as IUser | null,
    userToEdit: null as IUser | null,
    userToDelete: null as IUser | null,
    userToDeactivate: null as IUser | null,
    userToActivate: null as IUser | null,
    error: null as any | null,
    status: "idle" as "idle" | "pending" | "success" | "failed",
    controller: null as AbortController | null,
  }),

  getters: {
    allUsers: (state) => state.users,
    getUserById: (state) => (id: string) => state.users.find(user => user._id === id),
    allRoles: (state) => state.roles,
    isLoading: (state) => state.status === "pending",
  },

  actions: {
    initializeController() {
      if (!this.controller) {
        this.controller = new AbortController();
      }
    },

    async fetchAllUsers() {
      const { execute, status, error, data } = useApiRequest<IUser[]>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() => fetchAllUsersAdmin(this.controller!.signal));

      if (status.value === "success" && data.value) {
        this.users = data.value;
      }

      this.error = error.value;
      this.status = status.value;
    },

    async fetchUser(id: string) {
      const { execute, status, error, data } = useApiRequest<IUser>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() => fetchUserById(id, this.controller!.signal));

      if (status.value === "success" && data.value) {
        this.selectedUser = data.value;
      }

      this.error = error.value;
      this.status = status.value;
    },

    async updateUser(userId: string, userData: Partial<IUser>) {
      const { execute, status, error, data } = useApiRequest<IUser>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() => updateUserAdmin(userId, userData, this.controller!.signal));

      if (status.value === "success" && data.value) {
        const index = this.users.findIndex(user => user._id === userId);
        if (index !== -1) {
          this.users[index] = data.value;
        }
      }

      this.error = error.value;
      this.status = status.value;
    },

    async deleteUser(userId: string) {
      const { execute, status, error } = useApiRequest<void>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() => deleteUserAdmin(userId, this.controller!.signal));

      if (status.value === "success") {
        this.users = this.users.filter(user => user._id !== userId);
      }

      this.error = error.value;
      this.status = status.value;
    },

    async createInvitation(invitationData: IuserInvitation) {
      const { execute, status, error } = useApiRequest<void>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() => CreateInvitation(invitationData, this.controller!.signal));

      this.error = error.value;
      this.status = status.value;
    },

    async createUserFromInvitation(invitationData: IuserFromInvitation) {
      const { execute, status, error } = useApiRequest<void>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() => createUserFromInvitation(invitationData, this.controller!.signal));

      this.error = error.value;
      this.status = status.value;
    },

    async toggleUserStatus(userId: string, isDisabled: boolean) {
      const { execute, status, error, data } = useApiRequest<IUser>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() => toggleUserStatusAdmin(userId, isDisabled, this.controller!.signal));

      if (status.value === "success" && data.value) {
        const index = this.users.findIndex(user => user._id === userId);
        if (index !== -1) {
          this.users[index] = data.value;
        }
      }

      this.error = error.value;
      this.status = status.value;
    },

    async fetchAllRoles() {
      const { execute, status, error, data } = useApiRequest<IRole[]>();
      this.error = null;

      this.initializeController();

      this.status = "pending";
      await execute(() => fetchAllRoles(this.controller!.signal));

      if (status.value === "success" && data.value) {
        this.roles = data.value;
      }

      this.error = error.value;
      this.status = status.value;
    },

    resetStore() {
      this.users = [];
      this.roles = [];
      this.selectedUser = null;
      this.userToEdit = null;
      this.userToDelete = null;
      this.userToDeactivate = null;
      this.userToActivate = null;
      this.error = null;
      this.status = "idle";
      if (this.controller) {
        this.controller.abort();
        this.controller = null;
      }
    },

    cancelRequest() {
      if (this.controller) {
        this.controller.abort();
        this.controller = null;
      }
    },
  },
});
