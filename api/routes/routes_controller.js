const user_router = require('./userRoutes/user_router')
const event_router = require('./eventRoutes/event_router')
const gig_router = require('./gigRoutes/gig_router')
const post_router = require('./postRoutes/post_router')
const gadget_router = require('./gadgetRoutes/gadget_router')
const service_router = require('./serviceRoutes/service_router')
const vacancy_router = require('./vacancyRoute/vacancy_router')

module.exports = {
    user_router,
    event_router,
    gig_router,
    post_router,
    gadget_router,
    service_router,
    vacancy_router
}
