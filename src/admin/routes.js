import Management from './pages/Management.vue';
import PriceTable from './pages/PriceTable.vue';
import ManageCategories from './pages/ManageCategories.vue'

export default [

    {
        path: '/',
        name: 'PriceTable',
        component: PriceTable

    },    
    {
        path: '/management',
        name: 'management',
        component: Management,
        beforeEnter:(to, from, next) => {
            if(!!wpPermissionData.isAdmin){
                next()
            }else{
                next({name:'PriceTable'})
            }
        }
    },
    {
        path: '/categories',
        name: 'categories',
        component: ManageCategories,
        beforeEnter:(to, from, next) => {
            if(!!wpPermissionData.isAdmin){
                next()
            }else{
                next({name:'PriceTable'})
            }
        }
    }
];