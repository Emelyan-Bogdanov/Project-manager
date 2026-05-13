Vue.component("stat-card", {
  name: "stat-card",
  props: {
    icon: { type: String, default: "bi-people" },
    bg: { type: String, default: "#e8f4fd" },
    count: { default: 0 },
    label: { type: String, default: "Statistique" },
  },
  template: `
    <div class="stat-card">
      <div class="stat-icon" :style="{ background: bg }">
        <i :class="'bi ' + icon"></i>
      </div>
      <div class="stat-info">
        <div class="stat-number">{{ count }}</div>
        <div class="stat-label">{{ label }}</div>
      </div>
    </div>`,
});
