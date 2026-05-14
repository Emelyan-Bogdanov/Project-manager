Vue.component("activity-item", {
  name: "activity-item",
  props: {
    avatar: { type: String, default: "" },
    user: { type: String, default: "Utilisateur" },
    action: { type: String, default: "a fait quelque chose" },
    time: { type: String, default: "il y a 5 min" },
    icon: { type: String, default: "" },
    clickable: { type: Boolean, default: false },
  },
  computed: {
    initials() {
      return this.user
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");
    },
  },
  template: `
    <div class="activity-item" :class="{ 'icon-activity': !!icon, clicked: clickable }" @click="$emit('select')">
      <div class="activity-avatar" v-if="avatar && !icon">
        <img :src="avatar" alt="" />
      </div>
      <div class="activity-avatar activity-avatar-placeholder" v-else-if="!icon">{{ initials || "U" }}</div>
      <i v-else :class="'bi ' + icon"></i>
      <div class="activity-content">
        <div class="activity-text">
          <strong>{{ user }}</strong> {{ action }}
        </div>
        <div class="activity-time">{{ time }}</div>
      </div>
    </div>`,
});
