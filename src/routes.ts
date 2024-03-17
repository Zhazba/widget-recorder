import BranchDetailView from './views/BranchDetailView.vue';
import MasterView from './views/MasterView.vue';
import TimeSelectView from './views/TimeSelectView.vue';
import ContactRecordView from './views/ContactRecordView.vue';
import RecordView from './views/RecordView.vue';

const routes = [{
    path: '/branch/:id',
    name: 'detail-branch',
    component: BranchDetailView
},
{
    path: '/master/:id/:serviceId',
    name: 'masters-list',
    component: MasterView 
},
{
    path: '/time/:id/:serviceId/:masterId',
    name: 'time',
    component: TimeSelectView 
},
{
    path: '/create-record/:id/:serviceId/:masterId/:selectedDate',
    name: 'record',
    component: ContactRecordView
},
{
    path: '/record/:uuid',
    name: 'record-view',
    component: RecordView
}
];

export default routes;