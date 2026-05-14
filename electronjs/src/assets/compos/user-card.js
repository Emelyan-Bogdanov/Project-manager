Vue.component("user-card-item", {
  name: "user-card-item",
  props: {
    profile: {
      type: String,
      default: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    username: {
      type: String,
      default: "DEFAULT",
    },
    location: {
      type: String,
      default: "DEFAULT LOCATION",
    },
    tags: {
      type: Array,
      default: () => ["tag1", "tag2", "tag1"],
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleClick() {
      this.$emit("select");
    },
  },
  template: `
    <div class="user-item" :class="{ 'selected-card': selected }" @click="handleClick">
      <div class="user-card">
        <div class="user-top">
          <img :src="profile" class="user-img" />
          <div>
            <div class="user-name"><p>{{username}}</p></div>
            <div class="user-location">{{location}}</div>
          </div>
        </div>
        <div class="tags">
          <span class="tag" v-for="tag in tags">{{tag}}</span>
        </div>
      </div>
    </div>`,
});
