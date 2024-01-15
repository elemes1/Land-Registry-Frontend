import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SearchPage from '../views/SearchPage.vue'
import SearchResult from '../views/SearchResult.vue'
import LocationDetails from '../views/LocationDetails.vue'
import LocationSummaryDetails from '../views/LocationSummaryDetails.vue'

import GuestLayout from '../views/layouts/GuestLayout.vue'
import AdminLayout from '../views/layouts/AdminLayout.vue'

const routes = [
  {
    path: '/',
    component: GuestLayout,
    children: [
      {
        path: '',
        component: HomePage
      },
      {
        path: '/search-registry',
        name: 'search.registry',
        component: SearchPage
      },
      {
        path: '/search-result',
        name: 'search.result',
        component: SearchResult
      },
      {
        path: '/search-details/:recId',
        name: 'search.details',
        component: LocationDetails
      },
      {
        path: '/search-details/summary',
        name: 'search.details.summary',
        component: LocationSummaryDetails
      }
    ]
  },
  {
    path: '/admin/properties',
    component: AdminLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/admin/properties/PropertiesIndex.vue'),
        name: 'admin.properties.index'
      },
      {
        path: ':propertyId',
        component: () => import('@/views/admin/properties/PropertiesDetails.vue')
      },
      {
        path: 'create',
        component: () => import('@/views/admin/properties/PropertiesCreate.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

export default router
