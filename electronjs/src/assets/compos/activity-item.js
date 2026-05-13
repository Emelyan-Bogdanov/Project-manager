Vue.component("activity-item", {
  name: "activity-item",
  props: {
    avatar: { type: String, default: "https://i.pravatar.cc/100?img=1" },
    user: { type: String, default: "Utilisateur" },
    action: { type: String, default: "a fait quelque chose" },
    time: { type: String, default: "il y a 5 min" },
    icon: { type: String, default: "" },
  },
  template: `
    <div class="activity-item" :class="{ 'icon-activity': !!icon }">
      <div class="activity-avatar" v-if="avatar && !icon">
        <img :src="avatar" alt="" />
      </div>
      <i v-else-if="icon" :class="'bi ' + icon"></i>
      <div class="activity-content">
        <div class="activity-text">
          <strong>{{ user }}</strong> {{ action }}
        </div>
        <div class="activity-time">{{ time }}</div>
      </div>
    </div>`,
});
