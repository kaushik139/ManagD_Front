<template>
  <div class="row-one">
    <!-- <div class="search-sec">
      <input
        class="search"
        type="text"
        @change="searchResults"
        placeholder="Search"
      />
      <button class="search-button">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div> -->
    <div class="accounts accounts-lg">
            <span
              v-if="notifications.length"
              style="position: relative"
              class="active"
            >
              <div><i class="fa-solid fa-bell"></i></div>
              <div
                style="
                  height: 15px;
                  width: 15px;
                  display: inline;
                  background-color: red;
                  border-radius: 50%;
                  position: absolute;
                  z-index: 999;
                  top: -2px;
                "
              >
                {{ notifications.length }}
              </div>
              <div
                class="dropdown"
                style="
                  position: absolute;
                  width: 170px;
                  margin-left: -70px;
                  background-color: #504dff;
                  color: white;
                  padding: 2px;
                "
              >
                <div v-for="(notification, idx) in notifications" :key="idx">
                  <p @click="clearNotice(idx)">{{ notification }}</p>
                </div>
              </div>
            </span>
            <i v-else class="fa-solid fa-bell"></i>
            <div style="display: flex; align-items: center; gap: 5px">
              <span>Hi! {{ name }}!</span>
              <i class="fa-solid fa-right-from-bracket" @click="logout"></i>
            </div>
          </div>
  </div>
</template>



<script>
import axios from "axios";
export default {
  name: "HeaderSection",
  props: ["name"],
  data() {
    return {
      notifications: [],
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      this.$router.push({ name: "logIn" });
    },
  },
  async mounted() {
    let token = localStorage.getItem("token");
    console.log("p");
    if (!token) {
      this.$router.push({ name: "signUp" });
    }
    axios
      .post("http://localhost:3000/getNotificationsForOrganisation", {
        id: localStorage.getItem("id"),
        token: token,
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        this.notifications = res.data.notifications;
        console.log("N", this.notifications);
      })
      .catch(() => {
        alert("Session Expired! Please relogin again.");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("phoneNo");
        // localStorage.removeItem("email")
        this.$router.push({ name: "memberLogin" });
      });
  },
};
</script>


<style scoped>
.accounts {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media only screen and (max-width: 993px) {
  .accounts-lg {
    display: none;
  }
}

.accounts-mob {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.row-one {
  display: flex;
  margin-top: 4px;
  justify-content: end;
  gap: 70px;
  margin-right: 10px;
}

.fa-bell {
  font-size: 2rem;
  color: #504dff;
}

.fa-right-from-bracket {
  font-size: 2rem;
  color: #504dff;
}
.fa-right-from-bracket:hover {
  cursor: pointer;
}

.search-sec {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 992px) {
  .search-sec {
    width: 100%;
    margin-top: 10px;
    margin-left: 0;
    margin-right: 0;
  }
}

.search {
  height: 25px;
}
.search-button {
  height: 31px;
}

@media only screen and (max-width: 992px) {
  .fa-bell {
    font-size: 1rem;
  }

  .fa-right-from-bracket {
    font-size: 1rem;
  }

  .accounts {
    font-size: 0.7rem;
  }
}

.dropdown {
  display: none;
}

.active:hover .dropdown {
  display: inline;
}

</style>