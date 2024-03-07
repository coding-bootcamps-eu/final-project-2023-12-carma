import { createRouter, createWebHistory } from 'vue-router'
import StartView from './views/StartView.vue'
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import RegUserView from './views/RegUserView.vue'
import RegCarView from './views/RegCarView.vue'
import JoinView from './views/JoinView.vue'
import NewRideView from './views/NewRideView.vue'
import StartRideView from './views/StartRideView.vue'
//import FinishRideView from './views/FinishRideView.vue'
//import NewRideUserView from './views/NewRideUserView.vue'
import DeleteRideView from './views/DeleteRideView.vue'
import EditRideView from './views/EditRideView.vue'
//import MenuView from './views/MenuView.vue'
import CalendarView from './views/CalendarView.vue'
import NotesView from './views/NotesView.vue'
import AboutView from './views/AboutView.vue'
import LegalView from './views/LegalView.vue'
import LogbookView from './views/LogbookView.vue'
//import LogoutView from './views/LogoutView.vue'
import CiaoView from './views/CiaoView.vue'
import MapView from './views/MapView.vue'
import CarmaPointsView from './views/CarmaPointsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegUserView
    },
    {
      path: '/register/car',
      name: 'register-car',
      component: RegCarView
    },
    {
      path: '/join',
      name: 'join',
      component: JoinView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/new-ride',
      name: 'new-ride',
      component: NewRideView
    },
    {
      path: '/start-ride',
      name: 'start-ride',
      component: StartRideView
    },
    // {
    //   path: '/finish-ride',
    //   name: 'finish-ride',
    //   component: FinishRideView //??? ist component von start-ride
    // },
    // {
    //   path: '/new-ride-user',
    //   name: 'new-ride-user',
    //   component: NewRideUserView //???
    // },
    {
      path: '/delete-ride',
      name: 'delete-ride',
      component: DeleteRideView
    },
    {
      path: '/edit-ride',
      name: 'edit-ride',
      component: EditRideView
    },
    // {
    //   path: '/menu',
    //   name: 'menu',
    //   component: MenuView //??? entweder in der app.vue einbinden oder als childroute
    // },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/legal',
      name: 'legal',
      component: LegalView
    },
    // {
    //   path: '/logout',
    //   name: 'logout',
    //   component: LogoutView //???
    // },
    {
      path: '/ciao',
      name: 'ciao',
      component: CiaoView
    },
    {
      path: '/logbook',
      name: 'logbook',
      component: LogbookView
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
    {
      path: '/carma-points',
      name: 'carma-points',
      component: CarmaPointsView
    }
  ]
})

export default router
