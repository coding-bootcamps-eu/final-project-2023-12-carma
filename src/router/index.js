import { createRouter, createWebHistory } from 'vue-router'
import StartView from '@/views/StartView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegUserView from '@/views/RegUserView.vue'
import RegCarView from '@/views/RegCarView.vue'
import JoinView from '@/views/JoinView.vue'
import NewRideView from '@/views/NewRideView.vue'
import StartRideView from '@/views/StartRideView.vue'
import EditRideView from '@/views/EditRideView.vue'
import CalendarView from '@/views/CalendarView.vue'
import NotesView from '@/views/NotesView.vue'
import AboutView from '@/views/AboutView.vue'
import LegalView from '@/views/LegalView.vue'
import LogbookView from '@/views/LogbookView.vue'
import CiaoView from '@/views/CiaoView.vue'
import MapView from '@/views/MapView.vue'
import CarmaPointsView from '@/views/CarmaPointsView.vue'
import AfterRegView from '@/views/AfterRegView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: false,
        hasUserIcon: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: false,
        hasUserIcon: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegUserView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: false,
        hasUserIcon: false
      }
    },
    {
      path: '/register/car',
      name: 'register-car',
      component: RegCarView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: false,
        hasUserIcon: false
      }
    },
    {
      path: '/join',
      name: 'join',
      component: JoinView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: false,
        hasUserIcon: false
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        hasMainMenu: true,
        hasBlueLogo: true,
        hasUserIcon: true
      }
    },
    {
      path: '/new-ride',
      name: 'new-ride',
      component: NewRideView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: true,
        hasUserIcon: true
      }
    },
    {
      path: '/start-ride',
      name: 'start-ride',
      component: StartRideView,
      meta: {
        hasMainMenu: true,
        hasBlueLogo: true,
        hasUserIcon: true
      }
    },
    {
      path: '/edit-ride',
      name: 'edit-ride',
      component: EditRideView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: true,
        hasUserIcon: true
      }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
      meta: {
        hasMainMenu: true,
        hasBlueLogo: true,
        hasUserIcon: true
      }
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: true,
        hasUserIcon: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: true,
        hasUserIcon: true
      }
    },
    {
      path: '/legal',
      name: 'legal',
      component: LegalView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: true,
        hasUserIcon: true
      }
    },
    {
      path: '/ciao',
      name: 'ciao',
      component: CiaoView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: false,
        hasUserIcon: false
      }
    },
    {
      path: '/logbook',
      name: 'logbook',
      component: LogbookView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: true,
        hasUserIcon: true
      }
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: true,
        hasUserIcon: true
      }
    },
    {
      path: '/carma-points',
      name: 'carma-points',
      component: CarmaPointsView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: true,
        hasUserIcon: true
      }
    },
    {
      path: '/registered',
      name: 'registered',
      component: AfterRegView,
      meta: {
        hasMainMenu: false,
        hasBlueLogo: false,
        hasUserIcon: false
      }
    }
  ]
})

export default router
