Vue.component("team-member-item", {
  name: "team-member-item",
  props: {
    avatar: { type: String, default: "https://i.pravatar.cc/100?img=1" },
    name: { type: String, default: "Membre" },
    role: { type: String, default: "Rôle" },
    online: { type: Boolean, default: false },
  },
  template: `
    <div class="team-member">
      <img :src="avatar" alt="" class="team-avatar" />
      <div class="team-info">
        <div class="team-name">{{ name }}</div>
        <div class="team-role">{{ role }}</div>
      </div>
      <span class="team-status" :class="online ? 'online' : 'offline'"></span>
    </div>`,
});
