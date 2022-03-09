import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head'

import './index.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { faEraser, faPen, faSave} from '@fortawesome/free-solid-svg-icons'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* add icons to the library */
library.add(faPen, faEraser, faSave)

const app = createApp(App);
const head = createHead()

app.use(router);
app.use(head);

/* add font awesome icon component */
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app');